import logo from "@/assets/icons/logo.png";
import Link from "next/link";
export default function Logo() {
  return (
    <Link
      href={"/"}
      className="h-7 hidden cursor-pointer items-center gap-2 lg:flex"
    >
      <img
        src={logo.src}
        className="pointer-events-none w-[45px] shrink-0"
        alt=""
      />
      <div className="hidden text-[22px] font-normal leading-[25px] text-white md:block">
        GoWrap
      </div>
    </Link>
  );
}
