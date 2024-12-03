"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import cardIcon from "@/assets/stake/card-icon.png";
import earnIcon from "@/assets/stake/earn-icon.png";
import { useMemo } from "react";
import StakeBut from "./StakeBut";
import { setstakeInfo } from "@/store/stake/stakeSlice";
export default function StakeCard() {
  const disptch = useAppDispatch();
  const { cutTabs, stakeList } = useAppSelector((state) => state.stake);
  let list = useMemo(
    () => stakeList.filter((item) => item.state == cutTabs),
    [cutTabs, stakeList]
  );
  return (
    <>
      {list.map((listItem) => (
        <div key={listItem.id} className="w-full bg-appbase">
          <div className="p-5">
            <div className="text-app text-2xl font-semibold">
              {listItem.title}
            </div>
            <div className="text-sm text-white font-normal">
              Stake ${listItem.type}
            </div>
          </div>
          <div className="px-5 pb-5 pt-1 border-y border-white border-opacity-10">
            <div className="text-base text-white mb-1 font-normal">Stake</div>
            <div className="flex justify-between mb-4">
              <div className="flex items-center gap-2">
                <img src={cardIcon.src} alt="" />
                <div className="text-app text-xl font-semibold">
                  $ {listItem.type}
                </div>
              </div>
            </div>
            <div className="text-base text-white mb-1 font-normal">APR</div>
            <div className="flex justify-between mb-4">
              <div className="flex items-center gap-2">
                <img src={earnIcon.src} alt="" />
                <div className="text-app text-xl font-semibold">
                  {
                    listItem.stakeTimeList.find(
                      (TimeItem) => listItem.stakeTime === TimeItem.eventIndex
                    )?.ratio
                  }
                </div>
              </div>
            </div>
            <div className="text-sm text-white mb-1 font-normal">
              Duration (days)
            </div>
            <div className="flex gap-2 mb-4">
              {listItem.stakeTimeList.map((TimeItem) => (
                <div
                  key={TimeItem.eventIndex}
                  className={`flex justify-center items-center w-16 h-10 ${
                    TimeItem.eventIndex == listItem.stakeTime
                      ? "text-white border-app"
                      : "text-white/40 border-app/40"
                  } font-normal rounded-lg border  cursor-pointer`}
                  onClick={() => {
                    let temp = stakeList.map((item: any) =>
                      listItem.id == item.id
                        ? { ...listItem, stakeTime: TimeItem.eventIndex }
                        : item
                    );
                    disptch(setstakeInfo({ stakeList: temp }));
                  }}
                >
                  {TimeItem.day}
                </div>
              ))}
            </div>
            <StakeBut stakeItem={listItem} />
          </div>
          <div className="text-white text-opacity-40 text-center text-xs leading-6 my-4 font-normal px-5">
            Income and principal need to be claimed after the end of the pledge
          </div>
        </div>
      ))}
    </>
  );
}
