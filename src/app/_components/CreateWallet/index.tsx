"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import { RxCross1 } from "react-icons/rx";
import { useAccount, useWriteContract, useChainId } from "wagmi";
// import { writeContract } from "@wagmi/core";
import deployedContracts from "@/contracts/deployedContracts";

const CreateWallet = () => {
    const { address } = useAccount();
    const [signers, setSigners] = useState([address, ""]);
    const [errorMsg, setErrorMsg] = useState("");
    const [signaturesRequired, setSignaturesRequired] = useState("1");
    const walletGenerator = "WalletGenerator";
    const wagmiContractWrite = useWriteContract();

    const chainId: number = useChainId();

    // Function to handle input change
    const handleInputChange = (index: number, value: string) => {
        const newSigners = [...signers];
        newSigners[index] = value;
        setSigners(newSigners);
    };

    // Function to add a new signer input
    const addSigner = () => {
        setSigners([...signers, ""]);
    };

    // Function to remove the last signer input
    const removeSigner = (index: number) => {
        const filteredSigners = [];
        for (let i = 0; i < signers.length; ++i) {
            if (i == index) continue;
            filteredSigners.push(signers[i]);
        }

        setSigners(filteredSigners);
    };

    const filterValidAddresses = (addresses: (string | undefined)[]) => {
        const filteredList = addresses.filter((eachAddress) => {
            if (eachAddress?.length != 42) return false;
            return eachAddress.startsWith("0x");
        });
        return filteredList;
    };

    const isValid = (signaturesRequired: string, validAddresses: (string | undefined)[]) => {
        const intSignaturesRequired = parseInt(signaturesRequired);
        return intSignaturesRequired >= 1 && intSignaturesRequired <= validAddresses.length;
    };

    const createWallet = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validAddresses: `0x${string}`[] = filterValidAddresses(signers) as `0x${string}`[];
        if (validAddresses.length < 2) {
            setErrorMsg("Minimum two valid addresses are required");
            return;
        }
        if (isValid(signaturesRequired, validAddresses) === false) {
            setErrorMsg(`Required signatures should be in the range(1, ${validAddresses.length})`);
            return;
        }
        setErrorMsg("");

        console.log(chainId);
        const contractDetails = deployedContracts[chainId as keyof typeof deployedContracts][walletGenerator];

        const contractAddress = contractDetails.address;
        const contractABI = contractDetails.abi;

        wagmiContractWrite.writeContractAsync({
            abi: contractABI,
            address: contractAddress,
            functionName: "createNewWallet",
            args: [validAddresses, BigInt(signaturesRequired)],
            account: address,
        });
    };

    return (
        <form className={styles.maincontainer} onSubmit={createWallet}>
            <h2 className={styles.heading}>Create Multi-Signer Wallet</h2>
            {signers.map((signer, index) => (
                <div className={styles.inputandcross} key={index}>
                    <label className={styles.inputlabel}>{`Signer ${index + 1}`}</label>
                    <input
                        className={styles.signerinput}
                        placeholder={"0xC1f9..."}
                        value={signer}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                    {signers.length > 2 && (
                        <button className={styles.removesignerbutton} onClick={() => removeSigner(index)}>
                            <RxCross1 />
                        </button>
                    )}
                </div>
            ))}

            <button onClick={addSigner} className={styles.addsigner}>
                + add signer
            </button>
            <div className={styles.inputandcross}>
                <label className={styles.inputlabel}>Req Sign</label>
                <input
                    className={styles.signerinput}
                    placeholder={"1"}
                    value={signaturesRequired}
                    onChange={(e) => setSignaturesRequired(e.target.value)}
                />
            </div>

            <button type="submit" className={styles.walletcreatebutton}>
                Create Wallet
            </button>
            {errorMsg.length > 0 && <p className={styles.errormsg}>* {errorMsg}</p>}
        </form>
    );
};

export default CreateWallet;
