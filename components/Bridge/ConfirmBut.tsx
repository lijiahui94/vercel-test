"use client";

import { useAppSelector } from "@/store/hooks";
import { useToggle } from "ahooks";
import { useMemo } from "react";
import ConnectWalletModal from "../Modal/ConnectWallet";

export default function ConfirmBut() {
  const [open, { toggle, set }] = useToggle(false);
  const { BTCAddress } = useAppSelector((state) => state.app);
  useMemo(() => {
    !BTCAddress && set(false);
  }, [BTCAddress]);
  if (BTCAddress) {
    return (
      <div className="mt-10 w-full rounded-full bg-[#27272C] py-2 md:py-8 md:text-xl font-normal text-[#FF0000] cursor-not-allowed">
        Send
      </div>
    );
  }
  return (
    <>
      <div
        className="mt-10 w-full rounded-full bg-app py-2 md:py-8 md:text-xl font-normal text-[#252525]"
        onClick={toggle}
      >
        Connect UniSat Wallet
      </div>
      <ConnectWalletModal open={open} onClose={toggle} />
    </>
  );
}
