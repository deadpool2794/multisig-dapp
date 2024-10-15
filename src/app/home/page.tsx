"use client";

import Header from "../_components/Header/index";
import Footer from "../_components/Footer/index";
import { useAccount, useChainId } from "wagmi";
import NotConnectedUI from "../_components/NotConnectedUI";
import WalletsFoundView from "../_components/WalletsFoundView";
import ConnectedWithNoWallets from "../_components/ConnectedWithNoWalletsUI";
// import { watchContractEvent } from "@wagmi/core";
import deployedContracts from "@/contracts/deployedContracts";
// import { config } from "../App";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const HomePage = () => {
    const chainId: number = useChainId();
    const walletGenerator = "WalletGenerator";
    const contractDetails = deployedContracts[chainId as keyof typeof deployedContracts][walletGenerator];
    const eventName = "WalletCreated";

    const contractAddress = contractDetails.address;
    const contractABI = contractDetails.abi;

    const { isConnected } = useAccount();

    const [walletCreatedEvents, setWalletCreatedEvents] = useState([]);

    // const unwatch = watchContractEvent(config, {
    //     address: contractAddress,
    //     abi: contractABI,
    //     eventName,
    //     onLogs(logs) {
    //         console.log("New logs!", logs);
    //         walletCreateEvents.push(logs);
    //     },
    //     fromBlock: BigInt(1),
    // });
    // unwatch();

    let render;
    if (!isConnected) {
        render = NotConnectedUI();
    } else if (walletCreatedEvents.length > 0) {
        render = WalletsFoundView();
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
