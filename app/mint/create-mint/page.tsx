
import TypingAnimation from "@/components/ui/typing-animation";
import CreateMint from "@/app/components/createMint";
import { BalanceDisplay } from "@/app/components/BalanceDisplay";

export default function Page() {
   
  return (
        <section className="flex flex-col items-center justify-center w-full absolute top-0 bottom-0" >
            <BalanceDisplay />
            <CreateMint/>
              <div className="flex w-full items-center justify-center ">
                    <TypingAnimation
                          className="text-5xl bg-gradient-to-r from-purple-400 to-sky-300 bg-clip-text text-transparent absolute bottom-10 uppercase font-light"
                          text="Create Mint"
                    />
              </div>
        </section>
)
  
}
