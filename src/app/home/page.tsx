"use client";

import Header from "../_components/Header/index";
import Footer from "../_components/Footer/index";
import styles from "./styles.module.css";
import { useAccount } from "wagmi";
import NotConnectedUI from "../_components/NotConnectedUI";
import ConnectedWithNoWallets from "../_components/ConnectedWithNoWalletsUI";

const HomePage = () => {
    const { isConnected } = useAccount();
    let render;
    if (!isConnected) {
        render = NotConnectedUI();
    } else {
        render = ConnectedWithNoWallets();
    }
    return (
        <div className={styles.homepage}>
            <Header />
            <div className={styles.homeUI}>{render}</div>

            <Footer />
        </div>
    );
};

export default HomePage;
