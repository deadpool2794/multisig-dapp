//SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

import "./MultiSigWallet.sol";

contract WalletGenerator {
    event WalletCreated(
        address[] owners,
        uint256 signaturesRequired,
        address indexed walletAddress
    );

    address immutable owner;
    MultiSigWallet multiSigWallet;

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotOwner(msg.sender);
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createNewWallet(
        address[] calldata owners,
        uint256 signaturesRequired
    ) external {
        multiSigWallet = new MultiSigWallet(owners, signaturesRequired);

        emit WalletCreated(owners, signaturesRequired, address(multiSigWallet));
    }

    function withdraw() external onlyOwner {
        (bool sent, ) = payable(msg.sender).call{value: address(this).balance}(
            ""
        );
        if (!sent) revert("withdraw failed");
    }

    receive() external payable {}
}
