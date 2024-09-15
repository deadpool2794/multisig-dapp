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
    ) external returns (MultiSigWallet) {
        // ["0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc", "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955", "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720"]
        //  2

        multiSigWallet = new MultiSigWallet();
        multiSigWallet.init(owners, signaturesRequired);

        emit WalletCreated(owners, signaturesRequired, address(multiSigWallet));

        return multiSigWallet;
    }
}
