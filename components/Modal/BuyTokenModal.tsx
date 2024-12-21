import React from "react";
import closeIcon from "@/assets/icons/close-line.png";
import pancakeswapFill from "@/assets/icons/pancakeswap.png";
import Link from "next/link";
interface BuyTokenModalProps {
  open: boolean;
  onClose: () => void;
}

const BuyTokenModal: React.FC<BuyTokenModalProps> = ({ open, onClose }) => {
  if (!open) {
    return null;
  }
  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center z-[1000] bg-black bg-opacity-60">
      <div className="flex w-[320px] md:w-[600px] flex-col items-center justify-center rounded-xl bg-[#1A1E23] p-4 md:p-9 mx-5">
        <img
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="ml-auto w-6 cursor-pointer"
          src={closeIcon.src}
          alt=""
        />
        <p className="mb-6 text-center text-base md:text-3xl text-white font-semibold">
          Buy $GWGW
        </p>
        <Link
          href={
            "https://pancakeswap.finance/swap?chain=bsc&outputCurrency=0x9baE1A6BD435CD0DEB62E7517Ea948B5eb6EB497&inputCurrency=0x55d398326f99059fF775485246999027B3197955"
          }
          className="cursor-pointer flex justify-center items-center text-sm md:text-2xl text-white border-2 border-solid border-yellow-300 w-full rounded-xl md:rounded-3xl	py-3 mb-5 bg-[#0F0F12]"
        >
          <img
            className="w-6 h-6 md:w-12 md:h-12"
            src={pancakeswapFill.src}
            alt=""
          />
          <div className="ml-2">PancakeSwap</div>
        </Link>
      </div>
    </div>
  );
};

export default BuyTokenModal;
