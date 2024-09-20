import styles from "./styles.module.css";

const NotConnectedUI = () => {
    return (
        <div className={styles.maincontainer}>
            <h1 className={styles.heading}>Welcome to Guard Wallet</h1>
            <p className={styles.desc}>
                Guard Wallet is a secure and decentralized multisignature wallet solution designed to protect your digital assets.
                With multisig functionality, you can require multiple approvals to confirm transactions, adding an extra layer of
                security and peace of mind.
            </p>
            <h2 className={styles.heading}>Start by Connecting Your Wallet</h2>
            <p className={styles.desc}>
                To get started, please connect your cryptocurrency wallet. Once connected, you'll be able to create and manage
                wallets with multiple signers, ensuring your funds are always safeguarded.
            </p>
        </div>
    );
};

export default NotConnectedUI;
