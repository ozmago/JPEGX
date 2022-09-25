// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import {ISuperfluid, ISuperToken, ISuperApp, SuperAppDefinitions} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {ISuperfluidToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluidToken.sol";
import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";
import {CFAv1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol";
import {SuperAppBase} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBase.sol";

/// @dev Constant Flow Agreement registration key, used to get the address from the host.
bytes32 constant CFA_ID = keccak256(
    "org.superfluid-finance.agreements.ConstantFlowAgreement.v1"
);

/**

When option expires in-the-money, the option writer can cover the differential between the strike and market price, before the asset gets offered to option buyer
at strike price or eventually auctioned off. 

Instead of lump sump payment of the differential, the option writer can opt to open an ongoing stream which will proactively balance the price differential ensuring
the asset will be returned to the option writer at expiry

There is a an external keeper that triggers the checks the market price via oracle, regulalry

If the in-the-money differential occurs, the stream will flow at a rate to balance the strike:market price by the next check-in period 

If the options turns from in-the money to out-of money, the stream will reverse back to the option writer at a flow rate to return all tokens by the next check-in period


*/

interface IOracle {
    function getMarketPrice(address asset) external returns (uint256);
}

interface IKeeper {
    function check() external;
}

struct CoverStream {
    int96 flowRate;
    uint256 streamStart;
    uint256 coverAmount;
    ISuperToken coverToken;
    bool flowsIn;
}

contract CoverOption is IKeeper, SuperAppBase {
    // price oracle
    IOracle internal priceOracle;
    address NFTCollection;

    address[] internal optionWriters;

    // covered price - address is the writer
    mapping(address => uint256) internal optionStrikePrices;

    // option writer => Stream
    mapping(address => CoverStream) internal coverStreams;

    // Superfluid config
    using CFAv1Library for CFAv1Library.InitData;
    CFAv1Library.InitData internal cfaV1;

    constructor(ISuperfluid host, ISuperToken coverToken) {
        assert(address(host) != address(0));
        assert(address(coverToken) != address(0));

        cfaV1 = CFAv1Library.InitData({
            host: host,
            cfa: IConstantFlowAgreementV1(
                address(host.getAgreementClass(CFA_ID))
            )
        });

        host.registerApp(
            SuperAppDefinitions.APP_LEVEL_FINAL |
                SuperAppDefinitions.BEFORE_AGREEMENT_CREATED_NOOP |
                SuperAppDefinitions.BEFORE_AGREEMENT_UPDATED_NOOP |
                SuperAppDefinitions.BEFORE_AGREEMENT_TERMINATED_NOOP
        );
    }

    /// We start the cover stream with zero flow
    function startCover(address _optionWriter, ISuperToken _coverToken) public {
        cfaV1.createFlowByOperator(msg.sender, address(this), _coverToken, 0);
        coverStreams[msg.sender] = CoverStream(
            0,
            block.timestamp,
            0,
            _coverToken,
            true
        );
        optionWriters.push(_optionWriter);
    }

    /// We are NOT in-the-money, anymore. Return cover to the writer, before next check-in
    function returnCover(
        address _optionWriter,
        ISuperToken _coverToken,
        int96 _flowRate
    ) internal {
        cfaV1.createFlow(_optionWriter, _coverToken, _flowRate);
    }

    function updateCoverRate(
        ISuperfluidToken _coverToken,
        int96 _flowRate,
        address _optionWriter
    ) internal {
        cfaV1.updateFlowByOperator(
            msg.sender,
            address(this),
            _coverToken,
            _flowRate
        );

        coverStreams[_optionWriter].flowRate = _flowRate;
    }

    function updateReturnRate(
        ISuperfluidToken _coverToken,
        address _optionWriter,
        int96 _flowRate
    ) internal {
        cfaV1.updateFlow(_optionWriter, _coverToken, _flowRate);
        coverStreams[_optionWriter].flowRate = _flowRate;
    }

    function getFlowRate() internal returns (int96) {}

    /// Called from a keeper, check all cover positions, update cover rate flows and directions
    function check() external {
        uint256 marketPrice = priceOracle.getMarketPrice(NFTCollection);

        for (uint256 i = 0; i < optionWriters.length; i++) {
            uint256 optionStrikePrice = optionStrikePrices[optionWriters[i]];
            uint256 diff = optionStrikePrice - marketPrice;
            if (diff > 0) {
                // in-the-money, ensure cover flows in, update flow rate for diff
                updateReturnRate(
                    coverStreams[optionWriters[i]].coverToken,
                    optionWriters[i],
                    0
                );
                updateCoverRate(
                    coverStreams[optionWriters[i]].coverToken,
                    getFlowRate(),
                    optionWriters[i]
                );
                coverStreams[optionWriters[i]].flowsIn = true;
            } else {
                // not in-the money, ensure cover flows out, update flow rate diff
                updateCoverRate(
                    coverStreams[optionWriters[i]].coverToken,
                    0,
                    optionWriters[i]
                );

                // need to make sure we have started the return stream here ... ?

                updateReturnRate(
                    coverStreams[optionWriters[i]].coverToken,
                    optionWriters[i],
                    getFlowRate()
                );
                coverStreams[optionWriters[i]].flowsIn = false;
            }
        }
    }
}
