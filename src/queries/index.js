import { GraphQLClient, gql } from "graphql-request";

const tipsClient = new GraphQLClient(import.meta.env.VITE_IPTIP_GOLDSKY_URL);

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
