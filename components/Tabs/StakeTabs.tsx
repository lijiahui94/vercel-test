"use client";
import { useAppDispatch } from "@/store/hooks";
import { cutTabsType, setstakeInfo } from "@/store/stake/stakeSlice";
import { useToggle } from "ahooks";
import { ReactNode, useMemo, useState } from "react";
import RedeemModal from "../Modal/RedeemModal";

export default function StakeTabs({ children }: { children?: ReactNode }) {
  const disptch = useAppDispatch();
  const [cutTab, setCutTab] = useState(0);
  const tabsList = [
    { label: "Live", id: 0 },
    { label: "Ended", id: 1 },
  ];
  const [open, { toggle }] = useToggle(false);
  const childrenBox = useMemo(() => {
    const isMultipleChildren = Array.isArray(children);
    if (isMultipleChildren) {
      return <>{children.map((child, index) => cutTab == index && child)}</>;
    } else {
      return children;
    }
  }, [children, cutTab]);
  return (
    <>
      <div className="flex justify-between w-full gap-2 flex-wrap">
        <div className="flex w-min rounded border border-solid border-app overflow-hidden">
          {tabsList.map((tabItem) => (
            <div
              key={tabItem.id}
              className={`${
                cutTab == tabItem.id
                  ? "bg-app text-appbase"
                  : "bg-appbase text-app"
              } w-20 flex justify-center items-center p-2 h-max cursor-pointer font-normal first:rounded-s last:rounded-r`}
              onClick={() => {
                setCutTab(tabItem.id);
                disptch(
                  setstakeInfo({ cutTabs: tabItem.label as cutTabsType })
                );
              }}
            >
              {tabItem.label}
            </div>
          ))}
        </div>
        <div
          className="flex justify-center items-center bg-app px-6 py-2 rounded cursor-pointer"
          onClick={toggle}
        >
          My Stake
        </div>
        <RedeemModal open={open} onClose={toggle} />
      </div>
      {childrenBox}
    </>
  );
}
