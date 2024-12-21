"use client";
import { useBTCWallet } from "@/hooks/BTCWallet";
import { useAppSelector } from "@/store/hooks";
import { useClickAway } from "ahooks";
import { useMemo, useRef, useState } from "react";
import disconnectIcon from "@/assets/icons/disconnect.png";

export default function BTCAddressBut() {
  const { disConnect } = useBTCWallet();
  const { BTCAddress } = useAppSelector((state) => state.app);
  const BTCName = useMemo(() => {
    return `${BTCAddress.slice(0, 6)}...${BTCAddress.slice(-4)}`;
  }, [BTCAddress]);
  const [showDisconnet, setShowDisconnet] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickAway(() => {
    setShowDisconnet(false);
  }, ref);
  return (
    <div
      ref={ref}
      className="relative flex h-[36px] md:h-[46px] w-[170px] cursor-pointer items-center justify-center rounded-full bg-[#1A1A1D] text-sm text-white"
      onClick={() => {
        setShowDisconnet(!showDisconnet);
      }}
      onBlur={() => {
        setShowDisconnet(false);
      }}
    >
      {BTCName}
      {showDisconnet && (
        <div
          className="absolute left-0 top-[50px] flex h-[46px] w-[170px] items-center justify-center gap-2 rounded-full bg-[#1A1A1D]"
          onClick={disConnect}
        >
          <img src={disconnectIcon.src} className="h-[14px] w-[14px]" alt="" />
          <div className="text-sm font-normal text-[#FF0000]">Disconnect</div>
        </div>
      )}
    </div>
  );
}
