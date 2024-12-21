"use client";
import React, { useState } from "react";
import arrowIcon from "@/assets/home/arrow-icon.png";
const list = [
  {
    id: 0,
    title: "What is GoWrap",
    content: (
      <div>
        GoWrap is an innovative platform built on a full-link that aims to
        revolutionize the way projects in the cryptocurrency space are launched
        and supported.
      </div>
    ),
  },
  {
    id: 1,
    title: "What is IDO",
    content: (
      <div>
        An Initial decentralised Offering (IDO) is a type of public offering in
        which a cryptocurrency project launches a new token on a launchpad or
        DEX. This method has gained popularity as it allows anyone to contribute
        to the initial offering, providing equal opportunities for all.
      </div>
    ),
  },
  {
    id: 2,
    title: "Is it safe to use GoWrap? Any potential risks when using GoWrap",
    content: (
      <>
        <div className="mb-5 md:mb-10">
          GoWrap strongly prioritizes the security of its platform and the
          safety of its users. It has in place robust protection measures such
          as secure transaction environments and constant monitoring of the
          platform's activities to avert any malicious actions.
        </div>
        <div>
          When dealing with cryptocurrencies, potential risks can arise from
          market volatility, technological vulnerabilities, and smart contract
          risks.Smart contracts are self-executing contracts with the terms of
          the agreement directly written into code. They are used widely in the
          crypto space for transactions and agreements. However, if a smart
          contract has a flaw or is not written properly, it can be exploited by
          malicious actors leading to potential risks and losses. This
          emphasizes the need for rigorous testing and auditing of smart
          contracts before they are deployed.
        </div>
      </>
    ),
  },
];

const Part4 = () => {
  const [expandId, setExpandId] = useState(0);

  return (
    <div className="max-w-[1480px] m-auto px-10">
      <div className="text-[32px] md:text-[68px] font-bold text-center pt-[180px] pb-10 text-white">
        FAQ<span className="text-app">.</span>
      </div>
      <div className="border-t border-[#434347]">
        {list.map((item) => (
          <div key={item.id} className="py-10 border-b border-[#434347]">
            <div
              className=" flex items-center justify-between gap-4 cursor-pointer"
              onClick={() => {
                if (item.id === expandId) {
                  setExpandId(-1);
                } else {
                  setExpandId(item.id);
                }
              }}
            >
              <div className="text-2xl md:text-[32px] font-normal leading-[48px] text-white w-full whitespace-pre-line font-ClashDisplay">
                {item.title} <span className="text-app">?</span>
              </div>
              <div>
                <img
                  src={arrowIcon.src}
                  className={`w-6 cursor-pointer  pointer-events-none ${
                    expandId !== item.id && "rotate-180"
                  }`}
                  alt=""
                />
              </div>
            </div>
            {expandId === item.id && (
              <div className="text-sm md:text-lg font-normal leading-[30px] text-[#C5C5CA] pt-4">
                {item.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Part4;
