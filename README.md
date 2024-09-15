# Guard Wallet

Guard Wallet is a decentralized multi-signature wallet dApp that provides enhanced security by requiring multiple signers to approve transactions before they are executed. Built using Next.js for the front-end and Hardhat for smart contract development, this project allows users to create multi-signer wallets, manage signers, and execute secure transactions on the Ethereum blockchain.

## Prerequisites

Before running the project locally, ensure that you have the following installed:

-   [Node.js](https://nodejs.org/) (for managing dependencies and running the project)
-   npm (which comes with Node.js)
-   MetaMask or any Ethereum-compatible wallet to interact with the dApp

## Getting Started

To set up and run Guard Wallet on your local system, follow these steps:

### 1. Clone the Repository

```
git clone <repository-url>
cd guard-wallet
```

### 2. Install Dependencies

Once inside the project directory, install the necessary dependencies by running:

```
npm install
```

### 3. Running the Application Locally

Guard Wallet requires two separate terminals to run the project locally:

#### Terminal 1: Spin Up a Local Hardhat Node

In the first terminal, run the following command to start a new local Ethereum blockchain node and automatically deploy the smart contracts:

```
npx hardhat node
```

This command will start a Hardhat local blockchain and deploy your smart contracts to it. You’ll see the accounts and contract addresses displayed in the terminal once it's running.

#### Terminal 2: Start Next.js Server

In the second terminal, start the Next.js development server by running:

```
npm run dev
```

### Technologies Used

-   Node.js - For managing dependencies and project runtime.
-   Next.js - Frontend framework used to build the interface.
-   Hardhat - Ethereum development environment for smart contract deployment and testing.
-   WAGMI - Used for connecting Ethereum wallets to the dApp.
-   RainbowKit - Provides a user-friendly interface for wallet connections.
-   CSS - For styling the front-end components.
-   MetaMask - Ethereum wallet used for interacting with the dApp.
