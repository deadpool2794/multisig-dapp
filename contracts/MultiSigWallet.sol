//SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

// ["0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2", "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2"]

error NeedAtleastTwoOwners();
error InvalidValueForRequiredSignatures();
error NoDuplicateOwners();
error NotOwner(address);

contract MultiSigWallet {
    event Deposit(address indexed sender, uint256 amount, uint256 balance);
    mapping(address => bool) private uniqueOwners;
    address[] public owners;
    uint256 public immutable signaturesRequired;

    constructor(address[] memory _owners, uint256 _signaturesRequired) {
        if (_owners.length <= 1) revert NeedAtleastTwoOwners();

        if (!(_signaturesRequired > 0 && _signaturesRequired <= _owners.length))
            revert InvalidValueForRequiredSignatures();

        if (!noDuplicateOwners(_owners)) revert NoDuplicateOwners();

        signaturesRequired = _signaturesRequired;
        for (uint256 i = 0; i < _owners.length; ++i) {
            owners.push(_owners[i]);
        }
    }

    function noDuplicateOwners(
        address[] memory _owners
    ) private returns (bool) {
        for (uint256 i = 0; i < _owners.length; ++i) {
            if (uniqueOwners[_owners[i]]) return false;
            uniqueOwners[_owners[i]] = true;
        }
        return true;
    }

    function deposit() external payable {
        emit Deposit(msg.sender, msg.value, address(this).balance);
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value, address(this).balance);
    }
}
