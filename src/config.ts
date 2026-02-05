import { createConfig, http } from 'wagmi'
import { story } from 'wagmi/chains'
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

export const config = createConfig(
    getDefaultConfig({
        chains: [story],
        transports: {
          [story.id]: http(),
        },
  
      // Required API Keys
      walletConnectProjectId: "4940035ce4b4813061af223f7b3c77f4",
  
      // Required App Info
      appName: "SentryMark",
  
      // Optional App Info
      appDescription: "Your IP Asset Tracker, Infringement and Enforcing Tool",
      appUrl: "https://family.co", // your app's url
      appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
    }),
  );