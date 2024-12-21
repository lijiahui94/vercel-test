"use client";
import { useToggle } from "ahooks";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import closeIcon from "@/assets/icons/banner-close.png";
import banner from "@/assets/icons/banner.png";
export default function NavBanner() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, { toggle }] = useToggle(true);
  const goPage = useCallback(
    (link: string) => {
      if (pathname !== link) {
        router.push(link);
      }
    },
    [pathname, router]
  );
  return (
    <>
      {open && pathname == "/" && (
        <>
          <img
            onClick={(e) => {
              e.stopPropagation();
              toggle();
            }}
            className="absolute right-0 ml-auto mr-3 md:mr-0 w-6 cursor-pointer"
            src={closeIcon.src}
            alt=""
          />
          <img
            src={banner.src}
            alt=""
            className="cursor-pointer"
            onClick={() => {
              goPage("/launchpad/MetaphonePass");
            }}
          />
        </>
      )}
    </>
  );
}
