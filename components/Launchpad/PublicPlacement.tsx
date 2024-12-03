"use client";
import DownArrowIcon from "@/assets/launchpad/icon-down-arrow.png";
import BuyBut from "./BuyBut";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setLaunchpadInfo } from "@/store/launchpad/launchpadSlice";
import { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { getLaunchOptionList } from "@/hooks/Launchpad";
import { formatNumberWithCommas } from "@/helper/wagmiTool";
import Misaddress from "./parts/Misaddress";
import ProgressPrompt from "./parts/ProgressPrompt";

const PublicPlacement = () => {
  useEffect(() => {
    getLaunchOptionList();
  }, []);
  const pathname = usePathname();
  if (pathname == "/launchpad/Upton") return <Live />;
  return (
    <>
      <Ended />
    </>
  );
};
const Ended = () => {
  const disptch = useAppDispatch();
  const { TonAddresses, ProjectCardList } = useAppSelector(
    (state) => state.launchpad
  );
  const pathname = usePathname();
  const {
    Ticker,
    Price,
    FundingDemand,
    PerTicket,
    LaunchAmount,
    PerTicketValue,
    TotalTickets,
    RemainingTickets,
    Progress,
    TotalProgress,
  } = useMemo(
    () =>
      ProjectCardList.find((item) => pathname == item.url && item)
        ?.PublicPlacementData!,
    [ProjectCardList, pathname]
  );
  return (
    <div className="flex flex-col p-5 md:p-10 mt-2.5 max-w-[1156px] bg-appbase text-white w-full">
      <div className="flex flex-wrap gap-4 pb-4 justify-center md:justify-between whitespace-nowrap border-b border-solid border-gray-100 border-opacity-10">
        <div className="max-w-[360px] flex-1 flex flex-col gap-4">
          <div className="flex gap-4 justify-between font-normal text-xs md:text-base">
            <div className="">Ticker</div>
            <div className="text-app">${Ticker}</div>
          </div>
          <div className="flex gap-4 justify-between font-normal text-xs md:text-base">
            <div className="">Price</div>
            <div className="flex gap-2 flex-wrap justify-end">
              <span className="text-app">{Price.split("<br/>")[0]}</span>
              <span className="text-white/50">{Price.split("<br/>")[1]}</span>
            </div>
          </div>
          <div className="flex gap-4 justify-between font-normal text-xs md:text-base">
            <div className="">
              {Ticker == "MetaPhone PASS" ? "Market Value" : "Funding Demand"}
            </div>
            <div className="text-app">$ {FundingDemand}</div>
          </div>
          <div className="flex gap-4 justify-between font-normal text-xs md:text-base">
            <div className="">Per Ticket</div>
            <div className="text-app">{PerTicket}</div>
          </div>
        </div>
        <div className="max-w-[360px] flex-1 flex flex-col gap-4">
          <div className="flex gap-4 justify-between font-normal text-xs md:text-base">
            <div className="">Launch Amount</div>
            <div className="text-app">{LaunchAmount}</div>
          </div>
          <div className="flex gap-4 justify-between font-normal text-xs md:text-base">
            <div className="">
              {Ticker == "MetaPhone PASS" ? "Value" : "Per Ticket Value"}
            </div>
            <div className="flex gap-2">
              <span className="text-app">
                {PerTicketValue.split("<br/>")[0]}
              </span>
              <span className="text-white/50">
                {PerTicketValue.split("<br/>")[1]}
              </span>
            </div>
          </div>
          <div className="flex gap-4 justify-between font-normal text-xs md:text-base">
            <div className="">Total Tickets</div>
            <div className="text-app">{TotalTickets}</div>
          </div>
          <div className="flex gap-4 justify-between font-normal text-xs md:text-base">
            <div className="">Remaining Tickets</div>
            <div className="text-app">{RemainingTickets}</div>
          </div>
        </div>
      </div>
      <div className="bg-[#101011] flex mt-10 py-6 px-5">
        <input
          type="text"
          placeholder="Receiving address"
          className="w-full pr-3 flex-1 bg-transparent text-xl font-bold text-app focus:border-none focus:outline-none"
          value={TonAddresses}
          onChange={(e) => {
            disptch(setLaunchpadInfo({ TonAddresses: e.target.value }));
          }}
        />
        <div className="flex gap-1 justify-center items-center text-2xl">
          <span>Ton</span>
          <img className="w-6 h-6" src={DownArrowIcon.src} alt="" />
        </div>
      </div>
      <Misaddress />
      <div className="flex gap-4 mt-10 text-xs md:text-base">
        <div className="">PROGRESS</div>
        <ProgressPrompt Progress={Progress} />
        <div className="">{Progress}</div>
      </div>
      <div className="text-xs text-center mt-2 mb-10">{TotalProgress}</div>
      <BuyBut />
    </div>
  );
};
const Live = () => {
  const disptch = useAppDispatch();
  const pathname = usePathname();
  const { TonAddresses, cutlaunchpadItem, ProjectCardList } = useAppSelector(
    (state) => state.launchpad
  );
  const {
    Ticker,
    Price,
    FundingDemand,
    PerTicket,
    LaunchAmount,
    PerTicketValue,
    TotalTickets,
    RemainingTickets,
    Progress,
    TotalProgress,
  } = useMemo(
    () =>
      ProjectCardList.find((item) => pathname == item.url && item)
        ?.PublicPlacementData!,
    [ProjectCardList, pathname]
  );
  return (
    <div className="flex flex-col p-5 md:p-10 mt-2.5 max-w-[1156px] bg-appbase text-white w-full">
      <div className="flex flex-wrap gap-4 pb-4 justify-center md:justify-between whitespace-nowrap border-b border-solid border-gray-100 border-opacity-10">
        <div className="max-w-[360px] flex-1 flex flex-col gap-4">
          <div className="flex gap-4 justify-between font-normal text-xs md:text-sm">
            <div className="">Ticker</div>
            <div className="text-app">${Ticker}</div>
          </div>
          <div className="flex gap-4 justify-between font-normal text-xs md:text-sm">
            <div className="">Price</div>
            <div className="flex gap-2 flex-wrap justify-end">
              <span className="text-app">{Price.split("<br/>")[0]}</span>
              <span className="text-white/50">{Price.split("<br/>")[1]}</span>
            </div>
          </div>
          <div className="flex gap-4 justify-between font-normal text-xs md:text-base">
            <div className="">
              {Ticker == "MetaPhone PASS" ? "Market Value" : "Funding Demand"}
            </div>
            <div className="text-app">$ {FundingDemand}</div>
          </div>
          <div className="flex gap-4 justify-between font-normal text-xs md:text-sm">
            <div className="">Per Ticket</div>
            <div className="text-app flex flex-wrap gap-1 justify-end">
              {/* <span>
                {formatNumberWithCommas(Number(cutlaunchpadItem.price)) || "0"}
              </span>
              <span>$GWGW</span>
              <span>=</span> */}
              <span>
                ${" "}
                {formatNumberWithCommas(Number(cutlaunchpadItem.usdtPrice)) ||
                  "0"}
              </span>
              <span>USDT</span>
            </div>
          </div>
        </div>
        <div className="max-w-[360px] flex-1 flex flex-col gap-4">
          <div className="flex gap-4 justify-between font-normal text-xs md:text-sm">
            <div className="">Launch Amount</div>
            <div className="text-app">{LaunchAmount}</div>
          </div>
          <div className="flex gap-4 justify-between font-normal text-xs md:text-sm">
            <div className="">
              {Ticker == "MetaPhone PASS" ? "Value" : "Per Ticket Value"}
            </div>
            <div className="flex gap-2">
              <span className="text-app">
                {PerTicketValue.split("<br/>")[0]}
              </span>
              <span className="text-white/50">
                {PerTicketValue.split("<br/>")[1]}
              </span>
            </div>
          </div>
          <div className="flex gap-4 justify-between font-normal text-xs md:text-sm">
            <div className="">Total Tickets</div>
            <div className="text-app">
              {cutlaunchpadItem.maxTotalStake || "0"}
            </div>
          </div>
          <div className="flex gap-4 justify-between font-normal text-xs md:text-sm">
            <div className="">Remaining Tickets</div>
            <div className="text-app">
              {cutlaunchpadItem.maxTotalStake - cutlaunchpadItem.staked || "0"}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#101011] flex mt-10 py-6 px-5">
        <input
          type="text"
          placeholder="Receiving address"
          className="w-full pr-3 flex-1 bg-transparent text-xl font-bold text-app focus:border-none focus:outline-none"
          value={TonAddresses}
          onChange={(e) => {
            disptch(setLaunchpadInfo({ TonAddresses: e.target.value }));
          }}
        />
        <div className="flex gap-1 justify-center items-center text-2xl">
          <span>Ton</span>
          <img className="w-6 h-6" src={DownArrowIcon.src} alt="" />
        </div>
      </div>
      <Misaddress />
      <div className="flex justify-between gap-4 mt-10 text-xs md:text-base">
        <div className="">PROGRESS</div>
        <div className="flex-1 bg-app/50 rounded-full overflow-hidden relative">
          <div
            style={{
              width: `${
                (cutlaunchpadItem.staked * 3333333333) / 13333333333.33
              }%`,
            }}
            className="absolute top-0 left-0 h-full bg-app rounded-full"
          ></div>
        </div>
        <div className=" max-w-16 text-end">
          {Number(
            ((cutlaunchpadItem.staked * 3333333333) / 13333333333.33).toFixed(2)
          )}
          %
        </div>
      </div>
      <div className="text-xs text-center mt-2 mb-10">
        {formatNumberWithCommas(cutlaunchpadItem.staked * 33333333.33)}
        /700000 $AIUP
      </div>
      <BuyBut />
    </div>
  );
};

export default PublicPlacement;
