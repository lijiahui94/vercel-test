"use client";
import { ReactNode, useMemo, useState } from "react";
import HotIcon from "@/assets/home/hot-icon.png";
export default function HomeTabs({ children }: { children?: ReactNode }) {
  const [cutTab, setCutTab] = useState(0);
  const tabsList = [
    { label: "About", id: 0 },
    { label: "Pools", id: 1 },
  ];
  const childrenBox = useMemo(() => {
    const isMultipleChildren = Array.isArray(children);
    if (isMultipleChildren) {
      return <>{children.map((child, index) => cutTab == index && child)}</>;
    } else {
      return children;
    }
  }, [children, cutTab]);
  return (
    <>
      <div className="border-b border-solid border-gray-100/10">
        <div className="flex justify-center">
          {tabsList.map((tabItem) => (
            <div
              key={tabItem.id}
              className={`${
                cutTab == tabItem.id
                  ? "border-b-2 text-white"
                  : "border-b-0 text-white/60"
              } flex justify-center items-center gap-1 py-2 md:py-5 px-7 text-base md:text-xl font-bold cursor-pointer border-solid border-app`}
              onClick={() => setCutTab(tabItem.id)}
            >
              {tabItem.label}
              {tabItem.id == 1 && (
                <img className="w-6 h-6" src={HotIcon.src} alt="" />
              )}
            </div>
          ))}
        </div>
      </div>
      {childrenBox}
    </>
  );
}
