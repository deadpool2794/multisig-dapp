//SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import "./MultiSigWallet.sol";

contract WalletGenerator {
    uint256 public num;

    function setNum(uint256 _num) public {
        num = _num;
    }

    function getNum() public view returns (uint256) {
        return num;
    }

    function createNewWallet(
        address[] memory _owners,
        uint256 _requiredSinatures
    ) public payable {}
}
