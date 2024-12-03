"use client";
import drawerIcon from "@/assets/icons/drawer-icon.png";
import closeIcon from "@/assets/icons/close-line.png";
import { useToggle } from "ahooks";
import NavList from "./NavList";
export default function NavDrawer() {
  const [open, { toggle }] = useToggle(false);
  return (
    <>
      <img
        src={drawerIcon.src}
        alt=""
        className="cursor-pointer my-4 block md:hidden"
        onClick={toggle}
      />
      {open && (
        <div className="fixed h-full w-full left-0 top-0 z-[1000] p-9 pt-16 bg-[#1A1E23] text-white">
          <img
            onClick={(e) => {
              e.stopPropagation();
              toggle();
            }}
            className="absolute right-9 top-9 w-6 cursor-pointer"
            src={closeIcon.src}
            alt=""
          />
          <div className="py-3">
            <NavList direction={"col"} />
          </div>
        </div>
      )}
    </>
  );
}
