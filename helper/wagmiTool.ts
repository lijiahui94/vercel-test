import stake_abi from "@/assets/json/stake_abi.json";
import erc20_abi from "@/assets/json/erc20.json";
import ido_abi from "@/assets/json/ido_abi.json";
import { chains, config } from "./wagmiConfig";
import { BigNumber, utils } from "ethers";
import { useState } from "react";
import {
  getAccount,
  getBalance,
  readContract,
  switchChain,
  waitForTransactionReceipt,
  writeContract,
} from "wagmi/actions";
const GWGWAddress = process.env
  .NEXT_PUBLIC_GWGW_CONTRACT_ADDRESS as `0x${string}`;
const UPFIAddress = process.env
  .NEXT_PUBLIC_UPFI_CONTRACT_ADDRESS as `0x${string}`;
const stakeAddress = process.env
  .NEXT_PUBLIC_STAKE_CONTRACT_ADDRESS as `0x${string}`;
// 获取合约配置
export function getContractConfig(
  address: `0x${string}`,
  functionName: string,
  ...args: any[]
) {
  return {
    address,
    abi: stake_abi as any,
    functionName,
    chainId: chains.id,
    args,
  };
}
// 获取代币合约配置
export function getTokenContractConfig(
  address: `0x${string}`,
  functionName: string,
  ...args: any[]
) {
  return {
    address,
    abi: erc20_abi as any,
    functionName,
    chainId: chains.id,
    args,
  };
}
// 持有的代币数量
export const getMyBalance = (token: `0x${string}`) => {
  const [MyBalance, setMyBalance] = useState<string>("0");
  const getMyTokenBalance = async () => {
    const { address } = getAccount(config);
    if (!address) return;
    const balance = await getBalance(config, {
      address,
      token,
    });
    let numberString = bigNumberToString(balance.value as any) || "0";
    if (numberString.includes(".")) {
      const parts = numberString.split(".");
      const integerPart = parts[0];
      const decimalPart = parts[1].substring(0, 2);

      setMyBalance(`${integerPart}.${decimalPart}`);
    } else {
      setMyBalance(`${numberString}`);
    }
  };
  return { MyBalance, getMyTokenBalance };
};
// 切链
export const switchChainID = async () => {
  return new Promise(async (resolve, reject) => {
    const { chainId } = getAccount(config);
    if (chainId !== Number(process.env.NEXT_PUBLIC_STAKE_CHAINID)) {
      switchChain(config, {
        chainId: chains.id,
      })
        .then((network) => {
          resolve(network);
        })
        .catch((error) => {
          reject(error);
        });
      return;
    }
    resolve(chainId);
  });
};
// 获取授权代币数量
/**
 * @LicenseContract 授权合约
 * @AuthorizedContract 被授权合约
 */
export const getAllowance = async (
  LicenseContract: `0x${string}`,
  AuthorizedContract: `0x${string}`
) => {
  const { address } = getAccount(config);
  if (!address) return 0;
  let Configuration = getTokenContractConfig(
    LicenseContract,
    "allowance",
    address,
    AuthorizedContract
  );
  const allTKTokenSum = await readContract(config, Configuration);
  return Number(bigNumberToString(allTKTokenSum as any));
};
// 授权代币
/**
 * @LicenseContract 授权合约
 * @AuthorizedContract 被授权合约
 */
export const approve = async (
  LicenseContract: `0x${string}`,
  AuthorizedContract: `0x${string}`
) => {
  return new Promise(async (resolve, reject) => {
    const maxAllowance =
      "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
    try {
      let Configuration = getTokenContractConfig(
        LicenseContract,
        "approve",
        AuthorizedContract,
        maxAllowance
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
/**
 * 检查代币是否授权
 * @LicenseContract 授权合约
 * @AuthorizedContract 被授权合约
 * @consume 授权代币数量
 */
export const verification = async (
  LicenseContract: `0x${string}`,
  AuthorizedContract: `0x${string}`,
  consume: number = 0
) => {
  return new Promise(async (resolve, reject) => {
    try {
      await switchChainID();
      let Amount = await getAllowance(LicenseContract, AuthorizedContract);
      // 没有授权代币
      if (Amount <= consume) {
        await approve(LicenseContract, AuthorizedContract);
      }
      resolve(true);
    } catch (error) {
      reject(false);
    }
  });
};
// 获取代币合约
export const getTokenContract = (type: string) => {
  let TokenContract = "";
  switch (type) {
    case "GWGW":
      // GWGW代币合约
      TokenContract = process.env
        .NEXT_PUBLIC_GWGW_CONTRACT_ADDRESS as `0x${string}`;
      break;
    case "UPFI":
      // UPFI代币合约
      TokenContract = process.env
        .NEXT_PUBLIC_UPFI_CONTRACT_ADDRESS as `0x${string}`;
      break;
    case "USDT":
      // USDT代币合约
      TokenContract = process.env
        .NEXT_PUBLIC_USDT_CONTRACT_ADDRESS as `0x${string}`;
      break;
    default:
      break;
  }
  return TokenContract as `0x${string}`;
};
// 获取代币质押合约
export const getTokenStakeContract = (type: string) => {
  let TokenStakeContract = "";
  switch (type) {
    case "GWGW":
      // 质押GWGW合约
      TokenStakeContract = process.env
        .NEXT_PUBLIC_STAKE_CONTRACT_ADDRESS as `0x${string}`;
      break;
    case "UPFI":
      // 质押UPFI合约
      TokenStakeContract = process.env
        .NEXT_PUBLIC_STAKE_UPFI_CONTRACT_ADDRESS as `0x${string}`;
      break;
    case "IDO":
      // IDO合约
      TokenStakeContract = process.env
        .NEXT_PUBLIC_IDO_CONTRACT_ADDRESS as `0x${string}`;
      break;
    default:
      break;
  }
  return TokenStakeContract as `0x${string}`;
};
// 获取IDO合同配置
export function getIDOConfiguration(functionName: string, ...args: any[]) {
  return {
    address: process.env.NEXT_PUBLIC_IDO_CONTRACT_ADDRESS as `0x${string}`,
    abi: ido_abi as any,
    functionName,
    chainId: chains.id,
    args,
  };
}
// 转uint256
export function toUint256(value: any) {
  if (value < 0) value = 0;
  return utils.defaultAbiCoder.encode(["uint256"], [value]);
}
// 转toBigInt
export function toBigInt(value: string) {
  return utils.parseEther(value).toBigInt();
}
// BigNumber转字符串
export function bigNumberToString(value: BigNumber) {
  return utils.formatUnits(value).replace(/\.?0+$/, "");
}
// 千位分隔
export function formatNumberWithCommas(number: number): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// 转BigNumber
export function toBigNumber(value: string) {
  return utils.parseUnits(value, 18);
}
// uint256(bigint)转小数
export function getFormatEther(value: bigint, _isNumber = true) {
  if (!value) {
    return "0";
  }
  return utils.formatEther(value) == "0.0" ? "0" : utils.formatEther(value);
}
