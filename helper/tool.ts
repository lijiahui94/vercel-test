import { utils, BigNumber } from "ethers";
// 千位分隔
export function thousands(value: number | string): string {
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";
}
// BigNumber转字符串
export function bigNumberToString(value: BigNumber) {
  return utils.formatUnits(value).replace(/\.?0+$/, "");
}
