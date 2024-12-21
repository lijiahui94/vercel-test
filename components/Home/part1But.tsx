"use client";

import { useToggle } from "ahooks";
import Link from "next/link";
import BuyTokenModal from "../Modal/BuyTokenModal";

export default function Part1But() {
  const [open, { toggle }] = useToggle(false);
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-7 pt-6 md:pt-12">
      <Link
        href="/launchpad"
        className="bg-app text-xl text-black rounded-full px-10 py-2 md:px-10 md:py-4 w-max"
      >
        Launch dAPP
      </Link>
      <div
        className="bg-app text-xl text-black rounded-full px-10 py-2 md:px-10 md:py-4 w-max cursor-pointer"
        onClick={toggle}
      >
        Buy GWGW
      </div>
      <BuyTokenModal open={open} onClose={toggle} />
    </div>
  );
}
