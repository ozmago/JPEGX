// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "./Auction.sol";
import "./PremiumDistribution.sol";
import "https://github.com/tellor-io/usingtellor/blob/master/contracts/UsingTellor.sol";

contract JPEGXStakeContract is ERC721Holder, Auction,UsingTellor {
    uint256 public immutable optionExpiration = 1 hours;
    uint256 public immutable coverPositionExpiry = 1 hours;
    uint256 public immutable mockOptionPrice = 125000000 gwei;
    address payable tellormock = payable(0x7B8AC044ebce66aCdF14197E8De38C1Cc802dB4A);
    //ISuperfluid superfluidhost = ISuperfluid(0xEB796bdb90fFA0f28255275e16936D25d3418603);
    //ISuperToken superfluidtoken = ISuperToken(0x96B82B65ACF7072eFEb00502F45757F254c2a0D4);
    mapping(uint256 => uint256) public tokenId_strikePrice;
    mapping(uint256 => bool) public tokenId_flowOpened;
    mapping(uint256 => bool) public tokenId_traded;
    mapping(uint256 => address) public tokenId_owner;
    mapping(uint256 => address) public tokenId_buyer;
    mapping(uint256 => uint256) public tokenId_ending;
    mapping(uint256 => uint256) public tokenId_coverPositionExpiry;
    mapping(uint256 => uint256) public tokenId_coverPositionAmount;
    mapping(uint256 => bool) public tokenId_liquidable;
    IERC721 token;
    PremiumDistribution shareDistribution = PremiumDistribution(0x5551F981E586AbC07b2531658Eb900AC9E9DA5cB);


    event Staked(
        address indexed owner,
        uint256 id,
        uint256 time,
        uint256 strikePrice
    );
    event Executeddeal(address indexed caller, uint256 id, uint256 time);
    event Dealstarted(
        address indexed owner,
        uint256 value,
        uint256 id,
        uint256 time
    );
    event LiquidatedNFT(uint256 id, uint256 time);
    event withdrawdNFT(address indexed owner, uint256 id, uint256 time);

    constructor(address _tokenAddress) Auction(_tokenAddress) UsingTellor(tellormock) {
        token = IERC721(_tokenAddress);
    }

    //  The NFT Provider write the option a the stike price wished
    function stakerIn(uint256 _strikePrice, uint256 _tokenId)
        public
        nonReentrant
    {
        require(
            token.ownerOf(_tokenId) == msg.sender,
            "You are not the owner of this NFT"
        );
        //store varibles
        tokenId_owner[_tokenId] = msg.sender;
        // transfer the token from owner to contract
        token.safeTransferFrom(msg.sender, address(this), _tokenId, "0x00");
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
            gainShare(msg.sender); // @Superfluid
        }
        tokenId_strikePrice[_tokenId] = _strikePrice;
        emit Staked(msg.sender, _tokenId, block.timestamp, _strikePrice);
    }

    //  Buy the option and start the deal
    function startDeal(uint256 _tokenId) public payable nonReentrant {
        uint256 optionPrice = getOptionPrice(_tokenId);
        require(
            msg.value == optionPrice,
            "msg.value doesn't match the option price"
        );
        require(tokenId_flowOpened[_tokenId] == true, "NFT not flowOpened");
        require(tokenId_traded[_tokenId] == false, "NFT already traded");
        tokenId_traded[_tokenId] = true;
        tokenId_ending[_tokenId] = block.timestamp + optionExpiration;
        tokenId_buyer[_tokenId] = msg.sender;
        emit Dealstarted(msg.sender, msg.value, _tokenId, block.timestamp);
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
            tokenId_liquidable[_tokenId] = true;
            tokenId_coverPositionExpiry[_tokenId] =
                block.timestamp +
                coverPositionExpiry;
            tokenId_coverPositionAmount[_tokenId] = marketPrice - strikePrice; 
            //start(_tokenId, 1300 wei);
        } else {
            //  Option expires worthless
            //  Owner withdraws NFT and premium
            distribute(); // @Superfluid
            tokenId_traded[_tokenId] = false;
        }
        emit Executeddeal(msg.sender, _tokenId, block.timestamp);
    }

    //  Function called by the owner of the NFT when to cover position from being liquidated
    function coverPosition(uint256 _tokenId) public payable nonReentrant {
        require(
            tokenId_liquidable[_tokenId] == true,
            "NFT is not in liquidation"
        );
        require(
            msg.value == tokenId_coverPositionAmount[_tokenId],
            "msg.value doesn't match the cover position price"
        );
        payable(tokenId_buyer[_tokenId]).transfer(msg.value);
        tokenId_liquidable[_tokenId] = false;
        tokenId_traded[_tokenId] = false;
    }

    function liquidateNFT(uint256 _tokenId) public {
        require(block.timestamp > tokenId_coverPositionExpiry[_tokenId]);
        uint256 liquidationPrice = (getPrice() * 900) / 1000;
        start(
            _tokenId,
            liquidationPrice,
            tokenId_owner[_tokenId],
            tokenId_buyer[_tokenId],
            tokenId_coverPositionAmount[_tokenId]
        );
        emit LiquidatedNFT(_tokenId, block.timestamp);
    }

    // Withdraw your NFT from the pool, see you soon !
    function withdrawNFT(uint256 _tokenId) public {
        require(tokenId_owner[_tokenId] == msg.sender);
        require(tokenId_traded[_tokenId] == false);
        tokenId_owner[_tokenId] = address(0);
        tokenId_flowOpened[_tokenId] = false;
        //  loseShare(msg.sender)    // @Superfluid
        token.safeTransferFrom(address(this), msg.sender, _tokenId);
        emit withdrawdNFT(msg.sender, _tokenId, block.timestamp);
    }

    //  Mock function -- Waiting for Oracle
    function getPrice() public view returns(uint256) {
    
      bytes memory _queryData = abi.encode("ExampleNftCollectionStats", abi.encode("proof-moonbirds"));
      bytes32 _queryId = keccak256(_queryData);
      
      (bool ifRetrieve, bytes memory _value, ) =
          getDataBefore(_queryId, block.timestamp - 1 hours);
      if (!ifRetrieve) return 0;
      // Returns moon bird floor price, 11 * 10**18
      return abi.decode(_value, (uint256[]))[0];
    }

    //  Mock function -- Need to find the right equation
    function getOptionPrice(uint256 _strikePrice) public view returns (uint256) {
        /*
        require(_strikePrice > 0, "strikePrice <0");
        uint256 marketPrice = getPrice();
        require(_strikePrice < 2 * marketPrice, "_strikePrice>2*marketPrice");
        return marketPrice - _strikePrice / 2 + 10000000 gwei; */
        return mockOptionPrice;
        
    }

    function finishAuction(uint256 _tokenId) public nonReentrant {
        bool sellIsDone = end(_tokenId);
        if (sellIsDone) {
            tokenId_owner[_tokenId] = address(0);
            tokenId_flowOpened[_tokenId] = false;
        } else {
            uint256 liquidationPrice = (getPrice() * 400) / 1000;
            start(
                _tokenId,
                liquidationPrice,
                tokenId_owner[_tokenId],
                tokenId_buyer[_tokenId],
                tokenId_coverPositionAmount[_tokenId]
            );
        }
    }

    function gainShare(address _nftProvider) internal {
        shareDistribution.gainShare(_nftProvider);
    }

    function distribute() internal {
        shareDistribution.distribute();
    }


}
