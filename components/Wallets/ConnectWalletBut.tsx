"use client";
import { useBTCWallet } from "@/hooks/BTCWallet";
import { useAppSelector } from "@/store/hooks";
import { useClickAway, useToggle } from "ahooks";
import { useEffect, useMemo, useRef, useState } from "react";
import ConnectWalletModal from "../Modal/ConnectWallet";
import disconnectIcon from "@/assets/icons/disconnect.png";
import { usePathname } from "next/navigation";
import { useEVMAddress } from "@/hooks/EVMWallet";
import BTCAddressBut from "./BTCAddressBut";
import EVMAddressBut from "./EVMAddressBut";
export default function ConnectWalletBut() {
  // const [open, { toggle, set }] = useToggle(false);
  const { connect: BTCConnect } = useBTCWallet();
  const { connect: EVMConnect } = useEVMAddress();
  const { BTCAddress, EVMAddress } = useAppSelector((state) => state.app);

  // const pathname = usePathname();
  // const paths = pathname.split("/").filter(Boolean)[0];
  // let EVMList = ["launchpad", "stake"];
  // const isEVM = useMemo(() => EVMList.indexOf(paths) !== -1, [pathname]);

  // useMemo(() => {
  //   !BTCAddress && set(false);
  // }, [BTCAddress]);

  // useEffect(() => {
  //   let isBTCWallet = localStorage.getItem("BTCWallet");
  //   isBTCWallet && BTCConnect(isBTCWallet);
  // }, []);

  // if (BTCAddress && !isEVM) return <BTCAddressBut />;
  // if (EVMAddress && isEVM) return <EVMAddressBut />;
  if (EVMAddress) return <EVMAddressBut />;
  return (
    <>
      <div
        className="cursor-pointer flex justify-center items-center rounded-full bg-app py-2 px-3 md:p-4 text-sm text-black"
        onClick={() => {
          // isEVM && EVMConnect();
          // !isEVM && toggle();
          EVMConnect();
        }}
      >
        <span className="md:block hidden">Connect Wallet</span>
        <span className="block md:hidden">Connect</span>
      </div>
      {/* <ConnectWalletModal open={open} onClose={toggle} /> */}
    </>
  );
}
