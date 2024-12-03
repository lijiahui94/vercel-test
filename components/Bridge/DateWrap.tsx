"use client";
import { getFee, reFeeMetadataType } from "@/api/recommended";
import { getPairDetail, wORDIInfoData } from "@/api/v1_pair_detail";
import { getPairInfo, pairData } from "@/api/v1_pair_info.ts";
import { useEffect, useState } from "react";
import Card1 from "./Card1";
import Card2 from "./Card2";
import Deposit from "./Deposit";
const config: any = {
  wordi: {
    swap: "https://pancakeswap.finance/swap?chain=bsc&outputCurrency=0xF445eeF6EEFDC7925EEB7599311599E762029726",
    add: "https://pancakeswap.finance/add/BNB/0xF445eeF6EEFDC7925EEB7599311599E762029726",
  },
  beng: {
    swap: "https://pancakeswap.finance/swap?outputCurrency=0xbe8868d6D8bF0021Af801F931BCf9105add6FBed",
    add: "https://pancakeswap.finance/add/BNB/0xbe8868d6D8bF0021Af801F931BCf9105add6FBed",
  },
  wbeng: {
    swap: "https://pancakeswap.finance/swap?outputCurrency=0xbe8868d6D8bF0021Af801F931BCf9105add6FBed",
    add: "https://pancakeswap.finance/add/BNB/0xbe8868d6D8bF0021Af801F931BCf9105add6FBed",
  },
  wupfi: {
    swap: "https://pancakeswap.finance/swap?outputCurrency=0x6866b964f12ad1006d4b00520eb8ad61e7cc208d",
    add: "https://pancakeswap.finance/add/BNB/0x6866b964f12ad1006d4b00520eb8ad61e7cc208d",
  },
  upfi: {
    swap: "https://pancakeswap.finance/swap?outputCurrency=0x6866b964f12ad1006d4b00520eb8ad61e7cc208d",
    add: "https://pancakeswap.finance/add/BNB/0x6866b964f12ad1006d4b00520eb8ad61e7cc208d",
  },
  wgwgw: {
    swap: "https://pancakeswap.finance/swap?chain=bsc&outputCurrency=0x9baE1A6BD435CD0DEB62E7517Ea948B5eb6EB497",
    add: "https://pancakeswap.finance/add/BNB/0x9baE1A6BD435CD0DEB62E7517Ea948B5eb6EB497",
  },
  gwgw: {
    swap: "https://pancakeswap.finance/swap?chain=bsc&outputCurrency=0x9baE1A6BD435CD0DEB62E7517Ea948B5eb6EB497",
    add: "https://pancakeswap.finance/add/BNB/0x9baE1A6BD435CD0DEB62E7517Ea948B5eb6EB497",
  },
  drag: {
    swap: "https://pancakeswap.finance/swap?chain=bsc&outputCurrency=0xe0e74dEbdFe1E7e83AE1ecD3a9042AFECb4227Fe",
    add: "https://pancakeswap.finance/add/BNB/0xe0e74dEbdFe1E7e83AE1ecD3a9042AFECb4227Fe",
  },
  wdrag: {
    swap: "https://pancakeswap.finance/swap?chain=bsc&outputCurrency=0xe0e74dEbdFe1E7e83AE1ecD3a9042AFECb4227Fe",
    add: " https://pancakeswap.finance/add/BNB/0xe0e74dEbdFe1E7e83AE1ecD3a9042AFECb4227Fe",
  },
};
const wORDIInfoMetadata = {
  btc_token: { tick: "" },
  apy: "",
  btc_token_amount: "0",
  has_whitelist: 0,
  wtoken: {
    name: "",
    show_name: "",
    contract_address: "",
    chain: "",
  },
  wtoken_amount: "0",
};
const pairwORDIInfoMetadata = {
  btc_token: { tick: "" },
  has_whitelist: 0,
  wtoken: {
    name: "",
    show_name: "",
    contract_address: "",
    chain: "",
  },
};
const reFeeMetadata = {
  economyFee: 0,
  fastestFee: 0,
  halfHourFee: 0,
  hourFee: 0,
  minimumFee: 0,
};
export default function DateWrap({ page }: { page: string }) {
  const [wORDIInfo, setwORDIInfo] = useState<wORDIInfoData>(wORDIInfoMetadata);
  const [pair, setpair] = useState<pairData>(pairwORDIInfoMetadata);
  const [reFee, setreFee] = useState<reFeeMetadataType>(reFeeMetadata);
  useEffect(() => {
    try {
      getPairDetail(page).then((wORDIInfo) => setwORDIInfo(wORDIInfo));
      getPairInfo(page).then((pair) => setpair(pair));
      getFee().then((reFee) => setreFee(reFee));
    } catch (error) {}
  }, []);
  return (
    <>
      <div className="flex flex-col gap-5 md:gap-10 lg:flex-row lg:gap-6">
        <Card1
          data={{
            name: pair.wtoken.name,
            show_name: pair.wtoken.show_name,
            chain: pair.wtoken.chain,
            contract_address: pair.wtoken.contract_address,
            apy: wORDIInfo.apy,
            Trade_href: config[pair.wtoken.name.toLocaleLowerCase()]?.swap,
            Add_Liquidity_href:
              config[pair.wtoken.name.toLocaleLowerCase()]?.add,
          }}
        />
        <Card2
          data={{
            name: wORDIInfo.wtoken.name,
            btc_token_amount: wORDIInfo?.btc_token_amount,
            tick: wORDIInfo.btc_token.tick,
            chain: wORDIInfo.wtoken.chain,
            wtoken_amount: wORDIInfo.wtoken_amount,
            contract_address: wORDIInfo.wtoken.contract_address,
          }}
        />
      </div>
      <div className="mt-7 md:mt-[72px] 2xl:mt-10">
        <div className="flex items-center justify-center">
          <div className="m-auto mb-5 flex justify-center gap-2 rounded-full bg-[#1A1A1D] p-2 ">
            <div className="flex h-[52px] items-center justify-center rounded-full bg-app px-5 text-center md:text-xl font-normal text-black ">
              Mint {wORDIInfo.wtoken.show_name}
            </div>
            <div className="h-[52px] rounded-full px-5 text-center md:text-xl font-normal text-white/50 flex flex-col items-center justify-center">
              Redeem {wORDIInfo.btc_token.tick}
              <p className="text-xs	md:text-sm text-white/30">Coming Soon</p>
            </div>
          </div>
        </div>
        <Deposit tick={wORDIInfo.btc_token.tick} />
      </div>
    </>
  );
}
