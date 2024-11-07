'use client';

import NumberTicker from "@/components/ui/number-ticker";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { FC, useEffect, useState } from "react";

export const BalanceDisplay: FC = () => {
  const [balance, setBalance] = useState(0);
  const [displayedBalance, setDisplayedBalance] = useState(0); 
  const { connection } = useConnection();
 const {publicKey} = useWallet();

  useEffect(() => {
    const updateBalance = async () => {
      if (!connection || !publicKey) {
        return;
      }

      try {
        const subscriptionId = connection.onAccountChange(
          publicKey,
          updatedAccountInfo => {
            if (updatedAccountInfo) {
              const newBalance = updatedAccountInfo.lamports / LAMPORTS_PER_SOL;
              setBalance(newBalance); 
            }
          },
          {
            commitment: "confirmed",
          }
        );

        const accountInfo = await connection.getAccountInfo(publicKey);
        
        if (accountInfo) {
          setBalance(accountInfo.lamports / LAMPORTS_PER_SOL);
        }

        return () => {
          connection.removeAccountChangeListener(subscriptionId);
        };
      } catch (error) {
        console.error("Failed to retrieve account info:", error);
      }
    };

    updateBalance();
  }, [connection, publicKey]);

  useEffect(() => {
    if (displayedBalance === balance) return;

    const increment = (balance - displayedBalance) / 20;
    const interval = setInterval(() => {
      setDisplayedBalance((prevBalance) => {
        const newBalance = prevBalance + increment;
        if (newBalance >= balance) {
          clearInterval(interval);
          return balance;
        }
        return newBalance;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [balance, displayedBalance]);

  return (
    <div className="flex w-full items-center justify-center absolute top-8">
      <p className="md:text-5xl text-3xl font-light mt-12 bg-gradient-to-r from-purple-400 to-sky-300 bg-clip-text text-transparent">
        {publicKey ? (
          <>
                <NumberTicker value={displayedBalance} decimalPlaces={2} /> <span>SOL</span>
          </>
        ) : (
          '0 SOL'
        )}      </p>
    </div>
  );
};
