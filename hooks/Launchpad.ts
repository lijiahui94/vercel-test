import { chains, config } from "@/helper/wagmiConfig";
import {
  bigNumberToString,
  getIDOConfiguration,
  toBigInt,
  toUint256,
} from "@/helper/wagmiTool";
import { store } from "@/store";
import { setLaunchpadInfo } from "@/store/launchpad/launchpadSlice";
import {
  readContract,
  waitForTransactionReceipt,
  writeContract,
} from "wagmi/actions";

export function getLaunchOptionList() {
  if (window.location.pathname === "/launchpad/Upton") {
    readContract(config, getIDOConfiguration("stakeList")).then((res: any) => {
      console.log('res', res);
      let data = res[res.length - 1];
      const currentTime = Math.floor(Date.now() / 1000); // 当前时间戳
      //   const startTime = new Date("2024-08-28T11:21:00+08:00").getTime() / 1000; // 2024年2月3日 0:00:00 UTC的时间戳
      //   const endTime = startTime + 10;
      store.dispatch(
        setLaunchpadInfo({
          cutlaunchpadItem: {
            duration: Number(data.duration),
            endTime: Number(data.endTime),
            eventIndex: Number(data.eventIndex),
            maxTotalStake: Number(data.maxTotalStake),
            price: bigNumberToString(data.price),
            usdtPrice: bigNumberToString(data.usdtPrice),
            rewardToken: data.rewardToken,
            staked: Number(data.staked),
            startTime: Number(data.startTime),
            tokenName: data.tokenName,
            isEnd: Number(data.endTime) > currentTime,
            isStart: Number(data.startTime) > currentTime,
          },
        })
      );
    });
    return;
  }
  store.dispatch(
    setLaunchpadInfo({
      cutlaunchpadItem: {
        duration: 0,
        endTime: 0,
        eventIndex: 0,
        maxTotalStake: 0,
        price: "0",
        usdtPrice: "",
        rewardToken: "0",
        staked: 0,
        startTime: 0,
        tokenName: "0",
        isEnd: true,
        isStart: true,
      },
    })
  );
}
// 买
export function buy(
  value: string,
  id: number,
  address: string,
  isGwGW: boolean = false
) {
  return new Promise(async (resolve, reject) => {
    try {
      let functionName = isGwGW ? "transfer" : "transferUSDT";
      let hash = await writeContract(
        config,
        getIDOConfiguration(
          functionName,
          toBigInt(value),
          toUint256(id),
          address
        )
      );
      let data = await waitForTransactionReceipt(config, {
        confirmations: 2,
        chainId: chains.id,
        hash: hash as `0x${string}`,
      });
      if (data.status == "success") {
        resolve(data);
      }
    } catch (error) {
      reject(error);
    }
  });
}
