import {
  getAccount,
  readContract,
  waitForTransactionReceipt,
  writeContract,
} from "wagmi/actions";
import { chains, config } from "@/helper/wagmiConfig";
import {
  bigNumberToString,
  getContractConfig,
  getTokenStakeContract,
  toBigInt,
  toUint256,
} from "@/helper/wagmiTool";

// 质押
/**
 * @address 合约地址
 * @value   质押数量
 * @id      质押数时间id
 */
export const stakeFn = (address: `0x${string}`, value: string, id: number) => {
  return new Promise(async (resolve, reject) => {
    let Configuration = getContractConfig(
      address,
      "stake",
      toBigInt(value),
      toUint256(id)
    );
    let hash = await writeContract(config, Configuration);
    let data = await waitForTransactionReceipt(config, {
      confirmations: 2,
      chainId: chains.id,
      hash: hash as `0x${string}`,
    });
    if (data.status == "success") {
      resolve(data);
    }
    try {
    } catch (error) {
      reject(error);
    }
  });
};
// 赎回
/**
 * @TokenAddress    合约地址
 * @stakeActIndex   赎回的索引
 */
export const RedeemFn = (
  TokenAddress: `0x${string}`,
  stakeActIndex: number
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { address } = getAccount(config);
      if (!address) return reject("no address available");
      let Configuration = getContractConfig(
        TokenAddress,
        "claim",
        toUint256(stakeActIndex)
      );
      let hash = await writeContract(config, Configuration);
      let data = await waitForTransactionReceipt(config, {
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
};
// 获取赎回列表
export async function getRedeemList() {
  const { address } = getAccount(config);
  if (!address) return [];
  let redeemUPFIList: any;
  let redeemGWGWList: any;
  // UPFI赎回列表
  redeemUPFIList = await readContract(
    config,
    getContractConfig(getTokenStakeContract("UPFI"), "userStakeList", address)
  );
  redeemUPFIList.forEach((UPFIitem: any, index: any) => {
    UPFIitem.name = "UPFI";
    UPFIitem.stakeActIndex = index;
  });
  // GWGW赎回列表
  redeemGWGWList = await readContract(
    config,
    getContractConfig(getTokenStakeContract("GWGW"), "userStakeList", address)
  );
  redeemGWGWList.forEach((GWGWitem: any, index: any) => {
    GWGWitem.name = "GWGW";
    GWGWitem.stakeActIndex = index;
  });
  let List: any = [...redeemUPFIList, ...redeemGWGWList];
  List = List.filter(
    (filterItem: { hasClaimed: boolean }) => filterItem.hasClaimed == false
  );
  List = List.sort(
    (a: any, b: any) => Number(a.startTime) - Number(b.startTime)
  );
  return List.map((item: any, index: any) => {
    return {
      amount: bigNumberToString(item.amount),
      endTime: Number(item.endTime),
      eventIndex: Number(item.eventIndex),
      interest: bigNumberToString(item.interest).match(
        /^-?\d+(?:\.\d{0,4})?/
      )![0],
      startTime: Number(item.endTime),
      hasClaimed: item.hasClaimed,
      name: item.name,
      stakeActIndex: item.stakeActIndex,
    };
  });
}
