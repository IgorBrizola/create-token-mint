"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from 'next/dynamic';
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

const WalletMultiButtonDynamic = dynamic(
    () => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton),
    { ssr: false }
);

export default function Header() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; 

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <section className="w-full flex items-center justify-between px-4 py-4 z-50 relative">
            <div className="w-[15vw] flex items-center gap-4">
                <button onClick={toggleTheme} className="p-2 rounded-full duration-700 transition">
                    {theme === 'light' ?<MoonIcon width={25} height={25}/>  : <SunIcon width={25} height={25} /> }
                </button>
                <Link href="/">
                    <Image src="/solana-sol-logo.png" width={40} height={40} alt="Logo solana" />
                </Link>
            </div>

            <header className="w-[45vw] text-black font-semibold p-2 flex items-center justify-between gap-6 rounded-full bg-gradient-to-r from-purple-500 to-emerald-400 bg-opacity-100 backdrop-blur-lg">
                <nav className="w-full">
                    <ul className="flex justify-between items-center">
                        <li>
                            <Link href="/">
                                <span className="text-white hover:text-purple-900">Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/mint/create-mint">
                                <span className="text-white hover:text-purple-900">Create Mint</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/mint/account-info">
                                <span className="text-white hover:text-purple-900">Account Info</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/mint">
                                <span className="text-white hover:text-purple-900">Mint Token</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>

            <div className="w-[15vw]">
                <WalletMultiButtonDynamic />
            </div>
        </section>
    );
}
