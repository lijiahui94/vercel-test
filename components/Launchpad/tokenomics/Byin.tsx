import ByinTOKENOMICS from "@/assets/launchpad/Byin-TOKENOMICS.png";
export default function TokenomicsByin() {
  return (
    <div className="text-white w-full flex flex-col" key="Byin">
      <div className="mt-7 mb-5 text-sm md:text-xl">TOKENOMICS</div>
      <img src={ByinTOKENOMICS.src} alt="" />
      <div className="my-5 text-xs md:text-sm">
        Total supply: 1,000,000,000,000
      </div>
      <div className="mb-5 text-xs md:text-sm">Allocation:</div>
      <div className="text-white/60 text-xs md:text-sm">
        - Community: 70%, TGE 5%, 6-month cliff, then linear vested over 12
        months
      </div>
      <div className="text-white/60 text-xs md:text-sm">
        - Liquidity: 15%, TGE 100%
      </div>
      <div className="text-white/60 text-xs md:text-sm">
        - IDO: 15%, TGE 100%
      </div>
      <div className="text-white/60 mt-5 text-xs md:text-sm">
        $BYIN Usage: BYIN is a fairly launched native token within BYIN
        ecosystem. It is the primary token for BYIN meme launchpad designed to
        boost user activities, and can be used in various ways, such as
        transaction fee payment and reduction, meme launch fee payment,
        advertising fee payment, etc.
      </div>
      <div className="text-white/60 text-xs md:text-sm">
        $BYIN Buyback: The platform revenue will be used to constantly buyback
        $BYIN.
      </div>
    </div>
  );
}
