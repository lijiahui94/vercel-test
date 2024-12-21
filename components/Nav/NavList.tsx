"use client";
import Link from "next/link";
import classNames from "classnames";
import { usePathname } from "next/navigation";

export default function NavList({ direction }: { direction: string }) {
  const currentPathname = usePathname();

  const navList = [
    {
      navName: "HOME",
      link: "/",
      isComingSoon: false,
    },
    {
      navName: "LAUNCHPAD",
      link: "/launchpad",
      isComingSoon: false,
    },
    {
      navName: "STAKE",
      link: "/stake",
      isComingSoon: false,
    },
    // {
    //   navName: "BRIDGE",
    //   link: "/bridge",
    //   isComingSoon: false,
    // },
  ];
  return (
    <div
      className={`${
        direction == "row"
          ? "flex justify-evenly items-center flex-1"
          : "flex flex-col"
      }`}
    >
      {navList.map((nav) => (
        <Link
          href={nav.link}
          key={nav.navName}
          className={classNames(
            "py-3 text-[22px] font-normal leading-[25px] text-white",
            { "!text-app": currentPathname === nav.link }
          )}
        >
          {nav.navName}
        </Link>
      ))}
    </div>
  );
}
