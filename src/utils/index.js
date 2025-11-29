import { createWalletClient, custom } from "viem";
import { storyAeneid } from "viem/chains";
import { StoryClient } from '@story-protocol/core-sdk'

export function secondsFromNow(timestamp) {
  return Math.floor((new Date(timestamp) - new Date()) / 1000);
}

export const DisputeContract = "0x9b7A9c70AFF961C799110954fc06F3093aeb94C5"

export const RPC_URL = "https://rpc.ankr.com/story_aeneid_testnet"

export const formatDate = (timestamp) => {
const date = new Date(Number(timestamp) * 1000);
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