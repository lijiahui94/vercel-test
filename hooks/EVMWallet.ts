import { store } from "@/store";
import { setAppInfo } from "@/store/features/appSlice";
import { useAppDispatch } from "@/store/hooks";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";
import { useAccount, useDisconnect } from "wagmi";

export function useEVMAddress() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();
  const connect = async () => {
    openConnectModal && openConnectModal();
  };
  useEffect(() => {
    store.dispatch(
      setAppInfo({
        EVMAddress: address,
      })
    );
    let buySun = localStorage.getItem(address!);
    localStorage.setItem(address!, buySun || "0");
  }, [address]);

  return {
    connect,
    disconnect,
  };
}
