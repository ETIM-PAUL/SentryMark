import { GraphQLClient, gql } from "graphql-request";

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
  return result.ip_registereds;
}
