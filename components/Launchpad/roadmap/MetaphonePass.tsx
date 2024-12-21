import MetaphonePassROADMAP from "@/assets/launchpad/MetaphonePass-ROADMAP.png";
export default function RoadmapMetaphonePass() {
  return (
    <div className="text-white w-full" key="MetaphonePass">
      <div className="mt-7 mb-5 text-sm md:text-xl">ROADMAP</div>
      <div className="text-white/60 text-xs md:text-sm">
        · Prototype Inception, Website Launch, MetaPhone Design
      </div>
      <div className="text-white/60 text-xs md:text-sm">
        · TON Wallet Integration, MetaPhone Public Sale,NFT Redeem &
        Staking,$PHONE Airdrops & Listing'
      </div>
      <div className="text-white/60 text-xs md:text-sm">
        · MetaPhone Production, $PHONE empowerment, Ecosystem Integration and
        airdrops
      </div>
      <div className="text-white/60 mb-5 text-xs md:text-sm">
        · MetaPhone Delivery, Ecosystem Expansion, Decentralized marketing
        network launch
      </div>
      <img src={MetaphonePassROADMAP.src} alt="" />
    </div>
  );
}
