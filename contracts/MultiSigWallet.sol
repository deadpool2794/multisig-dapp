//SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

// 0x6bfCcAFfC8e8399EC200A6E780E85c5D4FED0e56

contract MultiSigWallet {
    mapping(address => bool) private uniqueOwners;
    address[] public owners;
    uint256 public signaturesRequired;

    constructor(address[] memory _owners, uint256 _signaturesRequired) {
        require(owners.length > 1, "Required atleast 2 owners");
        require(
            _signaturesRequired > 0 && _signaturesRequired <= _owners.length,
            "Invalid value for argument _signaturesRequired"
        );
        require(noDuplicateOwners(_owners), "Duplicate owners are not allowed");
        signaturesRequired = _signaturesRequired;
        for (uint256 i = 0; i < _owners.length; ++i) {
            owners.push(_owners[i]);
        }
    }

    function noDuplicateOwners(
        address[] memory _owners
    ) internal view returns (bool) {
        for (uint256 i = 0; i < _owners.length; ++i) {
            if (uniqueOwners[_owners[i]]) return false;
        }
        return true;
    }
}
