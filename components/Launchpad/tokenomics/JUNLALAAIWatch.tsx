import JUNLALAAIWatchTOKENOMICS from "@/assets/launchpad/JUNLALAAIWatch-TOKENOMICS.png";
export default function TokenomicsJUNLALAAIWatch() {
  return (
    <div className="text-white w-full flex flex-col" key="JUNLALAAIWatch">
      <div className="mt-7 mb-5 text-sm md:text-xl">TOKENOMICS</div>
      <img src={JUNLALAAIWatchTOKENOMICS.src} alt="" />
      <div className="my-5 text-sm md:text-base">
        The total supply of $LALA is 2 billion, with the distribution designed
        to incentivize the long-term sustainability of the ecosystem:
      </div>
      <div className="text-white text-xs md:text-sm">
        · 60% allocated for mining
      </div>
      <div className="text-white text-xs md:text-sm">· 10% for IDO</div>
      <div className="text-white text-xs md:text-sm">
        · 5% allocated to the team
      </div>
      <div className="text-white text-xs md:text-sm">· 15% for liquidity</div>
      <div className="text-white text-xs md:text-sm">· 10% for marketing</div>
    </div>
  );
}
