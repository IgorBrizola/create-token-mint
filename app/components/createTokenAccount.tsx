"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { useState } from "react";

import {
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";

export default function CreateTokenAccount() {
  
  const [txSig, setTxSig] = useState("");
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const link = () => {
    return txSig
      ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet`
      : "";
  };

  const createTokenAccount = async (event) => {
    event.preventDefault();
    if (!connection || !publicKey) {
      return;
    }
    const transaction = new web3.Transaction();
    const owner = new web3.PublicKey(event.target.owner.value);
    const mint = new web3.PublicKey(event.target.mint.value);

    const associatedToken = await getAssociatedTokenAddress(
      mint,
      owner,
      false,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    transaction.add(
      createAssociatedTokenAccountInstruction(
        publicKey,
        associatedToken,
        owner,
        mint,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      )
    );

    sendTransaction(transaction, connection).then((sig) => {
      setTxSig(sig);
    });
  };

  return (
    <div className="w-full flex flex-col gap-2 justify-center items-center">
      <br />
      {publicKey ? (
        <div
          className="max-w-md w-full mx-auto relative overflow-hidden z-10 bg-gray-800 p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12"
        >
          <form onSubmit={createTokenAccount}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300"
              >Token Mint</label>
              <input
                className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                type="text"
                id="mint"
                placeholder="Enter Token Mint"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300"
              >Token Account Owner</label>
              <input
                className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                id="owner"
                placeholder="Enter Token Account Owner PublicKey"
                type="text"
              />
            </div>

            <div className="flex justify-center items-center">
              <button
                className="bg-gradient-to-r from-purple-600 via-purple-400 to-emerald-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                type="submit"
              >
                Create Token Account
              </button>
            </div>
          </form>
        </div>
      ) : (
        <span className="md:text-5xl text-3xl font-light mt-12 bg-gradient-to-r from-purple-400 to-sky-300 bg-clip-text text-transparent">Connect Your Wallet!</span>
      )}
      {txSig ? (
           <div className="text-center flex flex-col gap-2  relative w-full justify-center items-center">
                                <a className="bg-gradient-to-t from-purple-500 to-teal-300 bg-clip-text text-transparent text-3xl font-normal hover:text-purple-700 text-decoration-line: underline" target="_blank" href={link()}>Veja no Solana Explorer</a>
                          </div>
      ) : null}
    </div>
  );
};