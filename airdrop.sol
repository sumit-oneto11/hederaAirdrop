// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC1155.sol";


contract AirDrop {
    uint256 counter;
    address owner;

    // Mapping from claimed address
    mapping(address => bool) public claimedAddress;
    
    // for pause and unpause airdrop
    bool pause;

    constructor(address _owner){
        owner=_owner;
        counter++;
    }

    modifier isPause() {
        require(!pause,"Airdrop Paused");
         _;
    }

    modifier onlyOwner() {
        require(msg.sender==owner,"Airdrop Paused");
         _;
    }

    function claimAirdrop(IERC1155 _nftContract) isPause public {
        require(!claimedAddress[msg.sender],"Already Claimed!");
        _nftContract.safeTransferFrom(address(this), msg.sender, counter, 1, "");
        claimedAddress[msg.sender]=true;
        counter++;
    }

    function togglePause(bool _value) public onlyOwner{
       pause=_value; 
    }

}
