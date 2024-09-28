import { type Chain } from "viem";

export const ganache = {
    id: 1337,
    name: "Ganache",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: {
        default: { http: ["HTTP://127.0.0.1:7545"] },
    },
} as const satisfies Chain;
