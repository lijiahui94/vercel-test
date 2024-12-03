import Logo from "../Nav/Logo";
import twIcon from "@/assets/icons/tw.png";
import Link from "next/link";
export default function Footer() {
  return (
    <div className="flex flex-col items-center w-full bg-[#0F0F12]">
      <div className="flex justify-between items-center gap-20 w-full max-w-[1480px] h-10 md:h-[90px] px-10">
        <Logo />
        <div className="text-lg font-normal text-white/60 w-full flex justify-between items-center">
          <span>COPYRIGHT2024</span>
          <Link
            className="underline underline-offset-4 text-white"
            href="https://forms.gle/66K6Lnh5axdc74zN8"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply for IDo
          </Link>
        </div>
        <Link
          href="https://twitter.com/GoWrap_xyz"
          target="_blank"
          className="h-10 w-10 hidden md:block"
        >
          <img src={twIcon.src} className="mt-1" alt="" />
        </Link>
      </div>
    </div>
  );
}
