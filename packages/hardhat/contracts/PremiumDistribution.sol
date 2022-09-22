// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import {ISuperfluid, ISuperToken, SuperAppBase, SuperAppDefinitions} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBase.sol";
import {IInstantDistributionAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IInstantDistributionAgreementV1.sol";

import {IDAv1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/IDAv1Library.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * NFT providers (option writers) will receive a share of Collection pool's premiums, upon option expiry
 * To enable gas-optimized revenue sharing Superfluid InstanDistributionAgreement is leveraged
 */
contract PremiumDistribution {
    /// Premium token wrapped up as Superfluid SuperToken to enable InstantDistributions
    ISuperToken public premiumToken;

    /// Superfluid IDA settings
    using IDAv1Library for IDAv1Library.InitData;

    IDAv1Library.InitData public idaV1;

    /// Each collection pool will *eventually* have its own index and pool bootrap scripting will  manage the indexing. Single NFT Pool supported for the hackathon
    uint32 public constant INDEX_ID = 0;

    constructor(ISuperfluid _host, ISuperToken _premiumToken) {
        require(address(_host) == _premiumToken.getHost(), "!superToken");

        premiumToken = _premiumToken;

        idaV1 = IDAv1Library.InitData(
            _host,
            IInstantDistributionAgreementV1(
                address(
                    _host.getAgreementClass(
                        keccak256(
                            "org.superfluid-finance.agreements.InstantDistributionAgreement.v1"
                        )
                    )
                )
            )
        );

        idaV1.createIndex(_premiumToken, INDEX_ID);
    }

    /// Distributes the premium based on share in the index. 
    /// Call at NFT Option expriry
    function distribute() public {
        uint256 premiumTokenBalance = premiumToken.balanceOf(address(this));

        (uint256 actualDistributionAmount, ) = idaV1.ida.calculateDistribution(
            premiumToken,
            address(this),
            INDEX_ID,
            premiumTokenBalance
        );

        idaV1.distribute(premiumToken, INDEX_ID, actualDistributionAmount);
    }

    /// Updated share of the index. 
    /// Call when NFT Provider submits NFT into the pool
    /// @param nftProvider NFT provider
    function gainShare(address nftProvider) public {
        // Get current units nftProvider holds
        (, , uint256 currentUnitsHeld, ) = idaV1.getSubscription(
            premiumToken,
            address(this),
            INDEX_ID,
            nftProvider
        );

        // Update to current amount + 1
        idaV1.updateSubscriptionUnits(
            premiumToken,
            INDEX_ID,
            nftProvider,
            uint128(currentUnitsHeld + 1)
        );
    }

    /// Update share of the index. 
    /// Call when NFT Provider removes a NFT from the pool
    /// @param nftProvider NFT provider

    function loseShare(address nftProvider) public {
        (, , uint256 currentUnitsHeld, ) = idaV1.getSubscription(
            premiumToken,
            address(this),
            INDEX_ID,
            nftProvider
        );

        idaV1.updateSubscriptionUnits(
            premiumToken,
            INDEX_ID,
            nftProvider,
            uint128(currentUnitsHeld - 1)
        );
    }

    /// Update share of the index. 
    /// Call when NFT Provider removes all NFTs from the pool and no longer participates
    /// @param nftProvider NFT provider

    function deleteShares(address nftProvider) public {
        idaV1.deleteSubscription(
            premiumToken,
            address(this),
            INDEX_ID,
            nftProvider
        );
    }
}
