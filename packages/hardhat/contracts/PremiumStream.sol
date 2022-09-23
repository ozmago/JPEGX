//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.14;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ISuperfluid, ISuperToken, ISuperApp} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {ISuperfluidToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluidToken.sol";
import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";
import {CFAv1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol";

error Unauthorized();

/**
 * Premium stream enables option callers to stream-in their premiums over time, instead of lump-sum deposit
 * F
 */
contract PremiumStream {
    address public owner;

    using CFAv1Library for CFAv1Library.InitData;
    CFAv1Library.InitData public cfaV1;

    /// @notice Allow list.
    mapping(address => bool) public accountList;

    constructor(ISuperfluid host, address _owner) {
        assert(address(host) != address(0));
        owner = _owner;

        cfaV1 = CFAv1Library.InitData(
            host,
            IConstantFlowAgreementV1(
                address(
                    host.getAgreementClass(
                        keccak256(
                            "org.superfluid-finance.agreements.ConstantFlowAgreement.v1"
                        )
                    )
                )
            )
        );
    }

    /// @notice Add account to allow list.
    /// @param _account Account to allow.
    function allowAccount(address _account) external {
        if (msg.sender != owner) revert Unauthorized();

        accountList[_account] = true;
    }

    /// Remove account from allow list.
    /// @param _account Account to disallow.
    function removeAccount(address _account) external {
        if (msg.sender != owner) revert Unauthorized();

        accountList[_account] = false;
    }

    /// Transfer ownership.
    /// @param _newOwner New owner account.
    function changeOwner(address _newOwner) external {
        if (msg.sender != owner) revert Unauthorized();

        owner = _newOwner;
    }

    /// Create a stream into the contract.
    /// Call when Option Caller submits their premium as a stream
    /// @param token Token to stream.
    /// @param flowRate Flow rate per second to stream. Use epoch remaining time and premium price to calculate on front end
    function createFlowIntoContract(ISuperfluidToken token, int96 flowRate)
        external
    {
        if (!accountList[msg.sender] && msg.sender != owner)
            revert Unauthorized();

        cfaV1.createFlowByOperator(msg.sender, address(this), token, flowRate);
    }

    /// Update an existing stream.
    /// Call when - TBD ... Is there a scenario that the flow rate changes?
    /// @param token Token to stream.
    /// @param flowRate Flow rate per second to stream.
    function updateFlowIntoContract(ISuperfluidToken token, int96 flowRate)
        external
    {
        if (!accountList[msg.sender] && msg.sender != owner)
            revert Unauthorized();

        cfaV1.updateFlowByOperator(msg.sender, address(this), token, flowRate);
    }

    /// Delete a stream that the msg.sender has open into the contract.
    /// Call at Option expiry
    /// @param token Token to quit streaming.
    function deleteFlowIntoContract(ISuperfluidToken token) external {
        if (!accountList[msg.sender] && msg.sender != owner)
            revert Unauthorized();

        cfaV1.deleteFlow(msg.sender, address(this), token);
    }
}
