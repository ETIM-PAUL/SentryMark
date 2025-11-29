import { ethers } from "ethers";
import { disputeABI } from "../abi/dispute_abi";


export const DisputeContract = "0x9b7A9c70AFF961C799110954fc06F3093aeb94C5"

export const RPC_URL = "https://rpc.ankr.com/story_aeneid_testnet"

export const DisputeContractInstance = async () => {
    let provider = new ethers.JsonRpcProvider(RPC_URL)
     let contract = new ethers.Contract(DisputeContract, disputeABI, provider)
}