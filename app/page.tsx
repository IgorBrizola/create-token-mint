"use client";

import TypingAnimation from "@/components/ui/typing-animation";
import { BalanceDisplay } from "./components/BalanceDisplay";

export default function Home() {
  return (
    <main className="font-[family-name:var(--font-geist-sans)]">
      <BalanceDisplay />
      <div className="flex w-full items-center justify-center absolute bottom-0 top-0 ">
        <TypingAnimation
          className="text-5xl bg-gradient-to-r from-purple-400 to-sky-300 bg-clip-text text-transparent uppercase font-light"
          text="Generate Token Mint"
        />
    </div>
    </main>
  );
}
