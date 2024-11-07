'use client';

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import * as web3 from "@solana/web3.js";
import { MINT_SIZE, TOKEN_PROGRAM_ID, getMinimumBalanceForRentExemptMint, createInitializeMintInstruction } from "@solana/spl-token";
export default function CreateMint() {

  const [txSig, setTxSig] = useState("");

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const link = () => {
    return txSig
      ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet`
      : "";
  };

  const createMint = async (event) => {
    event.preventDefault();
    if (!connection || !publicKey) {
      return;
    }

    const mint = web3.Keypair.generate();

    const lamports = await getMinimumBalanceForRentExemptMint(connection);

    const transaction = new web3.Transaction();

    transaction.add(
      web3.SystemProgram.createAccount({
        fromPubkey: publicKey,
        newAccountPubkey: mint.publicKey,
        space: MINT_SIZE,
        lamports,
        programId: TOKEN_PROGRAM_ID,
      }),
      createInitializeMintInstruction(
        mint.publicKey,
        0,
        publicKey,
        publicKey,
        TOKEN_PROGRAM_ID
      )
    );

    sendTransaction(transaction, connection, {
      signers: [mint],
    }).then((sig) => {
      setTxSig(sig);
    });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      {publicKey ? (
        <form onSubmit={createMint}>
          <button type="submit" className="flex items-center justify-center w-52 h-14 text-white font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-lg shadow-lg hover:scale-105 duration-200 hover:drop-shadow-2xl hover:shadow-indigo-500 hover:cursor-pointer">
            Create Mint
          </button>
        </form>
      ) : (
        <span className="md:text-5xl text-3xl font-light mt-12 bg-gradient-to-r from-purple-400 to-sky-300 bg-clip-text text-transparent">Connect Your Wallet!</span>
      )}
      {txSig ? (
        <div className="text-center flex flex-col gap-2  relative w-full h-52 justify-center items-center">
          <a className="bg-gradient-to-t from-purple-500 to-teal-300 bg-clip-text text-transparent text-3xl font-normal hover:text-purple-700 text-decoration-line: underline" target="_blank" href={link()}>Veja no Solana Explorer</a>
        </div>
      ) : null}
    </div>
  )
}
