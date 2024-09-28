"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider, http } from "wagmi";
import { sepolia, hardhat } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ganache } from "./ganacheChain";

export const config = getDefaultConfig({
    appName: "Gaurd Wallet",
    projectId: "ASDFGH",
    chains: [ganache, sepolia, hardhat],
    transports: {
        [ganache.id]: http(),
        [sepolia.id]: http(),
        [hardhat.id]: http("http://127.0.0.1:8545/"),
    },
    ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();
const App = ({ children }: { children: React.ReactNode }) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider modalSize="compact" theme={darkTheme({ borderRadius: "small" })}>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};

export default App;
