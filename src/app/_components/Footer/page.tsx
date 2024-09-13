import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiCodeforces, SiLeetcode } from "react-icons/si";
import { LiaFortAwesome } from "react-icons/lia";
import styles from "./styles.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <a href="https://github.com/deadpool2794" target="_blank">
                <FaGithub />
                GitHub
            </a>
            <a href="https://www.linkedin.com/in/abdulalimkhan2794/" target="_blank">
                <FaLinkedin />
                LinkedIn
            </a>
            <a href="https://codeforces.com/profile/itaachi_uchiha" target="_blank">
                <SiCodeforces />
                CodeForces
            </a>
            <a href="https://leetcode.com/u/itaachi_uchiha/" target="_blank">
                <SiLeetcode />
                LeetCode
            </a>
            <a href="https://app.buidlguidl.com/builders/0x9b37f77B307587D6E94FD265c3dE40eb07cFA4Db" target="_blank">
                <LiaFortAwesome />
                BuidlGuidl
            </a>
        </footer>
    );
};

export default Footer;
