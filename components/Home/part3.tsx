import part3 from "@/assets/home/part3.png";
import suspend4 from "@/assets/home/suspend4.png";
import suspend5 from "@/assets/home/suspend5.png";
import suspend6 from "@/assets/home/suspend6.png";
export default function Part3() {
  return (
    <div className="max-w-[1480px] m-auto px-10 pt-[144px]">
      <div className="grid lg:gap-6 gap-11 lg:grid-cols-2 grid-cols-1">
        <div className="flex flex-col justify-center max-w-[662px] mx-auto">
          <div className="text-[32px] md:text-[64px] font-semibold text-white uppercase">
            MORE CHAINS are supported <span className="text-app">.</span>
          </div>
          <div className="whitespace-pre-line text-sm md:text-base font-normal text-[#E3E3E7] my-6">
            GoWrap's Launchpad uniquely supports omnichain projects, including
            Bitcoin Layer2, Blast, TON, Zetachain, Arbitrum, and Solana. Users
            can utilize a variety of assets for fundraising.
          </div>
        </div>
        <div className="flex justify-center lg:justify-end items-center">
          <div className="relative p-6 md:p-14">
            <img className="w-80 md:w-[570px]" src={part3.src} alt="" />
            <img
              className="absolute left-0 bottom-0 bounce-animation w-16 h-16 md:w-32 md:h-32"
              src={suspend4.src}
              alt=""
            />
            <img
              className="absolute right-0 bottom-0 bounce-animation w-16 h-16 md:w-32 md:h-32"
              src={suspend5.src}
              alt=""
            />
            <img
              className="absolute top-0 right-0 bounce-animation w-16 h-16 md:w-32 md:h-32"
              src={suspend6.src}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="text-[32px] md:text-[64px] mt-20 md:mt-16 mb-6 md:mb-8 md:text-center font-semibold text-white uppercase">
        Selected & Customized <span className="text-app">.</span>
      </div>
      <div className="grid lg:gap-6 gap-11 lg:grid-cols-2 grid-cols-1">
        <div className="flex flex-col max-w-[662px] mx-auto">
          <div className="whitespace-pre-line text-[18px] md:text-[32px] font-semibold text-white mb-6 uppercase">
            Strictly screen projects <span className="text-app">.</span>
          </div>
          <div className="whitespace-pre-line text-sm md:text-base font-normal text-[#E3E3E7]">
            GoWrap's mission is to identify and nurture the most promising
            projects that bring exciting opportunities to the wider community.
            To that end, we carefully select the right projects and eliminate
            arbitrariness!
          </div>
        </div>
        <div className="flex flex-col max-w-[662px] mx-auto">
          <div className="whitespace-pre-line text-[18px] md:text-[32px] font-semibold text-white mb-6 uppercase">
            Tailored Launchpad Service <span className="text-app">.</span>
          </div>
          <div className="whitespace-pre-line text-sm md:text-base font-normal text-[#E3E3E7]">
            GoWrap offers Launchpad services for token issuers and users across
            various blockchains. We also provide customized services within our
            capabilities.
          </div>
        </div>
      </div>
    </div>
  );
}
