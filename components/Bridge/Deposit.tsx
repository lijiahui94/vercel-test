"use client";
import iconBtc from "@/assets/icons/btc.png";
import iconQuiz from "@/assets/icons/Icon-quiz.png";
import iconQuizWhite from "@/assets/icons/Icon-quiz-white.png";
import downBgBule from "@/assets/icons/down-bg-bule.png";
import iconBSC from "@/assets/icons/binance.png";
import checkContainedFill from "@/assets/icons/check-contained-fill.png";
import iconArrow from "@/assets/icons/arrow-up-right.png";
import { useTokenBalance } from "@/api/v1_assert_token_balance";
import { useAppSelector } from "@/store/hooks";
import { useCallback, useState } from "react";
import ConfirmBut from "./ConfirmBut";
import { useToggle } from "ahooks";
import { isAddress } from "viem";
import Link from "next/link";
interface DepositDate {
  tick: string;
}
export default function Deposit({ tick }: DepositDate) {
  const { BTCAddress } = useAppSelector((state) => state.app);
  const { data } = useTokenBalance(BTCAddress, tick);
  const [toAddress, setToAddress] = useState("");
  const [addrSuccess, { set: setAddSuccess }] = useToggle(false);
  const [addrErr, { set: setAddErr }] = useToggle(false);
  const renderStatus = useCallback(() => {
    if (!BTCAddress) {
      return (
        <div className="mt-5 bg-black/40 px-4 py-6 text-start md:text-xl font-normal text-white">
          Connect your wallet first
        </div>
      );
    }
    if (!data?.balance) {
      return (
        <div className="mt-5 bg-black/40 px-4 py-6 text-start">
          <p className="mb-5 md:text-xl font-normal text-[#8C8C8E]">
            You don&apos;t have {tick} in your wallet yet.
          </p>
          <Link href="https://unisat.io/market" target="_blank">
            <div className="flex items-center justify-start gap-2">
              <div className="md:text-xl font-normal text-app">
                Buy {tick} on UniSat Marketplace{" "}
              </div>
              <img src={iconArrow.src} className="w-6" alt="" />
            </div>
          </Link>
        </div>
      );
    } else if (data?.transfer_balance_list.length === 0) {
      return (
        <div className="mt-5 bg-black/40 px-4 py-6 text-start">
          <p className="mb-5 md:text-xl font-normal text-[#8C8C8E]">
            You don&apos;t have transferable {tick}. To Send {tick}, you have to
            inscribe a TRANSFER inscription first.
          </p>
        </div>
      );
    }
    return null;
    // return (
    //   <BRC20Card
    //     transfer_balance_list={data?.transfer_balance_list || []}
    //     name={data?.token || ""}
    //     setInscriptionId={setInscriptionId}
    //     setAmount={setAmount}
    //   />
    // );
  }, [
    BTCAddress,
    data?.balance,
    data?.token,
    data?.transfer_balance_list,
    tick,
  ]);
  return (
    <div className="text-center">
      <div className="m-auto w-full max-w-[688px] bg-[#1A1A1D] px-5 md:px-10 py-10 [box-shadow:0px_24px_65px_rgba(0_0,0,0.64)]">
        <div className="mb-5 flex items-center text-lg md:text-2xl font-normal">
          <span className=" text-[#C5C5CA]">From</span>
          <img src={iconBtc.src} className="ml-4 mr-2 w-8" alt="" />
          <span className="text-white">BTC</span>
        </div>
        <p className="text-left md:text-xl font-normal text-white">
          Select an xsam1 TRANSFER inscription
        </p>
        <div className="mt-4 grid md:grid-cols-2 text-base font-normal text-white">
          <div className="flex items-center gap-2">
            <div className="text-[#8C8C8E] ">Transferable 0 xsam1</div>
            <div className="relative">
              <img
                src={iconQuiz.src}
                className="peer w-6 cursor-pointer"
                alt=""
              />
              <div className="absolute bottom-8 left-0 hidden w-[483px] rounded-sm bg-[rgba(0,0,0,0.75)] px-2 py-[6px] text-base font-normal text-white peer-hover:block">
                Your transferable amount ofxsaml. To send xsaml, you have
                inscribe axsam1TRANSFER inscription with the UniSat wallet.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 ">
            <div className="text-[#8C8C8E] ">Total 0 xsam1</div>
            <div className="relative">
              <img
                src={iconQuiz.src}
                className="peer w-6 cursor-pointer"
                alt=""
              />
              <div className="absolute bottom-8 left-0 hidden w-[218px] rounded-sm bg-[rgba(0,0,0,0.75)] px-2 py-[6px] text-base font-normal text-white peer-hover:block">
                Your total amount of xsam1.
              </div>
            </div>
          </div>
        </div>
        {renderStatus()}
        <img className="mx-auto mt-5 w-7 md:w-10" src={downBgBule.src} alt="" />
        <div className="mb-4 mt-5 flex items-center text-lg md:text-2xl font-normal">
          <span className=" text-[#C5C5CA]">To</span>
          <img src={iconBSC.src} className="ml-4 mr-2 w-8" alt="" />
          <span className="text-white">bsc_testnet</span>
        </div>
        <div className="flex gap-12 text-left text-white">
          <div className="flex items-center gap-2 py-4">
            <p className="text-lg md:text-2xl">Address</p>
            <div className="relative w-6">
              <img
                src={iconQuizWhite.src}
                className="peer w-6 cursor-pointer"
                alt=""
              />
              <div className="absolute bottom-8 left-0 hidden w-[440px] max-w-none rounded-sm bg-[rgba(0,0,0,0.75)] px-2 py-[6px] text-base font-normal text-white peer-hover:block">
                EVMaddress to receive beng on the bso testnet chain.
              </div>
            </div>
          </div>
          <div className="flex w-full items-center border-b border-b-white py-4">
            <input
              value={toAddress}
              placeholder="--"
              className="w-full flex-1 bg-transparent text-2xl font-normal text-[#FACD32]  focus:border-none focus:outline-none"
              onChange={(e) => {
                setToAddress(e.target.value);
                setAddErr(false);
                setAddSuccess(false);
              }}
              onBlur={(e) => {
                if (isAddress(e.target.value)) {
                  setAddSuccess(true);
                } else {
                  setAddErr(true);
                }
              }}
            />
            {addrSuccess && (
              <img src={checkContainedFill.src} className="w-6" alt="" />
            )}
          </div>
        </div>
        {addrErr && (
          <p className="mt-2 pl-[178px] text-left text-red-900">
            Invalid address
          </p>
        )}
        <ConfirmBut />
      </div>
    </div>
  );
}
