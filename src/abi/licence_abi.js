export const LICENCE_ABI = [
 {
    "inputs": [
      {
        "internalType": "address",
        "name": "groupIpAssetRegistry",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "licensingModule",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "disputeModule",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "ipGraphAcl",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "authority",
        "type": "address"
      }
    ],
    "name": "AccessManagedInvalidAuthority",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "caller",
        "type": "address"
      },
      {
        "internalType": "uint32",
        "name": "delay",
        "type": "uint32"
      }
    ],
    "name": "AccessManagedRequiredDelay",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "caller",
        "type": "address"
      }
    ],
    "name": "AccessManagedUnauthorized",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "target",
        "type": "address"
      }
    ],
    "name": "AddressEmptyCode",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "implementation",
        "type": "address"
      }
    ],
    "name": "ERC1967InvalidImplementation",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ERC1967NonPayable",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "FailedCall",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidInitialization",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "childIpId",
        "type": "address"
      },
      {
        "internalType": "address[]",
        "name": "parentIpIds",
        "type": "address[]"
      }
    ],
    "name": "LicenseRegistry__AddParentIpToIPGraphFailed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LicenseRegistry__CallFailed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LicenseRegistry__CallerNotLicensingModule",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ipId",
        "type": "address"
      }
    ],
    "name": "LicenseRegistry__CannotAddIpWithExpirationToGroup",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "childIpId",
        "type": "address"
      }
    ],
    "name": "LicenseRegistry__DerivativeAlreadyRegistered",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "childIpId",
        "type": "address"
      }
    ],
    "name": "LicenseRegistry__DerivativeIpAlreadyHasChild",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "childIpId",
        "type": "address"
      }
    ],
    "name": "LicenseRegistry__DerivativeIpAlreadyHasLicense",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ipId",
        "type": "address"
      }
    ],
    "name": "LicenseRegistry__DerivativeIsParent",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ipId",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "parentIpId",
        "type": "address"
      }
    ],
    "name": "LicenseRegistry__DuplicateParentIp",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "groupId",
        "type": "address"
      }
    ],
    "name": "LicenseRegistry__EmptyGroupCannotMintLicenseToken",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "groupId",
        "type": "address"
      }
    ],
    "name": "LicenseRegistry__GroupCannotHasParentIp",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "groupId",
        "type": "address"
      }
    ],
    "name": "LicenseRegistry__GroupIpAlreadyHasLicenseTerms",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "groupId",
        "type": "address"
      },
      {
        "internalType": "uint32",
        "name": "ipCommercialRevShare",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "groupCommercialRevShare",
        "type": "uint32"
      }
    ],
    "name": "LicenseRegistry__GroupIpCommercialRevShareConfigMustNotLessThanIp",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "childIpId",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "groupId",
        "type": "address"
      }
    ],
    "name": "LicenseRegistry__GroupMustBeSoleParent",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ipId",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "length",
        "type": "uint256"
      }
    ],
    "name": "LicenseRegistry__IndexOutOfBounds",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ipId",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "expectGroupRewardPool",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "groupId",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "groupRewardPool",
        "type": "address"
      }
    ],
    "name": "LicenseRegistry__IpExpectGroupRewardPoolNotMatch",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ipId",
        "type": "address"
      }
    ],
    "name": "LicenseRegistry__IpExpectGroupRewardPoolNotSet",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ipId",
        "type": "address"
      }
    ],
    "name": "LicenseRegistry__IpExpired",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "groupId",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "licenseTemplate",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "licenseTermsId",
        "type": "uint256"
      }
    ],
    "name": "LicenseRegistry__IpHasNoGroupLicenseTerms",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ipId",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "licenseTemplate",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "licenseTermsId",
        "type": "uint256"
      }
    ],
    "name": "LicenseRegistry__IpLicenseDisabled",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ipId",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "hookData",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "groupHookData",
        "type": "bytes"
      }
    ],
    "name": "LicenseRegistry__IpLicensingHookDataNotMatchWithGroup",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ipId",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "licensingHook",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "groupLicensingHook",
        "type": "address"
      }
    ],
    "name": "LicenseRegistry__IpLicensingHookNotMatchWithGroup",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ipId",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "mintingFee",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "groupMintingFee",
        "type": "uint256"
      }
    ],
    "name": "LicenseRegistry__IpMintingFeeNotMatchWithGroup",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ipId",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "licenseTemplate",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "licenseTermsId",
        "type": "uint256"
      }
    ],
    "name": "LicenseRegistry__LicenseTermsAlreadyAttached",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "licenseTemplate",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "licenseTermsId",
        "type": "uint256"
      }
    ],
    "name": "LicenseRegistry__LicenseTermsCannotAttachToGroupIp",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "licenseTemplate",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "licenseTermsId",
        "type": "uint256"
      }
    ],
    "name": "LicenseRegistry__LicenseTermsNotExists",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ipId",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "licenseTemplate",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "licenseTermsId",
        "type": "uint256"
      }
    ],
    "name": "LicenseRegistry__LicensorIpHasNoLicenseTerms",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "licenseTemplate",
        "type": "address"
      }
    ],
    "name": "LicenseRegistry__NotLicenseTemplate",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ipId",
        "type": "address"
      }
    ],
    "name": "LicenseRegistry__ParentIpExpired",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ipId",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "licenseTermsId",
        "type": "uint256"
      }
    ],
    "name": "LicenseRegistry__ParentIpHasNoLicenseTerms",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "groupId",
        "type": "address"
      }
    ],
    "name": "LicenseRegistry__ParentIpIsEmptyGroup",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "parentIpId",
        "type": "address"
      }
    ],
    "name": "LicenseRegistry__ParentIpNotRegistered",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ipId",
        "type": "address"
      }
    ],
    "name": "LicenseRegistry__ParentIpTagged",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ipId",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "licenseTemplate",
        "type": "address"
      }
    ],
    "name": "LicenseRegistry__ParentIpUnmatchedLicenseTemplate",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ipId",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "ancestors",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "maxAncestors",
        "type": "uint256"
      }
    ],
    "name": "LicenseRegistry__TooManyAncestors",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ipId",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "parents",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "maxParents",
        "type": "uint256"
      }
    ],
    "name": "LicenseRegistry__TooManyParents",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ipId",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "licenseTemplate",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "newLicenseTemplate",
        "type": "address"
      }
    ],
    "name": "LicenseRegistry__UnmatchedLicenseTemplate",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "licenseTemplate",
        "type": "address"
      }
    ],
    "name": "LicenseRegistry__UnregisteredLicenseTemplate",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LicenseRegistry__ZeroAccessManager",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LicenseRegistry__ZeroDisputeModule",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LicenseRegistry__ZeroGroupIpRegistry",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LicenseRegistry__ZeroIPGraphACL",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LicenseRegistry__ZeroLicenseTemplate",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LicenseRegistry__ZeroLicensingModule",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LicensingModule__DerivativesCannotAddLicenseTerms",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "licenseTemplate",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "licenseTermsId",
        "type": "uint256"
      }
    ],
    "name": "LicensingModule__LicenseTermsNotFound",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotInitializing",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "RoyaltyModule__CallFailed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "UUPSUnauthorizedCallContext",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "slot",
        "type": "bytes32"
      }
    ],
    "name": "UUPSUnsupportedProxiableUUID",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "authority",
        "type": "address"
      }
    ],
    "name": "AuthorityUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "licenseTemplate",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "licenseTermsId",
        "type": "uint256"
      }
    ],
    "name": "DefaultLicenseTermsSet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "ipId",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "expireTime",
        "type": "uint256"
      }
    ],
    "name": "ExpirationTimeSet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint64",
        "name": "version",
        "type": "uint64"
      }
    ],
    "name": "Initialized",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "licenseTemplate",
        "type": "address"
      }
    ],
    "name": "LicenseTemplateRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "ipId",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "licenseTemplate",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "licenseTermsId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "bool",
            "name": "isSet",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "mintingFee",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "licensingHook",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "hookData",
            "type": "bytes"
          },
          {
            "internalType": "uint32",
            "name": "commercialRevShare",
            "type": "uint32"
          },
          {
            "internalType": "bool",
            "name": "disabled",
            "type": "bool"
          },
          {
            "internalType": "uint32",
            "name": "expectMinimumGroupRewardShare",
            "type": "uint32"
          },
          {
            "internalType": "address",
            "name": "expectGroupRewardPool",
            "type": "address"
          }
        ],
        "indexed": false,
        "internalType": "struct Licensing.LicensingConfig",
        "name": "licensingConfig",
        "type": "tuple"
      }
    ],
    "name": "LicensingConfigSetForLicense",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "implementation",
        "type": "address"
      }
    ],
    "name": "Upgraded",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "DISPUTE_MODULE",
    "outputs": [
      {
        "internalType": "contract IDisputeModule",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "EXPIRATION_TIME",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "GROUP_IP_ASSET_REGISTRY",
    "outputs": [
      {
        "internalType": "contract IGroupIPAssetRegistry",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "IP_GRAPH",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "IP_GRAPH_ACL",
    "outputs": [
      {
        "internalType": "contract IPGraphACL",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "LICENSING_MODULE",
    "outputs": [
      {
        "internalType": "contract ILicensingModule",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_ANCESTORS",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_PARENTS",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "UPGRADE_INTERFACE_VERSION",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ipId",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "licenseTemplate",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "licenseTermsId",
        "type": "uint256"
      }
    ],
    "name": "attachLicenseTermsToIp",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "authority",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "licenseTemplate",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "licenseTermsId",
        "type": "uint256"
      }
    ],
    "name": "exists",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ipId",
        "type": "address"
      }
    ],
    "name": "getAncestorsCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ipId",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "getAttachedLicenseTerms",
    "outputs": [
      {
        "internalType": "address",
        "name": "licenseTemplate",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "licenseTermsId",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ipId",
        "type": "address"
      }
    ],
    "name": "getAttachedLicenseTermsCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getDefaultLicenseTerms",
    "outputs": [
      {
        "internalType": "address",
        "name": "licenseTemplate",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "licenseTermsId",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "parentIpId",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "getDerivativeIp",
    "outputs": [
      {
        "internalType": "address",
        "name": "childIpId",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "parentIpId",
        "type": "address"
      }
    ],
    "name": "getDerivativeIpCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ipId",
        "type": "address"
      }
    ],
    "name": "getExpireTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ipId",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "licenseTemplate",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "licenseTermsId",
        "type": "uint256"
      }
    ],
    "name": "getLicensingConfig",
    "outputs": [
      {
        "components": [
          {
            "internalType": "bool",
            "name": "isSet",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "mintingFee",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "licensingHook",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "hookData",
            "type": "bytes"
          },
          {
            "internalType": "uint32",
            "name": "commercialRevShare",
            "type": "uint32"
          },
          {
            "internalType": "bool",
            "name": "disabled",
            "type": "bool"
          },
          {
            "internalType": "uint32",
            "name": "expectMinimumGroupRewardShare",
            "type": "uint32"
          },
          {
            "internalType": "address",
            "name": "expectGroupRewardPool",
            "type": "address"
          }
        ],
        "internalType": "struct Licensing.LicensingConfig",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "childIpId",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "getParentIp",
    "outputs": [
      {
        "internalType": "address",
        "name": "parentIpId",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "childIpId",
        "type": "address"
      }
    ],
    "name": "getParentIpCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "childIpId",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "parentIpId",
        "type": "address"
      }
    ],
    "name": "getParentLicenseTerms",
    "outputs": [
      {
        "internalType": "address",
        "name": "licenseTemplate",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "licenseTermsId",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ipId",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "licenseTemplate",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "licenseTermsId",
        "type": "uint256"
      }
    ],
    "name": "getRoyaltyPercent",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "royaltyPercent",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "parentIpId",
        "type": "address"
      }
    ],
    "name": "hasDerivativeIps",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ipId",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "licenseTemplate",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "licenseTermsId",
        "type": "uint256"
      }
    ],
    "name": "hasIpAttachedLicenseTerms",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "accessManager",
        "type": "address"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ipId",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "licenseTemplate",
        "type": "address"
      }
    ],
    "name": "initializeLicenseTemplate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isConsumingScheduledOp",
    "outputs": [
      {
        "internalType": "bytes4",
        "name": "",
        "type": "bytes4"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "licenseTemplate",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "licenseTermsId",
        "type": "uint256"
      }
    ],
    "name": "isDefaultLicense",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "childIpId",
        "type": "address"
      }
    ],
    "name": "isDerivativeIp",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ipId",
        "type": "address"
      }
    ],
    "name": "isExpiredNow",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "parentIpId",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "childIpId",
        "type": "address"
      }
    ],
    "name": "isParentIp",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "licenseTemplate",
        "type": "address"
      }
    ],
    "name": "isRegisteredLicenseTemplate",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "proxiableUUID",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "childIpId",
        "type": "address"
      },
      {
        "internalType": "address[]",
        "name": "parentIpIds",
        "type": "address[]"
      },
      {
        "internalType": "address",
        "name": "licenseTemplate",
        "type": "address"
      },
      {
        "internalType": "uint256[]",
        "name": "licenseTermsIds",
        "type": "uint256[]"
      },
      {
        "internalType": "bool",
        "name": "isUsingLicenseToken",
        "type": "bool"
      }
    ],
    "name": "registerDerivativeIp",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "licenseTemplate",
        "type": "address"
      }
    ],
    "name": "registerLicenseTemplate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newAuthority",
        "type": "address"
      }
    ],
    "name": "setAuthority",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newLicenseTemplate",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "newLicenseTermsId",
        "type": "uint256"
      }
    ],
    "name": "setDefaultLicenseTerms",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ipId",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "licenseTemplate",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "licenseTermsId",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "bool",
            "name": "isSet",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "mintingFee",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "licensingHook",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "hookData",
            "type": "bytes"
          },
          {
            "internalType": "uint32",
            "name": "commercialRevShare",
            "type": "uint32"
          },
          {
            "internalType": "bool",
            "name": "disabled",
            "type": "bool"
          },
          {
            "internalType": "uint32",
            "name": "expectMinimumGroupRewardShare",
            "type": "uint32"
          },
          {
            "internalType": "address",
            "name": "expectGroupRewardPool",
            "type": "address"
          }
        ],
        "internalType": "struct Licensing.LicensingConfig",
        "name": "licensingConfig",
        "type": "tuple"
      }
    ],
    "name": "setLicensingConfigForLicense",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newImplementation",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "upgradeToAndCall",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "groupId",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "groupRewardPool",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "ipId",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "groupLicenseTemplate",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "groupLicenseTermsId",
        "type": "uint256"
      }
    ],
    "name": "verifyGroupAddIp",
    "outputs": [
      {
        "components": [
          {
            "internalType": "bool",
            "name": "isSet",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "mintingFee",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "licensingHook",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "hookData",
            "type": "bytes"
          },
          {
            "internalType": "uint32",
            "name": "commercialRevShare",
            "type": "uint32"
          },
          {
            "internalType": "bool",
            "name": "disabled",
            "type": "bool"
          },
          {
            "internalType": "uint32",
            "name": "expectMinimumGroupRewardShare",
            "type": "uint32"
          },
          {
            "internalType": "address",
            "name": "expectGroupRewardPool",
            "type": "address"
          }
        ],
        "internalType": "struct Licensing.LicensingConfig",
        "name": "ipLicensingConfig",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "licensorIpId",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "licenseTemplate",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "licenseTermsId",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isMintedByIpOwner",
        "type": "bool"
      }
    ],
    "name": "verifyMintLicenseToken",
    "outputs": [
      {
        "components": [
          {
            "internalType": "bool",
            "name": "isSet",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "mintingFee",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "licensingHook",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "hookData",
            "type": "bytes"
          },
          {
            "internalType": "uint32",
            "name": "commercialRevShare",
            "type": "uint32"
          },
          {
            "internalType": "bool",
            "name": "disabled",
            "type": "bool"
          },
          {
            "internalType": "uint32",
            "name": "expectMinimumGroupRewardShare",
            "type": "uint32"
          },
          {
            "internalType": "address",
            "name": "expectGroupRewardPool",
            "type": "address"
          }
        ],
        "internalType": "struct Licensing.LicensingConfig",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]