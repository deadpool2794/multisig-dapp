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
            accounts: ["0x52e24d009169db2f09283dd4143d0266229bf4efd677623c13f8284106597b58"],
            chainId: 1337,
        },
    },
};

module.exports = config;
