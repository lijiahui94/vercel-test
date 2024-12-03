import { useAppSelector } from "@/store/hooks";
import { useMemo } from "react";

const Misaddress = () => {
  const { TonAddresses } = useAppSelector((state) => state.launchpad);
  const isTonAddresses = useMemo(
    () => /^UQ.{46}$/.test(TonAddresses),
    [TonAddresses]
  );
  return (
    <>
      {!isTonAddresses && TonAddresses && (
        <div className="text-[#FA3232] font-normal text-xl mt-2">
          Address format is incorrect. Please enter again
        </div>
      )}
    </>
  );
};
export default Misaddress;
