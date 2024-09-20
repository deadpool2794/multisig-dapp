"use client";

import Header from "../_components/Header/index";
import Footer from "../_components/Footer/index";
import { useAccount, useChainId } from "wagmi";
import NotConnectedUI from "../_components/NotConnectedUI";
import ConnectedWithNoWallets from "../_components/ConnectedWithNoWalletsUI";
import { watchContractEvent } from "@wagmi/core";
import deployedContracts from "@/contracts/deployedContracts";
import { config } from "../App";

const HomePage = () => {
    const chainId: number = useChainId();
    const walletGenerator = "WalletGenerator";
    const contractDetails = deployedContracts[chainId as keyof typeof deployedContracts][walletGenerator];
    const eventName = "WalletCreated";

    const contractAddress = contractDetails.address;
    const contractABI = contractDetails.abi;

    const { isConnected } = useAccount();

    const unwatch = watchContractEvent(config, {
        address: contractAddress,
        abi: contractABI,
        eventName,
        onLogs(logs) {
            console.log("New logs!", logs);
        },
        fromBlock: BigInt(1),
    });
    // unwatch();

    let render;
    if (!isConnected) {
        render = NotConnectedUI();
    } else {
        render = ConnectedWithNoWallets();
    }
    return (
        <div className="page">
            <Header />
            <div className="pageUI">{render}</div>
            <Footer />
        </div>
    );
};

export default HomePage;
