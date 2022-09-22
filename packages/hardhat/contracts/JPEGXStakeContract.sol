// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IERC721Receiver} from "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract JPEGXStakeContract is IERC721Receiver {
    address tokenAddress;
    uint256 creationEpoch;
    uint256 optionExpiration = 7 days;
    uint256 mockMarketPrice = 2 ether;
    uint256 mockOptionPrice = 125000000 gwei;
    mapping(uint256 => uint256) tokenId_strikePrice;
    mapping(uint256 => bool) tokenId_flowOpened;
    mapping(uint256 => bool) tokenId_traded;
    mapping(uint256 => address) tokenId_owner;
    mapping(uint256 => uint256) tokenId_ending;
    IERC721 token;

    constructor(address _tokenAddress) public {
        tokenAddress = _tokenAddress;
        creationEpoch = block.timestamp;
        token = IERC721(_tokenAddress);
    }

    //  The NFT Provider write the option a the stike price wished
    function stakerIn(uint256 _strikePrice, uint256 _tokenId) public {
        require(
            token.ownerOf(_tokenId) == address(this),
            "This token isn't deposited"
        );
        require(
            tokenId_owner[_tokenId] == msg.sender,
            "You didn't deposit this NFT"
        );
        require(tokenId_traded[_tokenId] == false, "NFT is actually traded");
        if (tokenId_flowOpened[_tokenId] == false) {
            tokenId_flowOpened[_tokenId] = true;
            //  Let the flow start
            //  gainShare(msg.sender)    // @Superfluid
        }
        tokenId_strikePrice[_tokenId] = _strikePrice;
    }

    //  Buy the option and start the deal
    //  Need reentrency guard here
    function startDeal(uint256 _tokenId) public payable {
        uint256 optionPrice = getOptionPrice(_tokenId);
        require(
            msg.value == optionPrice,
            "msg.value doesn't match the option price"
        );
        require(tokenId_flowOpened[_tokenId] == true, "NFT not flowOpened");
        require(tokenId_traded[_tokenId] == false, "NFT already traded");
        tokenId_traded[_tokenId] = true;
        tokenId_ending[_tokenId] = block.timestamp + optionExpiration;
    }

    //  Function called at the option expiry
    function executeDeal(uint256 _tokenId) public {
        require(tokenId_traded[_tokenId] == true, "NFT not traded");
        uint256 endingTimestamp = tokenId_ending[_tokenId];
        require(
            block.timestamp > endingTimestamp,
            "Option period isn't expired yet"
        );
        uint256 marketPrice = getPrice();
        uint256 strikePrice = tokenId_strikePrice[_tokenId];
        if (marketPrice > strikePrice) {
            //  Price is above strike price, option expiries in the money
            //  Option buyer is required to add eth to cover position
            //  Owner is required to add eth to cover position
            //  coverPositionOrSellTheNFT()     //  function to be created  @Notification
        } else {
            //  Option expires worthless
            //  Owner withdraws NFT and premium
            //  distribute()    // @Superfluid
            tokenId_traded[_tokenId] = false;
        }
    }

    function withdrawNFT(uint256 _tokenId) public {
        require(tokenId_owner[_tokenId] == msg.sender);
        require(tokenId_traded[_tokenId] == false);
        tokenId_owner[_tokenId] = address(0);
        tokenId_flowOpened[_tokenId] = false;
        //  loseShare(msg.sender)    // @Superfluid
        token.safeTransferFrom(address(this), msg.sender, _tokenId);
    }

    //  Need to check ERC721 token address -- Critical
    function onERC721Received(
        address _sender,
        address _from,
        uint256 _tokenId,
        bytes memory
    ) public virtual override returns (bytes4) {
        tokenId_owner[_tokenId] = _from;
        return this.onERC721Received.selector;
    }

    //  Mock function -- Waiting for Oracle
    function getPrice() public returns (uint256) {
        //  getFloorPrice()    // @Oracle
        return mockMarketPrice;
    }

    //  Mock function -- Need to find the right equation
    function getOptionPrice(uint256 _tokenId) public returns (uint256) {
        uint256 mPrice = getPrice(); // mPrice = FloorPrice
        //  uint256 _optionPrice = (mPrice * 1000) / (2718**((693 * tokenId_strikePrice[_tokenId]) / mPrice)) - mPrice;     // Real function (or not so far) but overflows
        return mockOptionPrice;
    }
}
