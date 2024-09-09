"use client";
import { useState } from "react";
import Image from "next/image";
import logo from "../../public/logo.jpeg";
import styles from "./styles.module.css";

const Header = () => {
    const [isConnected, toggleIsConnected] = useState(false);
    return (
        <nav className={styles.maincontainer}>
            <a className={styles.leftcontainer} href="/home">
                <Image src={logo} alt="logo" width={50} height={50} />
                <div className={styles.nameanddescriptioncontainer}>
                    <h1 className={styles.logoname}>Gaurd Wallet</h1>
                    <p className={styles.logodesc}>Simple. Smart. Secure</p>
                </div>
            </a>
            <div className={styles.rightcontainer}>
                <button type="button" className={styles.walletbtn}>
                    Connect Wallet
                </button>
            </div>
        </nav>
    );
};

export default Header;
