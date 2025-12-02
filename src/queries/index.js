import { GraphQLClient, gql } from "graphql-request";
import { ethers } from "ethers";
import { DisputeContract, LicenseContractAddr, RPC_URL } from "../utils";
import { disputeABI } from "../abi/dispute_abi";
// import { LICENCE_ABI  } from "../abi/licence_abi";
// import {License_Token_ABI} from "../abi/license_token_abi"


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
  console.log("provider:", provider)
  const contract = new ethers.Contract(DisputeContract, disputeABI, provider)

  const res = await contract.isIpTagged(ipId)
  
  isIPDisputed = res;

  console.log("tokenOwner:", tokenOwner)
  console.log("metadata:", result.ipregistereds[0])



  return {"metadata":result.ipregistereds[0], tokenOwner, isIPDisputed};
}


// export async function fetchLicenseRegistry(ipId) {
//   let provider = new ethers.JsonRpcProvider(RPC_URL)
//   const contract = new ethers.Contract(LicenseContractAddr, LICENCE_ABI, provider)
  
//   const licenseCount = Number(await contract.getAttachedLicenseTermsCount(ipId))
  
//   console.log("License count:", licenseCount);
  
//   if(licenseCount === 0) {
//     console.log("No license terms attached to this IP ID.");
//     return null;
//   }
  
//   const lastItem = licenseCount - 1;
  
//   const attachedLicenseTerms = await contract.getAttachedLicenseTerms(ipId, lastItem);

//   console.log("Attached License Terms:", 
//     attachedLicenseTerms.licenseTemplate,
//     Number(attachedLicenseTerms.licenseTermsId));
  
//   const getLicensedConfig = await contract.getLicensingConfig(
//     ipId, 
//     attachedLicenseTerms.licenseTemplate, 
//     Number(attachedLicenseTerms.licenseTermsId)
//   );

//   console.log('License Config Details:', getLicensedConfig);

//   const royaltyPer = await contract.getRoyaltyPercent(ipId, attachedLicenseTerms.licenseTemplate, Number(attachedLicenseTerms.licenseTermsId));

//   const res = Number(royaltyPer) / 100;
//   console.log('Royalty Percent:', res);


//   const isActive = await contract.isExpiredNow(ipId);
//   console.log('Is License Active:', isActive);

//   // If result is Zero, means license is not expired
//   const getExpiredTime = Number(await contract.getExpireTime(ipId));
//   console.log("expired time", getExpiredTime)
 
//   return {
//     licenseTerms: attachedLicenseTerms,
//     licenseConfig: getLicensedConfig
//   };
// }

// fetchLicenseRegistry("0x6258f25a2f284f9a28bf143dd7ac249f612f7022");
//  fetchLicenseRegistry("0xabc1234567890def1234567890abcdef12345678");


