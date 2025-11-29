import { GraphQLClient, gql } from "graphql-request";
import { ethers } from "ethers";
import { DisputeContract, RPC_URL } from "../utils";
import { disputeABI } from "../abi/dispute_abi";

const client = new GraphQLClient(import.meta.env.VITE_GOLDSKY_URL);

export async function fetchIPByIpId(ipId) {
  const query = gql`
    query GetIP($ipId: Bytes!) {
      ipregistereds(where: { ipId: $ipId }) {
        id
        ipId
        chainId
        tokenContract
        tokenId
        name
        uri
        registrationDate
      }
    }
  `;

  
  const result = await client.request(query, { ipId });
  const tokenOwner = "0x233"
  let isIPDisputed;

  let provider = new ethers.JsonRpcProvider(RPC_URL)
  const contract = new ethers.Contract(DisputeContract, disputeABI, provider)

  const res = await contract.isIpTagged(ipId)
  
  isIPDisputed = res;


  return {"metadata":result.ipregistereds[0], tokenOwner, isIPDisputed};
}
