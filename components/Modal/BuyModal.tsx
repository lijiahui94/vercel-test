"use client";
import React, { useEffect, useMemo, useState } from "react";
import closeIcon from "@/assets/icons/close-line.png";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import gwgwIcon from "@/assets/icons/gwgw-icon.png";
import usdtIcon from "@/assets/icons/usdt-icon.png";
import { useAccount } from "wagmi";
import {
  getFormatEther,
  getMyBalance,
  getTokenContract,
  getTokenStakeContract,
  toBigNumber,
  verification,
} from "@/helper/wagmiTool";
import classNames from "classnames";
import toast from "react-hot-toast";
import { buy, getLaunchOptionList } from "@/hooks/Launchpad";
interface BuyModalProps {
  open: boolean;
  onClose: () => void;
}
const BuyModal: React.FC<BuyModalProps> = ({ open, onClose }) => {
  const TokenList = [
    // { icon: gwgwIcon.src, name: "GWGW" },
    { icon: usdtIcon.src, name: "USDT" },
  ];
  const [payCurrency, setPayCurrency] = useState("USDT");
  const { MyBalance, getMyTokenBalance } = getMyBalance(
    getTokenContract(payCurrency)
  );
  useEffect(() => {
    getMyTokenBalance();
  }, [open, payCurrency]);

  const disptch = useAppDispatch();
  const { address } = useAccount();
  const { TonAddresses, cutlaunchpadItem } = useAppSelector(
    (state) => state.launchpad
  );

  const [value, setValue] = useState("");
  const [total, settotal] = useState(0);

  const price = useMemo(
    () =>
      Number(
        payCurrency === "GWGW"
          ? cutlaunchpadItem.price
          : cutlaunchpadItem.usdtPrice
      ),
    [payCurrency, cutlaunchpadItem]
  );
  const numVal = useMemo(() => Number(value), [value]);
  const surplus = useMemo(
    () => cutlaunchpadItem.maxTotalStake - cutlaunchpadItem.staked,
    [cutlaunchpadItem]
  );

  const MaxBuy = () => {
    let holdToken = Number(MyBalance);
    let max = Math.floor(holdToken / price);
    let buySun = localStorage.getItem(address!);
    let Most = 40 - Number(buySun);
    setValue(`${Math.min(max, Most)}`);
  };

  useEffect(() => {
    settotal(Number((numVal * price).toFixed(2)));
  }, [value, price, numVal]);

  const text = useMemo(() => {
    let holdToken = Number(MyBalance);
    let buySun = localStorage.getItem(address!);
    let Max = Number(buySun) + numVal;
    if (numVal > surplus) return "Insufficient Remaining Tickets"; // 剩余份额不足
    if (total > holdToken) return "Insufficient balance"; // 余额不足
    if (Max > 40) return "The purchase limit has been reached"; // 已达到购买限额
    return "";
  }, [value, cutlaunchpadItem, MyBalance, total, numVal, surplus]);
  const isBuy = useMemo(
    () => !Boolean(numVal > surplus || text || numVal == 0),
    [numVal, surplus, text]
  );
  const buyOperate = async () => {
    try {
      toast.dismiss();
      let buySun = localStorage.getItem(address!);
      let TokenContract = getTokenContract(payCurrency);
      let IDOContract = getTokenStakeContract("IDO");
      await verification(TokenContract, IDOContract);
      let priceBigInt = toBigNumber(`${price}`).toBigInt();
      let valueBigInt = BigInt(value || 0);
      let sun = Number(getFormatEther(priceBigInt * valueBigInt));
      await buy(
        `${sun}`,
        cutlaunchpadItem.eventIndex,
        TonAddresses,
        payCurrency === "GWGW"
      );
      getLaunchOptionList();
      localStorage.setItem(address!, `${Number(buySun) + Number(value)}`);
      toast.success("Successful");
      setValue("");
      onClose();
    } catch (error) {
      console.log("error", error);
      toast.error("Failed");
    }
    /* try {
      let buySun = localStorage.getItem(address!);
      let price = computer.isGwGW
        ? cutlaunchpadItem.price
        : cutlaunchpadItem.usdtPrice;
      await verification();
      let priceBigInt = toBigNumber(`${price}`).toBigInt();
      let valueBigInt = BigInt(value || 0);
      let sun = Number(getFormatEther(priceBigInt * valueBigInt));
      await buy(
        `${sun}`,
        cutlaunchpadItem.eventIndex,
        TonAddresses,
        computer.isGwGW
      );
      getLaunchOptionList();
      localStorage.setItem(address!, `${Number(buySun) + Number(value)}`);
      openMessage("success");
      setValue("");
      onClose();
    } catch (error) {
      console.log("error", error);
      openMessage("error");
    } */
  };
  if (!open) {
    return null;
  }
  return (
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
          Buy Upton
        </p>
        <div className="flex justify-between w-full">
          <div className="text-xl text-white">Payment method</div>
        </div>
        <div className="flex gap-2 mt-2 mb-6 w-full">
          {TokenList.map((item) => (
            <div
              key={item.name}
              className={`flex justify-center items-center gap-1 w-[120px] h-[60px] ${
                item.name == payCurrency
                  ? "text-white border-app"
                  : "text-white/40 border-app/40"
              } font-normal rounded-lg border cursor-pointer`}
              onClick={() => {
                setPayCurrency(item.name);
                setValue("");
              }}
            >
              <img className="w-6 h-6" src={item.icon} alt="" />
              <div>{item.name}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-between gap-2 w-full">
          <div className="text-app md:text-xl mb-2">
            <span className="text-white mr-2.5 font-normal">Stake Amount</span>
          </div>
          <div className=" flex justify-end gap-2 flex-1 text-app md:text-xl mb-2">
            <span className="text-white mr-2.5 font-normal">Available : </span>
            <span className="font-bold">{MyBalance}</span>
          </div>
        </div>
        <div className="w-full flex py-2 md:py-4 px-5 border border-solid border-app rounded-2xl bg-appbase">
          <input
            type="number"
            placeholder="Max. 40 Tickets"
            className="w-full pr-3 flex-1 bg-transparent text-xl font-bold text-app focus:border-none focus:outline-none"
            value={value}
            onChange={(e) => {
              const inputValue = e.target.value;
              const regex = /^[1-9]\d*$/; // 正则表达式用于匹配正整数
              if (inputValue === "" || regex.test(inputValue)) {
                setValue(inputValue);
              }
            }}
          />
          <div
            className="cursor-pointer flex justify-center items-center rounded h-7 py-1 px-4 bg-app text-xl text-black font-medium"
            onClick={MaxBuy}
          >
            Max
          </div>
        </div>
        <div className="text-[#FA3232] font-normal text-xl mt-2 w-full">
          {text}
        </div>
        <div className="my-6 text-white text-sm font-normal">
          {"YOU'LL PAY : "}
          <span className="text-app">
            {total} {payCurrency}
          </span>
        </div>
        <div
          className={classNames(
            "flex justify-center items-center rounded-full py-2 md:py-4 px-14 md:text-xl text-black font-medium",
            { "bg-app/50 cursor-no-drop": !isBuy },
            { "bg-app cursor-pointer": isBuy }
          )}
          onClick={() => {
            isBuy && buyOperate();
          }}
        >
          Buy
        </div>

        {/* <div
          className="text-app font-normal text-sm mt-3 cursor-pointer underline decoration-1"
          onClick={() => {
            window.open("", "_blank");
          }}
        >
          Buy Upton
        </div> */}
      </div>
    </div>
  );
};

export default BuyModal;
