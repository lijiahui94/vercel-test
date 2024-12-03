"use client";
import { useMemo, useRef, useState } from "react";
import poolsIcon1 from "@/assets/home/pools-icon1.png";
import poolsIcon2 from "@/assets/home/pools-icon2.png";
import poolsIcon3 from "@/assets/home/pools-icon3.png";
import NodataIcon from "@/assets/icons/no-data-icon.png";
import { useClickAway, useToggle } from "ahooks";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import {
  iconsLinkType,
  launchpadItemType,
} from "@/store/launchpad/launchpadSlice";
import classNames from "classnames";
type tabsType = "All" | "Live" | "Ended";

export default function LaunchpadBody() {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = useMemo(() => pathname == "/", [pathname]);
  const { ProjectCardList } = useAppSelector((state) => state.launchpad);
  const [valueName, setValueName] = useState("");
  const [cutTab, setCutTab] = useState("All");
  const tabs: tabsType[] = ["All", "Live", "Ended"];
  const [cutChain, setCutChain] = useState("Any Chain");
  const ChainList = [
    { name: "Any Chain", src: "" },
    { name: "BSC Chain", src: poolsIcon2.src },
    { name: "TON Chain", src: poolsIcon3.src },
  ];
  const [open, { toggle, set }] = useToggle(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickAway(() => {
    set(false);
  }, ref);
  const list = useMemo(() => {
    // 模糊过滤名字(最高权重)
    if (valueName)
      return ProjectCardList.filter((projectItem) => {
        const isfind = new RegExp(valueName, "i").test(projectItem.name);
        return isfind && projectItem;
      });

    // 过滤状态
    let tempList = ProjectCardList;
    tempList = tempList.filter((projectItem) => {
      if (cutTab == "All") return projectItem;
      if (cutTab == projectItem.state) return projectItem;
    });
    // 过滤链
    tempList = tempList.filter((projectItem) => {
      if (cutChain == "Any Chain") return projectItem;
      if (cutChain == projectItem.chain) return projectItem;
    });
    // 首页过滤
    const isHome = pathname == "/";
    if (isHome) {
      tempList = tempList.filter(
        (projectItem, index) => index <= 1 && projectItem
      );
    }
    return tempList;
  }, [pathname, cutTab, valueName, cutChain]) as launchpadItemType[];
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <div className="flex gap-3 justify-between">
          <div className="flex p-1 w-min rounded-xl bg-appbase border border-solid border-appbase overflow-hidden">
            {tabs.map((item: tabsType) => (
              <div
                key={item}
                className={`${
                  cutTab == item ? "bg-app text-appbase" : "text-app"
                } py-2 px-3 md:py-2.5 md:px-8 lg:py-2.5 lg:px-14 text-sm md:text-xl cursor-pointer font-medium rounded-xl`}
                onClick={() => {
                  setCutTab(item);
                  setValueName("");
                }}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="relative" ref={ref} onClick={toggle}>
            <div className="flex justify-center items-center gap-1 w-[117px] md:w-[170px] h-[45px] md:h-[54px] text-sm md:text-xl rounded-xl text-white bg-appbase cursor-pointer">
              <span>{cutChain}</span>
              <img src={poolsIcon1.src} alt="" />
            </div>
            {open && (
              <div className="absolute top-full mt-3 text-xs md:text-base text-white rounded-xl bg-appbase cursor-pointer">
                {ChainList.map((ChainItem) => (
                  <div
                    key={ChainItem.name}
                    className="flex justify-center items-center gap-1 w-[117px] md:w-[170px] h-[45px] md:h-[52px] hover:bg-app/20"
                    onClick={() => {
                      setCutChain(ChainItem.name);
                      setValueName("");
                    }}
                  >
                    <span>{ChainItem.name}</span>
                    {ChainItem.src && <img src={ChainItem.src} alt="" />}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <input
          type="text"
          placeholder="search by name,token"
          className="w-full h-[45px] md:h-[54px] px-5 text-app focus:border-none focus:outline-none bg-appbase rounded-xl"
          value={valueName}
          onChange={(e) => {
            const inputValue = e.target.value;
            setValueName(inputValue);
            setCutTab("All");
          }}
        />
      </div>
      <div
        className={classNames("pt-10 pb-6 grid gap-6 grid-cols-1", {
          "md:grid-cols-2": isHome,
          "lg:grid-cols-3 md:grid-cols-2": !isHome,
          "!grid-cols-1": list.length == 0,
        })}
      >
        {list.map((item, index) => {
          return (
            <div
              key={item.id}
              className={`w-full h-full cursor-pointer bg-appbase p-3 md:p-6 ${
                isHome && index == 1 && "md:block hidden"
              }`}
              onClick={() => {
                router.push(item.url);
              }}
            >
              <img src={item.bg} alt="" />
              <div className="mt-6 flex gap-2.5 text-white">
                <img
                  className="object-contain h-max md:w-[100px] w-[50px] rounded-full"
                  src={item.logo}
                  alt=""
                />
                <div className="flex flex-col justify-between flex-1">
                  <div className="text-2xl flex justify-between items-center flex-wrap gap-1">
                    <span className="font-semibold md:text-2xl text-base">
                      {item.name}
                    </span>
                    <div className="flex gap-2.5 h-7">
                      {item.iconsLink.map((icon: iconsLinkType) => (
                        <img
                          key={icon.id}
                          className="w-6 h-6 p-0.5 cursor-pointer"
                          src={icon.src}
                          alt=""
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(icon.link);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="line-clamp-2 font-normal md:text-base text-sm">
                    {item.description}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {list.length == 0 && (
          <div className="flex justify-center items-center w-full h-80">
            <div className="flex flex-col justify-center gap-3 w-60 h-52">
              <img src={NodataIcon.src} alt="" />
              <div className="text-base text-white text-center font-normal">
                No data~~~
              </div>
            </div>
          </div>
        )}
      </div>

      {isHome && (
        <div
          className="w-max py-4 px-10 m-auto rounded-full text-2xl font-medium border border-solid border-app text-app cursor-pointer md:block hidden"
          onClick={() => {
            router.push("/launchpad");
          }}
        >
          Read More
        </div>
      )}
    </>
  );
}
