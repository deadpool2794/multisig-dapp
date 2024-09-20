//SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import "./MultiSigWallet.sol";

contract WalletGenerator {
    event WalletCreated(
        address[] owners,
        uint256 signaturesRequired,
        address walletAddress
    );

    MultiSigWallet multiSigWallet;

    function createNewWallet(
        address[] memory owners,
        uint256 signaturesRequired
    ) external {
        multiSigWallet = new MultiSigWallet();
        multiSigWallet.init(owners, signaturesRequired);

        emit WalletCreated(owners, signaturesRequired, address(multiSigWallet));
    }
}
