import part1Bg from "@/assets/home/part1-bg.gif";
import suspend1 from "@/assets/home/suspend1.png";
import suspend2 from "@/assets/home/suspend2.png";
import suspend3 from "@/assets/home/suspend3.png";
import BinanceIcon from "@/assets/home/icon-Binance.png";
import TONIcon from "@/assets/home/icon-TON.png";
import Part1But from "./part1But";
export default function Part1() {
  return (
    <div className="">
      <div className="px-5 md:px-10 max-w-[1480px] m-auto">
        <div className="flex justify-center items-center relative">
          <img className="md:w-[800px] opacity-50" src={part1Bg.src} alt="" />
          <div className="absolute inset-0 break-words whitespace-normal flex flex-col justify-center items-center">
            <div className="z-10 p-10">
              <div className="font-bold text-[32px] md:text-[80px] text-white text-center pt-10 uppercase">
                Invest<span className="text-app">,</span>
                <br className="md:hidden" /> Incubate
                <span className="text-app">,</span>
                <br /> Launchpad
              </div>
              <div className="font-normal text-xs md:text-lg text-[#C5C5CA] text-center">
                <div>
                  The omnichain fair launchpad and cross-chain Infrastructure.
                </div>
                <div>
                  GoWrap provides financing, cross-chain asset management, and
                  incubation services for promising Web3 projects.
                </div>
              </div>
              <Part1But />
            </div>
          </div>
          <img
            className="absolute top-10 left-0 z-[2] w-11 h-11 md:w-max md:h-max bounce-animation"
            src={suspend1.src}
            alt=""
          />
          <img
            className="absolute bottom-0 left-2/3 z-[2] w-11 h-11 md:w-max md:h-max bounce-animation"
            src={suspend2.src}
            alt=""
          />
          <img
            className="absolute top-1/2 right-0 z-[2] w-11 h-11 md:w-max md:h-max bounce-animation"
            src={suspend3.src}
            alt=""
          />
        </div>
      </div>
      <div className="relative w-full h-[140px] md:h-[316px] flex justify-center items-center gap-10">
        <div className="absolute z-[0] w-full h-full bg-gradient-to-bl from-yellow-300 via-yellow-400 to-yellow-500 rounded-full opacity-15 blur-[60px]" />
        <img
          className="w-11 h-11 md:w-16 md:h-16"
          src={BinanceIcon.src}
          alt=""
        />
        <img className="w-11 h-11 md:w-16 md:h-16" src={TONIcon.src} alt="" />
      </div>
      <div className="relative max-w-[1480px] grid gap-6 lg:grid-cols-2 grid-cols-1 m-auto px-10 pb-[60px]">
        <div className="flex flex-col justify-center items-center gap-6 p-3 md:p-10 bg-appbase">
          <div className="text-app font-semibold text-xl md:text-[40px]">
            $ 536.1K
          </div>
          <div className="text-xs md:text-base text-white">RAISED CAPITAL</div>
        </div>
        <div className="flex flex-col justify-center items-center gap-6 p-3 md:p-10 bg-appbase">
          <div className="text-app font-semibold text-xl md:text-[40px]">
            3+
          </div>
          <div className="text-xs md:text-base text-white">
            LAUNCHED PROJECTS
          </div>
        </div>
      </div>
    </div>
  );
}
