"use client";
import styles from "./styles.module.css";

import CreateWallet from "../CreateWallet";

const ConnectedWithNoWallets = () => {
    const renderRequired = () => {
        return (
            <>
                <h1 className={styles.heading}>No Guard Wallets Found!!</h1>
                <p className={styles.desc2}>Create your own Gaurd Wallet</p>
                <CreateWallet />
            </>
        );
    };

    return <div className={styles.maincontainer}>{renderRequired()}</div>;
};

export default ConnectedWithNoWallets;
