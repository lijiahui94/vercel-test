"use client";
import { useAppSelector } from "@/store/hooks";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import Countdown from "./Countdown";

const PrivatePlacement = () => {
  const pathname = usePathname();
  const { ProjectCardList } = useAppSelector((state) => state.launchpad);
  const TimeText = useMemo(
    () =>
      ProjectCardList.find((item) => pathname == item.url && item)?.timeText,
    [ProjectCardList, pathname]
  );
  const { cutlaunchpadItem } = useAppSelector((state) => state.launchpad);
  const time = useMemo(
    () =>
      cutlaunchpadItem.isStart
        ? cutlaunchpadItem.startTime
        : cutlaunchpadItem.endTime,
    [cutlaunchpadItem]
  );
  return (
    <>
      <div className="flex flex-col p-5 md:p-10 max-w-[1156px] bg-appbase text-white w-full">
        <div className="font-normal md:text-2xl text-base mb-9 flex justify-between gap-2">
          <div>TIME PARTICIPATION</div>
        </div>
        <div className="flex justify-between gap-2 font-normal text-xs md:text-base mb-4">
          <div className="">Duration</div>
          <div className="text-app text-right">{TimeText}</div>
        </div>
        <div className="flex justify-between gap-2 font-normal text-xs md:text-base p-2.5 border border-solid border-app">
          <div className="">
            {cutlaunchpadItem.isStart ? "Start" : "Till End"}
          </div>
          <Countdown targetTimestamp={time} />
        </div>
      </div>
    </>
  );
};

export default PrivatePlacement;
