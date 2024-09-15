"use client";
import { useState } from "react";
import Image from "next/image";
import logo from "../../public/logo.jpeg";
import styles from "./styles.module.css";
import CustomConnectButton from "../CustomConnectButton/index";
import HeaderMenuLinks from "../HeaderMenuLinks/index";

const Header = () => {
    const [isConnected, toggleIsConnected] = useState(false);
    return (
        <nav className={styles.maincontainer}>
            <div className={styles.leftcontainer}>
                <a className={styles.leftcontainer} href="/home">
                    <Image src={logo} alt="logo" width={50} height={50} />
                    <div className={styles.nameanddescriptioncontainer}>
                        <h1 className={styles.logoname}>Gaurd Wallet</h1>
                        <p className={styles.logodesc}>Simple. Smart. Secure</p>
                    </div>
                </a>
                <HeaderMenuLinks />
            </div>
            <div className={styles.rightcontainer}>
                <CustomConnectButton />
            </div>
        </nav>
    );
};

export default Header;
