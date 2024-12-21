"use client";
import closeIcon from "@/assets/icons/close-line.png";
import GWGWIcon from "@/assets/stake/card-icon.png";
import UPFIIcon from "@/assets/stake/icon-UPFI.png";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setstakeInfo } from "@/store/stake/stakeSlice";
import {
  getMyBalance,
  getTokenContract,
  getTokenStakeContract,
  verification,
} from "@/helper/wagmiTool";
import { stakeFn } from "@/hooks/Stake";
import toast, { Toaster } from "react-hot-toast";
interface StakeModalProps {
  stakeItem: any;
  open: boolean;
  onClose: () => void;
}
const StakeModal: React.FC<StakeModalProps> = ({
  stakeItem,
  open,
  onClose,
}) => {
  const disptch = useAppDispatch();
  const { stakeList } = useAppSelector((state) => state.stake);
  const { MyBalance, getMyTokenBalance } = getMyBalance(
    getTokenContract(stakeItem.type)
  );
  useEffect(() => {
    getMyTokenBalance();
  }, [open]);
  const [value, setValue] = useState("");
  const getProfitStr = (
    value: string,
    stakeTimeList: any,
    stakeTime: number
  ) => {
    let data = stakeTimeList.find(
      (o: { eventIndex: number }) => o.eventIndex == stakeTime
    );
    let ratio = parseFloat(data.ratio) / 100;
    let day = Number(data.day);
    return ((Number(value) * ratio * day) / 360)
      .toString()
      .match(/^-?\d+(?:\.\d{0,4})?/)![0];
  };
  const stakeProfitObj = useMemo(() => {
    let profitStr = "0";
    let text = "";
    let stakeTime = 0;
    if (stakeItem) {
      let Data = stakeList.find((item) => item.id == stakeItem!.id);
      stakeTime = Data!.stakeTime;
      profitStr = getProfitStr(value, Data?.stakeTimeList, stakeTime);
    }
    if (Number(value) > Number(MyBalance)) {
      text = "Insufficient balance";
    }
    return { profitStr, stakeTime, text };
  }, [value, stakeList]);
  const stakeOperate = async () => {
    try {
      let TokenContract = getTokenContract(stakeItem.type);
      let StakeContract = getTokenStakeContract(stakeItem.type);
      let timeId = stakeItem.stakeTime;
      await verification(TokenContract, StakeContract);
      await stakeFn(StakeContract, value, timeId);
      getMyTokenBalance();
      toast.success("Successful");
      setValue("");
      onClose();
    } catch (error) {
      toast.error("Failed");
      console.log("error", error);
    }
  };
  if (!open) {
    return null;
  }
  return (
    <>
      <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center z-[1000] bg-black bg-opacity-60">
        <div className="flex md:w-[600px] flex-col items-center justify-center rounded-xl bg-[#1A1A1D] p-5 md:p-9 mx-5">
          <img
            onClick={(e) => {
              e.stopPropagation();
              setValue("");
              onClose();
            }}
            className="ml-auto mr-3 md:mr-0 w-6 cursor-pointer"
            src={closeIcon.src}
            alt=""
          />
          <p className="mb-6 text-2xl md:text-3xl text-center text-white font-semibold">
            Stake {stakeItem?.type}
          </p>
          <div className="flex justify-between w-full">
            <div className="text-xl text-white">Duration (days)</div>
            <div className="flex justify-center items-center gap-1">
              <img
                className="w-8 h-8"
                src={stakeItem?.type == "GWGW" ? GWGWIcon.src : UPFIIcon.src}
                alt=""
              />
              <span className="text-xl text-white">Earn {stakeItem?.type}</span>
            </div>
          </div>
          <div className="flex gap-2 mt-2 mb-6 w-full">
            {stakeItem!.stakeTimeList.map((TimeItem: any) => (
              <div
                key={TimeItem.eventIndex}
                className={`flex flex-col justify-center items-center w-[120px] h-[60px] ${
                  TimeItem.eventIndex == stakeProfitObj.stakeTime
                    ? "text-white border-app"
                    : "text-white/40 border-app/40"
                } font-normal rounded-lg border cursor-pointer`}
                onClick={() => {
                  let temp = stakeList.map((item: any) =>
                    stakeItem!.id == item.id
                      ? { ...item, stakeTime: TimeItem.eventIndex }
                      : item
                  );
                  disptch(setstakeInfo({ stakeList: temp }));
                }}
              >
                <div>{TimeItem.ratio}</div>
                <div>{TimeItem.day} Day(s)</div>
              </div>
            ))}
          </div>
          <div className="flex justify-between gap-2 w-full">
            <div className="text-app md:text-xl mb-2">
              <span className="text-white mr-2.5 font-normal">
                Stake Amount
              </span>
            </div>
            <div className=" flex justify-end gap-2 flex-1 text-app md:text-xl mb-2">
              <span className="text-white mr-2.5 font-normal">Available: </span>
              <span className="font-bold">{MyBalance}</span>
            </div>
          </div>
          <div className="w-full flex py-2 md:py-4 px-5 border border-solid border-app rounded-2xl bg-appbase">
            <input
              type="number"
              placeholder={`Min. 100,000${stakeItem?.type}`}
              className="w-full pr-3 flex-1 bg-transparent text-xl font-bold text-app focus:border-none focus:outline-none border-r border-white border-opacity-5"
              value={value}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (inputValue.match(/^\d*(\.\d{0,2})?$/)) {
                  setValue(inputValue);
                }
              }}
            />
            <div
              className="cursor-pointer flex justify-center items-center rounded h-7 py-1 px-4 bg-app text-xl text-black font-medium"
              onClick={() => {}}
            >
              Max
            </div>
          </div>
          <div className="text-[#FA3232] font-normal text-xl mt-2 w-full"></div>
          <div className="my-6 text-white text-sm font-normal">
            Est. profit :{" "}
            <span className="text-app">
              {Number(stakeProfitObj.profitStr)} {stakeItem?.type}
            </span>
          </div>
          <div
            className={`cursor-pointer flex justify-center items-center rounded-full py-2 md:py-4 px-14 md:text-xl text-black font-medium ${
              Number(value) >= 100000
                ? "bg-app cursor-pointer"
                : "bg-app/50 cursor-no-drop"
            }`}
            onClick={() => {
              Number(value) >= 100000 && stakeOperate();
            }}
          >
            Stake
          </div>

          <div
            className="text-app font-normal text-sm mt-3 cursor-pointer underline decoration-1"
            onClick={() => {
              let buyGWGWlink =
                "https://pancakeswap.finance/swap?chain=bsc&outputCurrency=0x9baE1A6BD435CD0DEB62E7517Ea948B5eb6EB497&inputCurrency=0x55d398326f99059fF775485246999027B3197955";

              let buyUPFIlink =
                "https://pancakeswap.finance/swap?chain=bsc&outputCurrency=0x6866b964F12aD1006d4b00520Eb8aD61E7Cc208D";
              window.open(
                stakeItem?.type == "GWGW" ? buyGWGWlink : buyUPFIlink,
                "_blank"
              );
            }}
          >
            Buy {stakeItem?.type}
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default StakeModal;
