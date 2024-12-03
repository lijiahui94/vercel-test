"use client";
import React, { useState } from "react";
import { useToggle } from "ahooks";
import StakeModal from "../Modal/StakeModal";
import { useAppSelector } from "@/store/hooks";
import { useEVMAddress } from "@/hooks/EVMWallet";

export default function StakeBut({ stakeItem }: any) {
  const { EVMAddress } = useAppSelector((state) => state.app);
  const { cutTabs } = useAppSelector((state) => state.stake);
  const { connect } = useEVMAddress();
  const [open, { toggle }] = useToggle(false);
  if (!EVMAddress) {
    return (
      <div
        className="flex justify-center items-center py-4 px-4 bg-app rounded-full font-medium cursor-pointer"
        onClick={connect}
      >
        Connect Wallet
      </div>
    );
  }
  if (cutTabs == "Ended") {
    return (
      <div className="flex justify-center items-center py-4 px-4 bg-app/50 rounded-full font-medium cursor-not-allowed">
        Ended
      </div>
    );
  }
  return (
    <>
      <div
        className="flex justify-center items-center py-4 px-4 bg-app rounded-full font-medium cursor-pointer"
        onClick={toggle}
      >
        Stake
      </div>
      <StakeModal stakeItem={stakeItem} open={open} onClose={toggle} />
    </>
  );
}
