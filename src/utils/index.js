import { createPublicClient, createWalletClient, custom, erc20Abi, getContract, http } from "viem";
import { storyAeneid } from "viem/chains";
import { ethers } from "ethers";
import { StoryClient } from '@story-protocol/core-sdk'
import { mockErc20_abi } from "../abi/mockErc20_abi";

export function secondsFromNow(timestamp) {
  return Math.floor((new Date(timestamp) - new Date()) / 1000);
}

export const DisputeContract = "0x9b7A9c70AFF961C799110954fc06F3093aeb94C5"

export const RPC_URL = "https://rpc.ankr.com/story_aeneid_testnet"

export const formatDate = (timestamp) => {
  // Handle different input formats
  let date;
  
  if (!timestamp) {
    return 'N/A';
  }
  
  // If it's already a Date object
  if (timestamp instanceof Date) {
    date = timestamp;
  }
  // If it's an ISO string (contains 'T' or '-')
  else if (typeof timestamp === 'string' && (timestamp.includes('T') || timestamp.includes('-'))) {
    date = new Date(timestamp);
  }
  // If it's a Unix timestamp in seconds (less than 10000000000)
  else if (Number(timestamp) < 10000000000) {
    date = new Date(Number(timestamp) * 1000);
  }
  // If it's a Unix timestamp in milliseconds
  else {
    date = new Date(Number(timestamp));
  }
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }
  
  const pretty = date.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  }); 
  return pretty;
};

  export async function uploadTextToIPFS(text) {
    const blob = new Blob([text], { type: "text/plain" });
    const data = new FormData();
    data.append("file", blob, "dispute-evidence.txt");

    const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`
        },
        body: data
    });

    const json = await response.json();
    return json.IpfsHash;
}

export async function uploadFileToIPFS(file) {
  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(url, {
      method: "POST",
      headers: {
          Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
      },
      body: formData,
  });

  const json = await response.json();
  return json.IpfsHash;
}

export async function createStoryClientWithWallet() {
  if (!window.ethereum) throw new Error("No wallet installed")

  const transport = custom(window.ethereum)

  const walletClient = createWalletClient({
      transport,
      chain: storyAeneid
  })

  const [address] = await walletClient.requestAddresses()

  const storyClient = StoryClient.newClient({
      account: address,
      chainId: storyAeneid.id,
      transport
  })

  return { storyClient, walletClient, address }
}

const client = createPublicClient({
  chain: storyAeneid,
  transport: http(RPC_URL)
});

export async function getTokenMetadata(tokenAddress) {
  try {
  let provider = new ethers.JsonRpcProvider(RPC_URL)

  const contract = new ethers.Contract(tokenAddress, mockErc20_abi, provider)

  const name = await contract.name();
  const symbol = await contract.symbol();
  const decimals = await contract.decimals();

    return { name, symbol, decimals };
  } catch (error) {
    console.error("Failed to fetch token metadata:", error);
    return null;
  }
}

export function isDisputed(tag) {
  if (!tag) return "";
  const clean = tag.replace(/^0x/, "");
  return Buffer.from(clean, "hex").toString("ascii").replace(/\0+$/, "");
}

// Extract frame from video at specific timestamp
async function extractVideoFrame(videoUrl, timeInSeconds = 0) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.muted = true;
    
    video.addEventListener('error', () => {
      reject(new Error('Failed to load video'));
    });
    
    video.addEventListener('loadeddata', () => {
      video.currentTime = timeInSeconds;
    });
    
    video.addEventListener('seeked', () => {
      try {
        // Create canvas and draw frame
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert to blob
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob'));
          }
        }, 'image/jpeg', 0.95);
      } catch (error) {
        reject(error);
      }
    });
    
    video.src = videoUrl;
    video.load();
  });
}

// Main function: Extract frame, upload to IPFS, open in Google Lens
export async function analyzeVideoWithGoogleLens(videoUrl, timeInSeconds = 0) {
  try {
    console.log('Extracting frame from video...');
    const frameBlob = await extractVideoFrame(videoUrl, timeInSeconds);
    
    // Create file from blob
    const file = new File([frameBlob], 'video-frame.jpg', { type: 'image/jpeg' });
    
    console.log('Uploading frame to IPFS...');
    const ipfsHash = await uploadFileToIPFS(file);
    
    // Construct IPFS URL (using Pinata gateway)
    const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
    console.log('IPFS URL:', ipfsUrl);
    
    // Open in Google Lens
    // const lensUrl = `https://lens.google.com/uploadbyurl?url=${encodeURIComponent(ipfsUrl)}`;
    // window.open(lensUrl, '_blank');
    
    return {
      ipfsHash,
      ipfsUrl
    };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}