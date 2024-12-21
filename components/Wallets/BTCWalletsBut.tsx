"use client";
import okxFill from "@/assets/icons/okx.png";
import unisatFill from "@/assets/icons/unisat.png";
import { useBTCWallet } from "@/hooks/BTCWallet";
export default function BTCWalletsBut() {
  const { connect } = useBTCWallet();
  const walletsList = [
    // {
    //   id: "UNISAT",
    //   name: "UNISAT MARKET",
    //   mdName: "Unisat",
    //   icon: unisatFill.src,
    // },
    {
      id: "OKX",
      name: "OKX MARKET",
      mdName: "OKX",
      icon: okxFill.src,
    },
  ];
  return (
    <>
      {walletsList.map((walletItem) => (
        <div
          key={walletItem.id}
          className="cursor-pointer flex justify-center items-center text-2xl text-white font-medium border-2 border-solid border-yellow-300 w-full rounded-xl md:rounded-3xl	py-3 mb-5 bg-[#0F0F12]"
          onClick={() => {
            connect(walletItem.id);
          }}
        >
          <img
            className="w-6 h-6 md:w-12 md:h-12"
            src={walletItem.icon}
            alt=""
          />
          <div className="hidden md:block ml-8">{walletItem.name}</div>
          <div className="md:hidden text-sm ml-2">{walletItem.mdName}</div>
        </div>
      ))}
    </>
  );
}
