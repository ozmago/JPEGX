// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Auction is ReentrancyGuard {
    event Start(uint256 _nftId, uint256 startingBid);
    event End(address actualBidder, uint256 highestBid);
    event Bid(address indexed sender, uint256 amount);
    event Withdraw(address indexed bidder, uint256 amount);

    address payable public seller;

    mapping(uint256 => bool) public started;
    mapping(uint256 => uint256) public endAt;

    IERC721 public nft;
    uint256 public nftId;

    mapping(uint256 => uint256) public highestBid;
    mapping(uint256 => address) public actualBidder;
    mapping(uint256 => mapping(address => uint256)) public bids;
    mapping(uint256 => address) public optionWriter;
    mapping(uint256 => address) public optionOwner;
    mapping(uint256 => uint256) public debt;

    constructor(address _tokenAddess) {
        //seller = payable(msg.sender);
        nft = IERC721(_tokenAddess);
    }

    function start(
        uint256 _nftId,
        uint256 startingBid,
        address _optionWriter,
        address _optionOwner,
        uint256 _debt
    ) public nonReentrant {
        require(!started[_nftId], "Already started[_nftId]!");
        highestBid[_nftId] = startingBid;
        started[_nftId] = true;
        endAt[_nftId] = block.timestamp + 2 days;
        optionWriter[_nftId] = _optionWriter;
        optionOwner[_nftId] = _optionOwner;
        debt[_nftId] = _debt;

        emit Start(_nftId, startingBid);
    }

    function bid(uint256 _nftId) external payable {
        require(started[_nftId], "Not started[_nftId].");
        require(block.timestamp < endAt[_nftId], "ended[_nftId]!");
        require(
            msg.value + bids[_nftId][msg.sender] > highestBid[_nftId],
            "the total bid is lower than actual maxBid"
        );
        bids[_nftId][msg.sender] += msg.value;
        highestBid[_nftId] = bids[_nftId][msg.sender];
        actualBidder[_nftId] = msg.sender;
        emit Bid(actualBidder[_nftId], highestBid[_nftId]);
    }
    //  Users can retract at any times if they aren't the actual bidder
    function withdraw(uint256 _nftId) external payable nonReentrant {
        require(msg.sender != actualBidder[_nftId], "You are the actual bidder");
        uint256 bal = bids[_nftId][msg.sender];
        bids[_nftId][msg.sender] = 0;
        (bool sent, bytes memory data) = payable(msg.sender).call{value: bal}("");
        require(sent, "Could not withdraw");

        emit Withdraw(msg.sender, bal);
    }

    // End the Auction, this function needs to be trigerred by hand in a first time
    function end(uint256 _nftId) internal nonReentrant returns (bool)  {
        require(started[_nftId], "You need to start first!");
        require(block.timestamp >= endAt[_nftId], "Auction is still ongoing!");
        bool sellIsDone = false;

        if (actualBidder[_nftId] != address(0)) {
            bids[_nftId][actualBidder[_nftId]] = 0;
            //Transfers the NFT to the actualBidder
            nft.safeTransferFrom(address(this), actualBidder[_nftId], nftId);
            payable(optionOwner[_nftId]).transfer(debt[_nftId]);
            payable(optionWriter[nftId]).transfer((highestBid[_nftId] * 90) / 100);
            actualBidder[_nftId] = address(0);
            sellIsDone = true;
        }

        started[_nftId] = false;
        emit End(actualBidder[_nftId], highestBid[_nftId]);
        return sellIsDone;
    }
}
