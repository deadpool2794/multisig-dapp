import styles from "./page.module.css";
import Footer from "./_components/Footer/index";

export default function Home() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1 className={styles.apptitle}>Gaurd Wallet</h1>
                <p className={styles.appdescription}>
                    Gaurd Wallet is a secure multisignature wallet for managing digital assets. It ensures transactions require
                    approval from all signers, adding an extra layer of protection for your cryptocurrency.
                </p>
                <p className={styles.appdescription}> Simple. Smart. Secure.</p>
                <div className={styles.ctas}>
                    <a href="/home" rel="noopener noreferrer" className={styles.secondary}>
                        Get Started
                    </a>
                </div>
            </main>
            <Footer />
        </div>
    );
}
