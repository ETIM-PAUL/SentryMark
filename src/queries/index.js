import { GraphQLClient, gql } from "graphql-request";
import { ethers } from "ethers";
import { DisputeContract, LicenseContractAddr, RPC_URL } from "../utils";
import { disputeABI } from "../abi/dispute_abi";
// import { LICENCE_ABI  } from "../abi/licence_abi";
// import {License_Token_ABI} from "../abi/license_token_abi"


const client = new GraphQLClient(import.meta.env.VITE_GOLDSKY_URL);
const tipsClient = new GraphQLClient(import.meta.env.VITE_IPTIP_GOLDSKY_URL);
const revenueClaimedClient = new GraphQLClient(import.meta.env.VITE_IPTIP_GOLDSKY_URL);

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

export async function fetchIPTips(receiverIpId) {
  const query = gql`
    query GetIPTips($receiverIpId: Bytes!) {
      royaltyPaids(where: { receiverIpId: $receiverIpId }) {
        receiverIpId
        payerIpId
        sender
        token
        amount
        amountAfterFee
      }
    }
  `;

  const result = await tipsClient.request(query, { receiverIpId });

  console.log("result", result);

  return result.royaltyPaids;
}

export async function fetchIPRevenueClaimed(receiverIpId) {
  const query = gql`
    query GetIPClaimedRevenue($receiverIpId: Bytes!) {
      royaltyPaids(where: { receiverIpId: $receiverIpId }) {
        receiverIpId
        payerIpId
        sender
        token
        amount
        amountAfterFee
      }
    }
  `;

  const result = await tipsClient.request(query, { receiverIpId });

  console.log("result", result);

  return result.royaltyPaids;
}

export async function fetchDisputeDetails(disputeId, targetIpId) {
  const url = "https://staging-api.storyprotocol.net/api/v4/disputes";

  // Build dynamic `where` filter
  const where = {};

  if (disputeId) where.id = disputeId;
  if (targetIpId) where.targetIpId = targetIpId;

  const body = {
    orderBy: "",
    orderDirection: "",
    pagination: { limit: 1, offset: 0 },
    where
  };

  const options = {
    method: "POST",
    headers: {
      "X-Api-Key": "KOTbaGUSWQ6cUJWhiJYiOjPgB0kTRu1eCFFvQL0IWls",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();    
    return data.data[0];
  } catch (error) {
    console.error("fetchDisputeDetails error:", error);
    return null;
  }
}
