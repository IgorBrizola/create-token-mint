import { BalanceDisplay } from "@/app/components/BalanceDisplay";
import CreateTokenAccount from "@/app/components/createTokenAccount";
import TypingAnimation from "@/components/ui/typing-animation";

export default function Page() {
    return (
        <section className="flex flex-col items-center justify-center w-full absolute top-0 bottom-0" >
            <BalanceDisplay />
            <CreateTokenAccount />
            <div className="flex w-full items-center justify-center absolute bottom-10">
                <TypingAnimation
                    className="text-5xl bg-gradient-to-r from-purple-400 to-sky-300 bg-clip-text text-transparent uppercase font-light"
                    text="Account Info"
                />
            </div>
        </section>
       
    )
}
