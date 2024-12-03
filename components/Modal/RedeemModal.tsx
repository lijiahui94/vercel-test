import React, { useEffect, useState } from "react";
import { getRedeemList, RedeemFn } from "@/hooks/Stake";
import closeIcon from "@/assets/icons/close-line.png";
import NodataIcon from "@/assets/icons/no-data-icon.png";
import toast, { Toaster } from "react-hot-toast";
import { getTokenStakeContract } from "@/helper/wagmiTool";
interface RedeemModalProps {
  open: boolean;
  onClose: () => void;
}

const RedeemModal: React.FC<RedeemModalProps> = ({ open, onClose }) => {
  const [redeemList, setRedeemList] = useState<any>([]);
  const updateRedeemList = async () => {
    await getRedeemList();
    let res = await getRedeemList();
    setRedeemList(res);
  };
  useEffect(() => {
    if (open) updateRedeemList();
  }, [open]);
  if (!open) {
    return null;
  }
  return (
    <>
      <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center z-[1000] bg-black bg-opacity-60">
        <div className="flex md:w-[1000px] min-h-[500px] flex-col items-center rounded-xl bg-[#1A1E23] p-5 md:p-9 pr-2 mx-5">
          <img
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="ml-auto mr-3 md:mr-0 w-6 cursor-pointer"
            src={closeIcon.src}
            alt=""
          />
          <p className="mb-2.5 text-2xl md:text-3xl text-center text-white font-semibold">
            My Stake
          </p>
          <div className="flex flex-col items-center max-w-[1392px] w-full">
            <div className="flex justify-between text-white w-full">
              <div className="w-[77px] md:p-2.5 font-medium md:text-base text-xs">
                Coin
              </div>
              <div className="w-[200px] text-center md:p-2.5 font-medium md:text-base text-xs ">
                Amount
              </div>
              <div className="w-[132px] text-center md:p-2.5 font-medium md:text-base text-xs">
                Duration /APR
              </div>
              <div className="w-[200px] text-center md:p-2.5 font-medium md:text-base text-xs ">
                Total profit
              </div>
              <div
                className={`w-[108px] text-center md:p-2.5 font-medium md:text-base text-xs ${
                  redeemList.length > 5 ? "mr-[26px]" : "mr-3"
                }`}
              >
                Total profit
              </div>
            </div>
            <div className="max-h-[380px] w-full overflow-auto custom-scrollbar">
              {redeemList.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-between mr-3 md:my-5 first:md:mt-0 last:md:mb-0 text-white bg-[#1a1a1d] md:bg-[#111112] rounded hover:bg-[#29292a] cursor-pointer"
                >
                  <div className="w-[77px] flex flex-start items-center gap-1 md:gap-2.5 p-2.5">
                    {item.name}
                  </div>
                  <div className="w-[200px] flex justify-center items-center gap-1 md:gap-2.5 p-2.5 ">
                    {item.amount}
                  </div>
                  <div className="w-[132px] flex justify-center items-center gap-1 md:gap-2.5 p-2.5">
                    {item.eventIndex == 0 && "90 D / 35%"}
                    {item.eventIndex == 1 && "180 D / 75%"}
                    {item.eventIndex == 2 && "360 D / 150%"}
                    {item.eventIndex == 3 && "30 D / 2%"}
                    {item.eventIndex == 4 && "90 D / 5%"}
                    {item.eventIndex == 5 && "180 D / 12%"}
                    {item.eventIndex == 6 && "360 D / 30%"}
                  </div>
                  <div className="w-[200px] flex justify-center items-center gap-1 md:gap-2.5 p-2.5 ">
                    {item.interest} {item.name}
                  </div>
                  <div className="w-[108px] flex flex-start items-center gap-1 md:gap-2.5 p-2.5">
                    <div
                      className={`${
                        Date.now() / 1000 > item.endTime
                          ? "bg-app cursor-pointer"
                          : "bg-app/50 cursor-no-drop"
                      } flex justify-center items-center rounded-full text-black px-3 py-2`}
                      onClick={async () => {
                        try {
                          if (Date.now() / 1000 > item.endTime) {
                            let TokenContract = getTokenStakeContract(
                              item.name
                            );
                            await RedeemFn(TokenContract, item.stakeActIndex);
                            toast.success("Successful");
                            onClose();
                          }
                        } catch (error) {
                          toast.error("Failed");
                          console.log("error", error);
                        }
                      }}
                    >
                      Redeem
                    </div>
                  </div>
                </div>
              ))}
              {redeemList.length == 0 && (
                <div className="flex justify-center items-center bg-[#101011] w-full h-80">
                  <div className="flex flex-col justify-center gap-3 w-60 h-52">
                    <img src={NodataIcon.src} alt="" />
                    <div className="text-base text-white text-center font-normal">
                      No data~~~
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default RedeemModal;
