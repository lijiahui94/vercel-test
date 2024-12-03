import { store } from "@/store";
import { setAppInfo } from "@/store/features/appSlice";
import { useEffect } from "react";

export function useBTCWallet() {
  useEffect(() => {
    let wallet = localStorage.getItem("BTCWallet");
    wallet && connect(wallet);
  }, []);
  const connect = async (wallet: string) => {
    switch (wallet) {
      case "UNISAT":
        await UNISAT().connect();
        break;
      case "OKX":
        await OKX().connect();
        break;
      default:
        break;
    }
    localStorage.setItem("BTCWallet", wallet);
  };
  const disConnect = () => {
    store.dispatch(
      setAppInfo({
        BTCAddress: "",
      })
    );
    localStorage.removeItem("BTCWallet");
  };
  return {
    connect,
    disConnect,
  };
}
function OKX() {
  const connect = async () => {
    const okxwallet = (window as any).okxwallet;
    if (!okxwallet) {
      return;
    }
    const result = await okxwallet.bitcoin.connect();
    store.dispatch(
      setAppInfo({
        BTCAddress: result.address,
      })
    );
  };

  return { connect };
}
function UNISAT() {
  const connect = async () => {
    const unisat = (window as any).unisat;
    if (!unisat) {
      return;
    }
    const result = await unisat.requestAccounts();
    store.dispatch(
      setAppInfo({
        BTCAddress: result[0],
      })
    );
  };

  return { connect };
}
