"use client";
import { useAppSelector } from "@/store/hooks";
import { useClickAway } from "ahooks";
import { useMemo, useRef, useState } from "react";
import disconnectIcon from "@/assets/icons/disconnect.png";
import { useEVMAddress } from "@/hooks/EVMWallet";

export default function EVMAddressBut() {
  const { disconnect } = useEVMAddress();
  const { EVMAddress } = useAppSelector((state) => state.app);
  const EVMName = useMemo(() => {
    return `${EVMAddress.slice(0, 6)}...${EVMAddress.slice(-4)}`;
  }, [EVMAddress]);
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
      {EVMName}
      {showDisconnet && (
        <div
          className="absolute left-0 top-[50px] flex h-[46px] w-[170px] items-center justify-center gap-2 rounded-full bg-[#1A1A1D]"
          onClick={() => disconnect()}
        >
          <img src={disconnectIcon.src} className="h-[14px] w-[14px]" alt="" />
          <div className="text-sm font-normal text-[#FF0000]">Disconnect</div>
        </div>
      )}
    </div>
  );
}
