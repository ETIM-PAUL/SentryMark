import { ethers } from "ethers";
import { disputeABI} from "../abi/dispute_abi";


export const DisputeContract = "0x9b7A9c70AFF961C799110954fc06F3093aeb94C5"
export const LicenseContractAddr = "0x529a750E02d8E2f15649c13D69a465286a780e24"
export const TokenMetaDataContractAddr = "0xFe3838BFb30B34170F00030B52eA4893d8aAC6bC"


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