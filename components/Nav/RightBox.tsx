import twIcon from "@/assets/icons/tw.png";
import Link from "next/link";
import ConnectWalletBut from "../Wallets/ConnectWalletBut";
import NavDrawer from "./Drawer";

export default function RightBox() {
  return (
    <div className="flex items-center gap-6 ml-auto md:ml-0">
      <Link
        href="https://twitter.com/GoWrap_xyz"
        target="_blank"
        className="h-10 w-10 hidden md:block"
      >
        <img src={twIcon.src} className="mt-1 w-full" alt="" />
      </Link>
      <ConnectWalletBut />
      <NavDrawer />
    </div>
  );
}
