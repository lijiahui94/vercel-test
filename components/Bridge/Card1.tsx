import Link from "next/link";
import Contract from "./Contract";
interface Card1Date {
  name: string;
  show_name: string;
  chain: string;
  contract_address: string;
  apy: string;
  Trade_href: string;
  Add_Liquidity_href: string;
}
export default function Card1({ data }: { data: Card1Date }) {
  const {
    name,
    show_name,
    chain,
    contract_address,
    apy,
    Trade_href,
    Add_Liquidity_href,
  } = data;
  return (
    <div className="basis-1/2 bg-[#1A1A1D] px-5 md:px-10 py-10 [box-shadow:0px_24px_65px_rgba(0_0,0,0.64)] font-medium">
      <div className="flex items-center gap-4">
        <p className="text-lg md:text-2xl text-white">{name}</p>
        <p className="text-lg md:text-2xl text-white">{show_name}</p>
      </div>
      <div className="mt-9 grid grid-cols-1 gap-5">
        <div className="flex items-center gap-5">
          <p className="text-base text-white">Chain</p>
          <p className="text-base text-white">{chain}</p>
        </div>

        <div className="flex items-center gap-5">
          <p className="text-base text-white">BEP20</p>
          <Contract contract={contract_address} />
        </div>
        <div className="flex items-center gap-5">
          <p className="text-base text-white">Pool APY</p>
          <p className="text-base text-white">{apy}</p>
        </div>
        <div className="mt-9 flex gap-5">
          <Link
            className="w-[180px] rounded-full bg-app py-2.5 md:py-4 text-center text-sm font-normal text-black"
            href={Trade_href}
            target="_blank"
          >
            Trade beng
          </Link>
          <Link
            className="w-[180px] rounded-full border-2 border-white py-2.5 md:py-4 text-center text-sm text-white"
            href={Add_Liquidity_href}
            target="_blank"
          >
            Add Liquidity
          </Link>
        </div>
      </div>
    </div>
  );
}
