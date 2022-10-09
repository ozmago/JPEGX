// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "./Auction.sol";
import "./PremiumDistribution.sol";
import "@usingtellor/UsingTellor.sol";

/// @notice JPEGX Staking contract - NFT Option Protocol
/// @notice This contract is a staking Pool
/// @notice NFT owners can stake here there ERC721 token
/// @notice They choose a strike price when entering the protocol and write call option
/// @notice Buyers can buy the option for a calculated premium price
/// @notice Premium price is distributed to all NFT owners
/// @notice At the ed of the period, if market price is above strike price, NFT owner has to cover his position, otherwise his NFT will be liquidated
/// @author Rems000

contract JPEGXStakeContract is ERC721Holder, Auction, UsingTellor {
    /// @dev optionExpiry is the time before the option expires,
    /// @dev coverPositionExpiry is the time the NFT owner has tocover his position before his NFT being liquidated
    /// @dev mockOptionPrice is the premium price, it's the value we can buy the option at
    /// @dev premiumFees is the a stable fees used in the calculation of the option price
    /// @dev tellormock is the addres of the oracle giving us the market price on Mumbai
    /// @dev tokenId_strikePrice: mapping giving us NFT strike price according to token Id
    /// @dev tokenId_owner: mapping givig us the NFT writer according to token Id
    /// @dev tokenId_flowOpened: @superfluid related, mapping telling us if the NFT is 'active' and if money from premiums is streamed to owner wallet
    /// @dev tokenId_traded: mapping telling us if the NFT option is actually running
    /// @dev tokenId_buyer: mapping giving us buyer's option according to token Id
    /// @dev tokenId_ending: mapping giving us the timestamp of the option expiry
    /// @dev tokenId_coverPositionExpiry: mapping giving us the timestamp of the cover position phase expiry
    /// @dev tokenId_coverPositionAmount: mapping giving us the amount needed from the option writer to cover his position otherwise the NFT will be liquidated
    /// @dev tokenId_liquidable: mapping telling us if the token can be liquidated or not, the functions related to this action will be automated soon
    /// @dev token is the ERC721 token
    /// @dev shareDistribution id the @Superfluid contract we are using
    /// @dev superfluidhost and superfluidtoken are contract address on Mumbai testnet used to deploy used PremiumDistibution contract
    /// TODO use liquidity pool to cover position

    uint256 public immutable optionExpiry = 1 hours;
    uint256 public immutable coverPositionExpiry = 1 hours;
    uint256 public immutable mockOptionPrice = 125000000 gwei;
    uint256 public immutable premiumFees = 10000000 gwei;
    address payable tellormock =
        payable(0x7B8AC044ebce66aCdF14197E8De38C1Cc802dB4A);
    mapping(uint256 => uint256) public tokenId_strikePrice;
    mapping(uint256 => address) public tokenId_owner;
    mapping(uint256 => bool) public tokenId_flowOpened;
    mapping(uint256 => bool) public tokenId_traded;
    mapping(uint256 => address) public tokenId_buyer;
    mapping(uint256 => uint256) public tokenId_ending;
    mapping(uint256 => uint256) public tokenId_coverPositionExpiry;
    mapping(uint256 => uint256) public tokenId_coverPositionAmount;
    mapping(uint256 => bool) public tokenId_liquidable;
    IERC721 token;
    PremiumDistribution shareDistribution =
        PremiumDistribution(0x5551F981E586AbC07b2531658Eb900AC9E9DA5cB);
    //ISuperfluid superfluidhost = ISuperfluid(0xEB796bdb90fFA0f28255275e16936D25d3418603);
    //ISuperToken superfluidtoken = ISuperToken(0x96B82B65ACF7072eFEb00502F45757F254c2a0D4);

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
    event WithdrawdNFT(address indexed owner, uint256 id, uint256 time);
    event GetOraclePrice(uint256 marketPrice);

    /// @param _tokenAddress is the ERC721 token address
    constructor(address _tokenAddress)
        Auction(_tokenAddress)
        UsingTellor(tellormock)
    {
        token = IERC721(_tokenAddress);
    }

    /// @notice NFT Provider writes the option a the stike price wished
    /// @notice using @Superfluid he start to get premiums at the moment he enters the pool
    /// @param _tokenId Id of the token
    /// TODO polish it up its a mix between enter and actualize position
    function stakerIn(uint256 _strikePrice, uint256 _tokenId)
        public
        nonReentrant
    {
        require(
            token.ownerOf(_tokenId) == msg.sender,
            "You are not the owner of this NFT"
        );
        //store variables
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

    /// @notice Buy the option and start the deal
    /// @param _tokenId Id of the token
    function startDeal(uint256 _tokenId) public payable nonReentrant {
        uint256 optionPrice = getOptionPrice(_tokenId);
        require(
            msg.value == optionPrice,
            "msg.value doesn't match the option price"
        );
        require(tokenId_flowOpened[_tokenId] == true, "NFT not flowOpened");
        require(tokenId_traded[_tokenId] == false, "NFT already traded");
        tokenId_traded[_tokenId] = true;
        tokenId_ending[_tokenId] = block.timestamp + optionExpiry;
        tokenId_buyer[_tokenId] = msg.sender;
        emit Dealstarted(msg.sender, msg.value, _tokenId, block.timestamp);
    }

    /// @notice Function called at the option expiry to execute the deal
    /// @notice case 1: floor price is above strike price, option expiries in the money
    /// @notice Option buyer is required to add eth to cover position
    /// @notice Owner is required to add eth to cover position
    /// @notice If the position isn't covered at the end of
    /// @notice case 2: floor price is below strike price, option expiries worthless
    /// @notice As wondered, nothing special happened heer
    /// @notice
    /// @param _tokenId Id of the token
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

    /// @notice Function called by the owner of the NFT when to cover position from being liquidated
    /// @param _tokenId Id of the token
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

    /// @notice Function called by anyone to liquidate NFT
    /// @notice Used after "executeDeal" function
    /// @notice The function will start an auction on a "liquidable" NFT at (9/10) * market_price
    /// @notice If nobody bet on the auction, a second one can be started at (4/10) * market_price; cf function finishAuction()
    /// @param _tokenId Id of the token
    /// TODO to automate, public for the moment
    function liquidateNFT(uint256 _tokenId) public {
        require(tokenId_liquidable[_tokenId] == true, "NFT is not liquidable");
        require(
            block.timestamp > tokenId_coverPositionExpiry[_tokenId],
            "Cover position phase hasn't expired"
        );
        loseShare(tokenId_owner[_tokenId]);
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

    /// @notice End auction on a liquidated NFT
    /// @notice If nobody bet on the auction, a second one can be started at (4/10) * market_price
    /// @param _tokenId Id of the token
    /// TODO to automate, public for the moment
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

    /// @notice Withdraw your NFT from the pool, see you soon !
    /// @param _tokenId Id of the token
    function withdrawNFT(uint256 _tokenId) public {
        require(tokenId_owner[_tokenId] == msg.sender);
        require(tokenId_traded[_tokenId] == false);
        loseShare(msg.sender);
        tokenId_owner[_tokenId] = address(0);
        tokenId_flowOpened[_tokenId] = false;
        //  loseShare(msg.sender)    // @Superfluid
        token.safeTransferFrom(address(this), msg.sender, _tokenId);
        emit WithdrawdNFT(msg.sender, _tokenId, block.timestamp);
    }

    /// @notice Get floor price of the collection from Tellor oracles
    /// @return uint256 floor price of the collection
    function getPrice() public view returns (uint256) {
        bytes memory _queryData = abi.encode(
            "ExampleNftCollectionStats",
            abi.encode("proof-moonbirds")
        );
        bytes32 _queryId = keccak256(_queryData);

        (bool ifRetrieve, bytes memory _value, ) = getDataBefore(
            _queryId,
            block.timestamp - 1 hours
        );
        if (!ifRetrieve) return 0;
        // Returns moon bird floor price, 11 * 10**18
        return abi.decode(_value, (uint256[]))[0] / 1000; // We need to divide by 1000 because we are poor, even on Mumbai Testnet
    }

    //  Mock function -- Need to find the right equation
    function getOptionPrice(uint256 _strikePrice)
        public
        view
        returns (uint256)
    {
        require(_strikePrice > 0, "strikePrice <0");
        uint256 marketPrice = getPrice();
        require(_strikePrice < 2 * marketPrice, "_strikePrice>2*marketPrice");
        return marketPrice - _strikePrice / 2 + premiumFees;
        //return mockOptionPrice;
    }

    /// @Superfluid implementation

    function gainShare(address _nftProvider) internal {
        shareDistribution.gainShare(_nftProvider);
    }

    function loseShare(address _nftProvider) internal {
        shareDistribution.loseShare(_nftProvider);
    }

    function distribute() internal {
        shareDistribution.distribute();
    }
}
