import switchIcon from "@/assets/icons/switch-icon.png";
import iconBtc from "@/assets/icons/btc.png";
import iconBSC from "@/assets/icons/binance.png";
import phoneIcon from "@/assets/icons/phone-icon.png";
import TONIcon from '@/assets/icons/TON-icon.png';
import { Fragment } from "react";
import Link from "next/link";
export default function BridgeHomePage() {
  const list = [
    {
      name: "PHONE",
      icon: phoneIcon.src,
      url: "/bridge/phone_bnb",
    },
    // {
    //   name: "BENG",
    //   icon: "https://static.okx.com/cdn/wallet/logo/icon_custom_default_b.png",
    //   url: "/bridge/beng_bnb",
    // },
    // {
    //   name: "UPFI",
    //   icon: "https://static.okx.com/cdn/web3/currency/token/1703678934230.png/type=png_350_0",
    //   url: "/bridge/upfi_bnb",
    // },
    // {
    //   name: "GWGW",
    //   icon: "https://static.okx.com/cdn/web3/currency/token/1705328329314.png/type=png_350_0",
    //   url: "/bridge/gwgw_bnb",
    // },
    // {
    //   name: "DRAG",
    //   icon: "https://static.okx.com/cdn/wallet/logo/brc20-drag.png",
    //   url: "/bridge/drag_bnb",
    // },
  ];
  return (
    <div className="flex justify-center items-center p-10">
      <div className="max-w-[1480px] w-full p-10 bg-appbase">
        <table className="table-auto w-full  font-medium md:text-base text-xs text-white">
          <thead>
            <tr className="">
              <th className="text-left pl-4 py-2">Project Name</th>
              <th className="">
                <div className="flex justify-between items-center pr-4 py-2">
                  <span>Chain</span>
                  <img className="w-6 h-6" src={switchIcon.src} alt="" />
                  <span>Chain</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <Fragment key={item.name}>
                <tr>
                  <td colSpan={2} className="h-5"></td>
                </tr>
                <tr className="bg-[#29292a] md:bg-[#111112] hover:bg-[#29292a]">
                  <td className="">
                    <Link
                      href={item.url}
                      className="flex items-center gap-2 pl-4 py-2"
                    >
                      <img
                        className="w-5 h-5 md:w-10 md:h-10"
                        src={item.icon}
                        alt=""
                      />
                      <span>{item.name}</span>
                    </Link>
                  </td>
                  <td className="">
                    <Link
                      href={item.url}
                      className="flex justify-between items-center pr-4 py-2"
                    >
                      <img
                        className="w-5 h-5 md:w-10 md:h-10"
                        src={TONIcon.src}
                        alt=""
                      />
                      <img
                        className="w-5 h-5 md:w-10 md:h-10"
                        src={iconBSC.src}
                        alt=""
                      />
                    </Link>
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
