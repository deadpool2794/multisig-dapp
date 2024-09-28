require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("hardhat-deploy");
require("hardhat-deploy-ethers");

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const config = {
    solidity: "0.8.24",
    defaultNetwork: "ganache",
    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
    networks: {
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 11155111,
        },
        ganache: {
            url: "HTTP://127.0.0.1:7545",
            accounts: ["0xd96a9b7e81578fcad34a7667c8aa8aafdb6a9437223abd8b9c9262d01c3539be"],
            chainId: 1337,
        },
    },
};

module.exports = config;
