import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "./styles.module.css";

const CustomConnectButton = () => {
    return (
        <ConnectButton.Custom>
            {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== "loading";
                const connected =
                    ready && account && chain && (!authenticationStatus || authenticationStatus === "authenticated");

                return (
                    <div
                        {...(!ready && {
                            "aria-hidden": true,
                            style: {
                                opacity: 0,
                                pointerEvents: "none",
                                userSelect: "none",
                            },
                        })}
                    >
                        {(() => {
                            if (!connected) {
                                return (
                                    <button className={styles.walletbtn} onClick={openConnectModal} type="button">
                                        Connect Wallet
                                    </button>
                                );
                            }

                            if (chain.unsupported) {
                                return (
                                    <button onClick={openChainModal} type="button">
                                        Wrong network
                                    </button>
                                );
                            }

                            return (
                                <div style={{ display: "flex", gap: 12 }}>
                                    <button className={styles.chainicon} onClick={openChainModal} type="button">
                                        {chain.hasIcon && chain.iconUrl && (
                                            <img alt={chain.name ?? "Chain icon"} src={chain.iconUrl} />
                                        )}
                                    </button>

                                    <button className={styles.addressbtn} onClick={openAccountModal} type="button">
                                        {account.displayName}
                                    </button>
                                </div>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
};

export default CustomConnectButton;
