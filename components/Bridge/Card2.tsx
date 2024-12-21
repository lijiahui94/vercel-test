import iconBtc from "@/assets/icons/btc.png";
import iconBSC from "@/assets/icons/binance.png";
import arrowRightSm from "@/assets/icons/arrow-right-sm.png";
import Link from "next/link";
interface Card2Date {
  btc_token_amount: string;
  tick: string;
  chain: string;
  wtoken_amount: string;
  name: string;
  contract_address: string;
}
export default function Card2({ data }: { data: Card2Date }) {
  const {
    btc_token_amount,
    tick,
    chain,
    wtoken_amount,
    name,
    contract_address,
  } = data;
  return (
    <div className="basis-1/2 bg-[#1A1A1D] px-5 md:px-10 py-10 [box-shadow:0px_24px_65px_rgba(0_0,0,0.64)]">
      <p className="text-lg md:text-2xl text-white">Proof of assets</p>
      <div className="relative mt-5 flex flex-col md:flex-row py-[34px]">
        <div className="flex-1 pb-5 md:pb-0 md:pr-5">
          <div className="flex justify-between">
            <img className="w-10" src={iconBtc.src} alt="" />
            <p className="bg-[#434347] p-2 text-sm font-normal text-white flex justify-center items-center">
              BTC Chain
            </p>
          </div>
          <p className="mt-5 text-lg text-white">
            {btc_token_amount} {tick}
          </p>
          <div className="mt-5 flex items-center gap-1 text-sm text-white">
            Assets Details <img className="w-6" src={arrowRightSm.src} alt="" />{" "}
          </div>
        </div>
        <i className="absolute left-0 md:left-1/2 top-1/2 md:top-0 h-px md:h-full w-full md:w-px bg-[rgba(255,255,255,0.1)]"></i>
        <div className="flex-1 pt-5 md:pt-0 md:pl-5">
          <div className="flex justify-between">
            <img className="w-10" src={iconBSC.src} alt="" />
            <p className="bg-[#434347] p-2 text-sm font-normal text-white flex justify-center items-center min-w-16">
              {chain}
            </p>
          </div>
          <p className="mt-5 text-lg  text-white">
            {wtoken_amount} {name}
          </p>
          <Link
            className="mt-5 flex items-center gap-1 text-sm text-white"
            target="_blank"
            href={`https://bscscan.com/token/${contract_address}`}
          >
            BEP20 Token Contract{" "}
            <img className="w-6" src={arrowRightSm.src} alt="" />{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}
