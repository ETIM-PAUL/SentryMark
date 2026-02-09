// hooks/useRoyaltyPaidEvents.ts
import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

interface RoyaltyPaidEvent {
  receiverIpId: string;
  payerIpId: string;
  sender: string;
  token: string;
  amount: string;
  amountAfterFee: string;
  blockNumber: number;
  transactionHash: string;
}

interface CacheEntry {
  events: RoyaltyPaidEvent[];
  timestamp: number;
  fromBlock: number;
  toBlock: number;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const CHUNK_SIZE = 10000; // Adjust based on RPC provider limits
const CACHE_KEY = 'royalty-events-cache';
const RPC_URL = 'https://aeneid.storyrpc.io'
const ROYALTY_MODULE_ADDRESS = '0xD2f60c40fEbccf6311f8B47c4f2Ec6b040400086'

// Simple in-memory cache
const cache = new Map<string, CacheEntry>();

// Helper function to save cache to localStorage
const saveCache = () => {
  const cacheObj = Object.fromEntries(cache.entries());
  localStorage.setItem(CACHE_KEY, JSON.stringify(cacheObj));
};

// Helper function to update cache
const updateCache = (key: string, entry: CacheEntry) => {
  cache.set(key, entry);
  saveCache();
};

export function useRoyaltyPaidEvents() {
  const [events, setEvents] = useState<RoyaltyPaidEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  // Load from localStorage on mount (only once)
  useEffect(() => {
    const stored = localStorage.getItem(CACHE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        cache.clear();
        Object.entries(parsed).forEach(([key, value]) => {
          cache.set(key, value as CacheEntry);
        });
        console.log('Cache loaded from localStorage');
      } catch (err) {
        console.error('Error loading cache from localStorage:', err);
        localStorage.removeItem(CACHE_KEY);
      }
    }
  }, []);

  const fetchRoyaltyPaidEvents = useCallback(async (receiverIpId: string, fromBlock?: number, toBlock?: number) => {
    if (!receiverIpId || !RPC_URL) return;

    try {
      setLoading(true);
      setError(null);
      setProgress(0);

      const provider = new ethers.JsonRpcProvider(RPC_URL);
      const contractABI = [
        'event RoyaltyPaid(address receiverIpId, address payerIpId, address sender, address token, uint256 amount, uint256 amountAfterFee)'
      ];
      const contract = new ethers.Contract(ROYALTY_MODULE_ADDRESS, contractABI, provider);

      const normalizedAddress = ethers.getAddress(receiverIpId).toLowerCase();
      const cacheKey = `${ROYALTY_MODULE_ADDRESS}-${normalizedAddress}`;

      // Check cache
      const cached = cache.get(cacheKey);
      const now = Date.now();
      
      if (cached && (now - cached.timestamp) < CACHE_DURATION) {
        console.log('Using cached events');
        setEvents(cached.events);
        setLoading(false);
        return cached.events;
      }

      const currentBlock = await provider.getBlockNumber();
      const startBlock = fromBlock ?? Math.max(0, currentBlock - 100000); // Last ~100k blocks
      const endBlock = toBlock ?? currentBlock;

      const eventSignature = 'RoyaltyPaid(address,address,address,address,uint256,uint256)';
      const eventTopic = ethers.id(eventSignature);

      let allLogs: ethers.Log[] = [];
      const totalChunks = Math.ceil((endBlock - startBlock) / CHUNK_SIZE);
      let processedChunks = 0;

      // Fetch in chunks
      for (let start = startBlock; start <= endBlock; start += CHUNK_SIZE) {
        const end = Math.min(start + CHUNK_SIZE - 1, endBlock);
        
        console.log(`Fetching blocks ${start} to ${end}`);

        const logs = await provider.getLogs({
          address: ROYALTY_MODULE_ADDRESS,
          topics: [eventTopic],
          fromBlock: start,
          toBlock: end
        });

        allLogs = allLogs.concat(logs);
        
        processedChunks++;
        setProgress((processedChunks / totalChunks) * 100);

        // Small delay to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      console.log(`Fetched ${allLogs.length} total RoyaltyPaid events`);

      // Parse and filter events
      const filteredEvents: RoyaltyPaidEvent[] = allLogs
        .map((log) => {
          try {
            const parsed = contract.interface.parseLog({
              topics: [...log.topics],
              data: log.data
            });

            if (!parsed) return null;

            if (parsed.args.receiverIpId.toLowerCase() !== normalizedAddress) {
              return null;
            }

            return {
              receiverIpId: parsed.args.receiverIpId,
              payerIpId: parsed.args.payerIpId,
              sender: parsed.args.sender,
              token: parsed.args.token,
              amount: ethers.formatUnits(parsed.args.amount, 18),
              amountAfterFee: ethers.formatUnits(parsed.args.amountAfterFee, 18),
              blockNumber: log.blockNumber,
              transactionHash: log.transactionHash
            };
          } catch (err) {
            console.error('Error parsing log:', err);
            return null;
          }
        })
        .filter((event): event is RoyaltyPaidEvent => event !== null)
        .sort((a, b) => b.blockNumber - a.blockNumber); // Most recent first

      console.log(`Found ${filteredEvents.length} events for ${receiverIpId}`);

      // Update cache (both in-memory and localStorage)
      updateCache(cacheKey, {
        events: filteredEvents,
        timestamp: now,
        fromBlock: startBlock,
        toBlock: endBlock
      });

      setEvents(filteredEvents);
      setLoading(false);
      return filteredEvents;

    } catch (err) {
      console.error('Error fetching events:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
      return [];
    }
  }, [RPC_URL, ROYALTY_MODULE_ADDRESS]);

  const clearCache = useCallback((receiverIpId: string) => {
    const normalizedAddress = ethers.getAddress(receiverIpId).toLowerCase();
    const cacheKey = `${ROYALTY_MODULE_ADDRESS}-${normalizedAddress}`;
    cache.delete(cacheKey);
    saveCache(); // Update localStorage after clearing
  }, [ROYALTY_MODULE_ADDRESS]);

  return {
    events,
    loading,
    error,
    progress,
    fetchRoyaltyPaidEvents,
    clearCache
  };
}