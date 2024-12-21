"use client";
import { usePathname } from "next/navigation";
import { ReactNode, useMemo, useState } from "react";
export default function LaunchpadTabs({ children }: { children?: ReactNode }) {
  const pathname = usePathname();
  const [cutTab, setCutTab] = useState(0);
  const tabsList = [
    { label: "INTRODUCTION", id: 0 },
    { label: "ROADMAP", id: 1 },
    { label: "TOKENOMICS", id: 2 },
  ];
  const childrenBox = useMemo(() => {
    const isMultipleChildren = Array.isArray(children);
    if (isMultipleChildren) {
      return (
        <>
          {children.map((child, index) => {
            const paths = pathname.split("/").filter(Boolean)[1];
            if (child.key == cutTab) {
              return child.props.children.find(
                (item: { key: string }) => item.key == paths
              );
            }
          })}
        </>
      );
    } else {
      return children;
    }
  }, [children, cutTab]);
  return (
    <div className="pb-16">
      <div className="flex mt-20 border-b border-solid border-gray-100 border-opacity-10 w-full">
        {tabsList.map((tabItem) => (
          <div
            key={tabItem.id}
            className={`p-2 md:p-5 text-sm md:text-xl cursor-pointer ${
              cutTab == tabItem.id
                ? "border-b-2 text-white"
                : "border-b-0 text-white/60"
            } border-solid border-app`}
            onClick={() => setCutTab(tabItem.id)}
          >
            {tabItem.label}
          </div>
        ))}
      </div>
      {childrenBox}
    </div>
  );
}
