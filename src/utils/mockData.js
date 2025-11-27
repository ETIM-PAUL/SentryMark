// Mock IP Asset Database
export const mockIPAssets = {
  'IP-001': {
    metadata: {
      assetId: 'IP-001',
      assetName: 'Cyberpunk Neon Dreams',
      assetType: 'Digital Artwork',
      creator: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      creationDate: '2024-03-15',
      description: 'A stunning cyberpunk-themed digital artwork featuring neon-lit cityscapes and futuristic elements.',
      ipfsHash: 'QmX7Z9K2jvPxGH3JvR5tWxN8mYbL4qD1cE6fT9aU2sV3wX',
      blockchainAddress: '0x1234...5678',
      totalValue: '25.5 ETH'
    },
    license: {
      licenseType: 'Commercial License',
      licenseStatus: 'Active',
      expirationDate: '2026-03-15',
      territory: 'Worldwide',
      terms: 'Full commercial rights with attribution',
      royaltyRate: '10%'
    },
    tips: [
      {
        id: 1,
        tipper: '0x8a3C2D5e7B9A1234567890aBcDeF1234567890Ab',
        tipperName: 'CryptoArtLover',
        amount: '0.5 ETH',
        date: '2024-11-20',
        transactionHash: '0xabc123...def789'
      },
      {
        id: 2,
        tipper: '0x4F6B8D2A9C3E5678901234567890aBcDeF123456',
        tipperName: 'NFTCollector99',
        amount: '1.2 ETH',
        date: '2024-11-18',
        transactionHash: '0x456def...abc123'
      },
      {
        id: 3,
        tipper: '0x9E2C1A7B5D3F8901234567890aBcDeF1234567890',
        tipperName: 'DigitalArtFan',
        amount: '0.3 ETH',
        date: '2024-11-15',
        transactionHash: '0x789abc...456def'
      },
      {
        id: 4,
        tipper: '0x3A9F7E5C2B1D4567890123456789aBcDeF123456',
        tipperName: 'ArtEnthusiast',
        amount: '0.8 ETH',
        date: '2024-11-12',
        transactionHash: '0xdef456...789abc'
      },
      {
        id: 5,
        tipper: '0x7D5B3F1E9A2C4567890123456789aBcDeF123456',
        tipperName: 'MetaverseExplorer',
        amount: '0.6 ETH',
        date: '2024-11-10',
        transactionHash: '0x123abc...def456'
      },
      {
        id: 6,
        tipper: '0x2E4A6C8B1D3F5678901234567890aBcDeF123456',
        tipperName: 'Web3Creator',
        amount: '0.4 ETH',
        date: '2024-11-08',
        transactionHash: '0x456789...abc123'
      },
      {
        id: 7,
        tipper: '0x6F8D2A4C9E1B3567890123456789aBcDeF123456',
        tipperName: 'BlockchainBuff',
        amount: '1.0 ETH',
        date: '2024-11-05',
        transactionHash: '0x789def...123abc'
      },
      {
        id: 8,
        tipper: '0x1C3E5A7B9D2F4567890123456789aBcDeF123456',
        tipperName: 'CryptoWhale',
        amount: '2.5 ETH',
        date: '2024-11-01',
        transactionHash: '0xabc456...def789'
      }
    ],
    revenueClaims: [
      {
        id: 1,
        claimer: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
        claimerName: 'Original Creator',
        amount: '3.2 ETH',
        date: '2024-11-22',
        purpose: 'Royalty Distribution',
        transactionHash: '0x123def...789abc'
      },
      {
        id: 2,
        claimer: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
        claimerName: 'Original Creator',
        amount: '2.8 ETH',
        date: '2024-11-15',
        purpose: 'Licensing Fee',
        transactionHash: '0x456abc...123def'
      },
      {
        id: 3,
        claimer: '0x5E7A9C2D4F6B8901234567890aBcDeF123456789',
        claimerName: 'License Holder',
        amount: '1.5 ETH',
        date: '2024-11-10',
        purpose: 'Secondary Sales',
        transactionHash: '0x789def...456abc'
      },
      {
        id: 4,
        claimer: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
        claimerName: 'Original Creator',
        amount: '4.1 ETH',
        date: '2024-11-05',
        purpose: 'Commercial Usage Fee',
        transactionHash: '0xdef789...abc456'
      },
      {
        id: 5,
        claimer: '0x8B3F1D5E7A9C2456789012345678aBcDeF123456',
        claimerName: 'Platform',
        amount: '0.5 ETH',
        date: '2024-11-01',
        purpose: 'Platform Fee',
        transactionHash: '0xabc123...456def'
      },
      {
        id: 6,
        claimer: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
        claimerName: 'Original Creator',
        amount: '3.7 ETH',
        date: '2024-10-28',
        purpose: 'Royalty Distribution',
        transactionHash: '0x456def...789abc'
      }
    ]
  },
  'IP-002': {
    metadata: {
      assetId: 'IP-002',
      assetName: 'Abstract Symphony',
      assetType: 'Music NFT',
      creator: '0x9B7F3E1D5C2A8901234567890aBcDeF123456789',
      creationDate: '2024-05-22',
      description: 'An experimental electronic music piece blending ambient and techno elements.',
      ipfsHash: 'QmY8A1K3mwQyHG4KwS6uXoN9nZcM5rE7vU3xW4bT1aV2yY',
      blockchainAddress: '0x9876...4321',
      totalValue: '18.3 ETH'
    },
    license: {
      licenseType: 'Creative Commons',
      licenseStatus: 'Active',
      expirationDate: '2027-05-22',
      territory: 'Global',
      terms: 'Attribution required, commercial use allowed',
      royaltyRate: '5%'
    },
    tips: [
      {
        id: 1,
        tipper: '0x2D4F6A8C9E1B3567890123456789aBcDeF123456',
        tipperName: 'MusicLover',
        amount: '0.7 ETH',
        date: '2024-11-19',
        transactionHash: '0xfed987...cba654'
      },
      {
        id: 2,
        tipper: '0x7E9B3D5F1A2C4567890123456789aBcDeF123456',
        tipperName: 'SoundCollector',
        amount: '1.5 ETH',
        date: '2024-11-14',
        transactionHash: '0xcba654...fed987'
      }
    ],
    revenueClaims: [
      {
        id: 1,
        claimer: '0x9B7F3E1D5C2A8901234567890aBcDeF123456789',
        claimerName: 'Artist',
        amount: '2.5 ETH',
        date: '2024-11-20',
        purpose: 'Streaming Royalties',
        transactionHash: '0x987fed...456cba'
      }
    ]
  },
  'IP-003': {
    metadata: {
      assetId: 'IP-003',
      assetName: 'Virtual Reality Landscape',
      assetType: '3D Environment',
      creator: '0x3C5E7A9D2F4B8901234567890aBcDeF123456789',
      creationDate: '2024-08-10',
      description: 'Immersive 3D landscape designed for metaverse platforms and VR experiences.',
      ipfsHash: 'QmZ9B2L4nxRzIH5LxT7vYpQ1oC6mF8sX4aW3dV5eU6gZ3z',
      blockchainAddress: '0x5432...8765',
      totalValue: '42.7 ETH'
    },
    license: {
      licenseType: 'Exclusive License',
      licenseStatus: 'Active',
      expirationDate: '2025-08-10',
      territory: 'Metaverse Platforms Only',
      terms: 'Exclusive usage rights for VR platforms',
      royaltyRate: '15%'
    },
    tips: [
      {
        id: 1,
        tipper: '0x4A6C8E2D5F1B9567890123456789aBcDeF123456',
        tipperName: 'VREnthusiast',
        amount: '2.0 ETH',
        date: '2024-11-21',
        transactionHash: '0xbac321...edf876'
      },
      {
        id: 2,
        tipper: '0x8D2F4A6C9E1B3567890123456789aBcDeF123456',
        tipperName: 'MetaverseBuilder',
        amount: '3.5 ETH',
        date: '2024-11-17',
        transactionHash: '0xedf876...bac321'
      },
      {
        id: 3,
        tipper: '0x1E3A5C7D9F2B4567890123456789aBcDeF123456',
        tipperName: '3DArtist',
        amount: '1.8 ETH',
        date: '2024-11-13',
        transactionHash: '0x321bac...678edf'
      }
    ],
    revenueClaims: [
      {
        id: 1,
        claimer: '0x3C5E7A9D2F4B8901234567890aBcDeF123456789',
        claimerName: '3D Designer',
        amount: '5.5 ETH',
        date: '2024-11-18',
        purpose: 'License Fee Collection',
        transactionHash: '0x876edf...123bac'
      },
      {
        id: 2,
        claimer: '0x3C5E7A9D2F4B8901234567890aBcDeF123456789',
        claimerName: '3D Designer',
        amount: '4.2 ETH',
        date: '2024-11-11',
        purpose: 'Royalty Distribution',
        transactionHash: '0x234fed...987cba'
      }
    ]
  }
};

// Simulate API fetch delay
export const fetchIPAssetData = (assetId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const asset = mockIPAssets[assetId];
      if (asset) {
        resolve(asset);
      } else {
        reject(new Error('IP Asset not found'));
      }
    }, 5000); // 5 second delay
  });
};

// Get list of all available asset IDs (for testing)
export const getAvailableAssetIds = () => Object.keys(mockIPAssets);
