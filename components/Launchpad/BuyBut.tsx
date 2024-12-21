"use client";
import { useEVMAddress } from "@/hooks/EVMWallet";
import { useAppSelector } from "@/store/hooks";
import { launchpadItemType } from "@/store/launchpad/launchpadSlice";
import { useToggle } from "ahooks";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import BuyModal from "../Modal/BuyModal";

const BuyBut = () => {
  const pathname = usePathname();
  const { EVMAddress } = useAppSelector((state) => state.app);
  const { TonAddresses, cutlaunchpadItem, ProjectCardList } = useAppSelector(
    (state) => state.launchpad
  );
  const tokenName = useMemo(
    () => ProjectCardList.find((item) => item.url == pathname)!.tokenName,
    [pathname]
  );
  const { connect } = useEVMAddress();
  const [open, { toggle }] = useToggle(false);
  const isTonAddresses = useMemo(
    () => /^UQ.{46}$/.test(TonAddresses),
    [TonAddresses]
  );
  const currentTime = Math.floor(Date.now() / 1000); // 当前时间戳

  if (!EVMAddress) {
    return (
      <div
        className="cursor-pointer flex justify-center items-center rounded-full bg-app py-2 md:py-7 w-3/4 m-auto text-sm md:text-xl text-black"
        onClick={connect}
      >
        Connect Wallet
      </div>
    );
  }
  if (
    cutlaunchpadItem.endTime + cutlaunchpadItem.duration <= currentTime ||
    cutlaunchpadItem.staked == cutlaunchpadItem.maxTotalStake
  ) {
    return (
      <div className="cursor-no-drop flex justify-center items-center rounded-full bg-app/50 py-2 md:py-7 w-3/4 m-auto text-sm md:text-xl text-black">
        Ended
      </div>
    );
  }
  if (!isTonAddresses || cutlaunchpadItem.startTime >= currentTime) {
    return (
      <div className="cursor-no-drop flex justify-center items-center rounded-full bg-app/50 py-2 md:py-7 w-3/4 m-auto text-sm md:text-xl text-black">
        Buy {tokenName}
      </div>
    );
  }
  return (
    <>
      <div
        className="cursor-pointer flex justify-center items-center rounded-full bg-app md:py-7 w-3/4 m-auto text-sm md:text-xl text-black"
        onClick={toggle}
      >
        Buy {tokenName}
      </div>
      <BuyModal open={open} onClose={toggle} />
    </>
  );
};

export default BuyBut;
