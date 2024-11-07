"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from 'next/dynamic';


export default function Header() {
    
    const WalletMultiButtonDynamic = dynamic(
        () => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton),
        { ssr: false }
    );

    return (
        <section className="w-full flex items-center justify-between px-4 py-4 z-50 relative">
         
            <div className="w-[15vw]">
                <Link href={'/'}><Image src={'/solana-sol-logo.png'} width={50} height={50} alt="Logo solana" /></Link>
            </div>

            <header className="w-[45vw] text-black font-semibold p-2 flex items-center justify-between gap-6 rounded-full bg-gradient-to-r from-purple-500 to-emerald-400 bg-opacity-100 backdrop-blur-lg">
                <div className="w-full absolute bg-no-repeat bg-cover bg-red-400"></div>
                <nav className="w-full">
                    <ul className="flex justify-between items-center">
                        <li>
                            <Link href={'/'}><span className="text-white hover:text-purple-900">Home</span></Link>
                        </li>
                        <li>
                            <Link href={'/mint/create-mint'}><span className="text-white hover:text-purple-900"> Create Mint</span></Link>
                        </li>
                        <li>
                            <Link href={'/mint/account-info'}><span className="text-white hover:text-purple-900">Account Info</span></Link>
                        </li>
                        <li>
                            <Link href={'/mint'}><span className="text-white hover:text-purple-900">Mint Token</span></Link>
                        </li>
                    </ul>
                </nav>
            </header>

            <div className="w-[15vw]">
                <WalletMultiButtonDynamic />
            </div>
        </section>
    )
}
