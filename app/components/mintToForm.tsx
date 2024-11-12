"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { useState } from "react";
import {
  createMintToInstruction,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

export default function MintToForm() {
  const [txSig, setTxSig] = useState("");
  const [balance, setBalance] = useState("0");
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const link = () => {
    return txSig
      ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet`
      : "";
  };

  const mintTo = async (event) => {
    event.preventDefault();
    if (!connection || !publicKey) {
      return;
    }

    const mintPubKey = new web3.PublicKey(event.target.mint.value);
    const recipientPubKey = new web3.PublicKey(event.target.recipient.value);
    const amount = Number(event.target.amount.value);

    const associatedToken = await getAssociatedTokenAddress(
      mintPubKey,
      recipientPubKey,
      false,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    const transaction = new web3.Transaction().add(
      createMintToInstruction(mintPubKey, associatedToken, publicKey, amount)
    );

    const signature = await sendTransaction(transaction, connection);

    const latestBlockhash = await connection.getLatestBlockhash();
    await connection.confirmTransaction(
      {
        signature,
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
      },
      "confirmed"
    );

    setTxSig(signature);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const tokenBalance = await connection.getTokenAccountBalance(
      associatedToken,
      "confirmed"
    );
    setBalance(tokenBalance.value.uiAmountString ?? "0");
  };

  return (
    <div className="flex flex-col justify-center mb-12 items-center gap-2">
      <br />
      {publicKey ? (
        <div className="max-w-xl w-96 mx-auto relative overflow-hidden z-10 bg-gray-800 p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
          <form onSubmit={mintTo}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Token Mint
              </label>
              <input
                className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                type="text"
                id="mint"
                placeholder="Enter Token Mint"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Recipient
              </label>
              <input
                className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                id="recipient"
                type="text"
                placeholder="Enter Recipient PublicKey"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Amount
              </label>
              <input
                className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                id="amount"
                type="number"
                placeholder="100"
                required
              />
            </div>

            <div className="flex justify-center items-center">
              <button
                className="bg-gradient-to-r from-purple-600 via-purple-400 to-emerald-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                type="submit"
              >
                Mint Tokens
              </button>
            </div>
          </form>

          {txSig ? (
            <div className="text-center flex flex-col relative w-full justify-center items-center mt-2">
              <p className=" uppercase font-light bg-gradient-to-r from-emerald-400 to-purple-500 bg-clip-text text-transparent">
                Amount Token: {balance}
              </p>
              <a
                className="bg-gradient-to-t from-purple-500 to-teal-300 bg-clip-text text-transparent text-2xl font-normal hover:text-purple-700 text-decoration-line: underline"
                target="_blank"
                href={link()}
              >
                Veja no Solana Explorer
              </a>
            </div>
          ) : null}
        </div>
        
      ) : (
          <span className="md:text-5xl text-3xl font-light mt-12 bg-gradient-to-r from-purple-400 to-sky-300 bg-clip-text text-transparent">Connect Your Wallet!</span>
      )}
    
    </div>
  );
}
