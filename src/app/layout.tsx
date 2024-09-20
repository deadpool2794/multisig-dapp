import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import App from "./App";
import Footer from "./_components/Footer";

const projectName = "Gaurd Wallet";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: {
        default: `${projectName}`,
        template: `%s | ${projectName}`,
    },
    description: "A MultiSig Wallet",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <App>{children}</App>
            </body>
        </html>
    );
}
