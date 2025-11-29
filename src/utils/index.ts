import { ethers } from "ethers";
import { disputeABI } from "../abi/dispute_abi";


export const DisputeContract = "0x9b7A9c70AFF961C799110954fc06F3093aeb94C5"

export const RPC_URL = "https://rpc.ankr.com/story_aeneid_testnet"

export const formatDate = (timestamp:string) => {
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