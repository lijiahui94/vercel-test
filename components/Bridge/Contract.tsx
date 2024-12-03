"use client";
import React, { useCallback } from "react";
import iconCopy from "@/assets/icons/copy-left.png";
import clipboard from "clipboard";
import toast, { Toaster } from "react-hot-toast";
import { getPairDetail } from "@/api/v1_pair_detail";
import Link from "next/link";

interface IContractProps {
  contract: string;
}

const Contract: React.FC<IContractProps> = ({ contract }) => {
  const handleCopy = useCallback(() => {
    clipboard.copy(contract);
    toast.success("Copied");
  }, [contract]);
  const aa = () => {
    getPairDetail("beng_bnb")
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  return (
    <div className="flex items-center gap-1 text-base text-white">
      <Toaster position="top-center" reverseOrder={false} />
      <Link
        target="_blank"
        href={`https://bscscan.com/token/${contract}`}
        className="underline	"
      >
        {`${contract.slice(0, 6)}...${contract.slice(-4)}`}
      </Link>
      <img
        onClick={aa}
        className="w-6 cursor-pointer"
        src={iconCopy.src}
        alt=""
      />
    </div>
  );
};

export default Contract;
