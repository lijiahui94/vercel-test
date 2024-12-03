import fetchLib from "@/helper/request";
import { useRequest } from "ahooks";
export interface Resopsne {
  code: number;
  data: Data;
  msg: string;
}

export interface Data {
  available_balance: number;
  balance: number;
  token: string;
  token_type: string;
  transfer_balance: number;
  transfer_balance_list: TransferBalanceList[];
}

export interface TransferBalanceList {
  amount: number;
  inscription_id: string;
  inscription_number: string;
}

/* export async function getTokenBalance(address: string, token: string) {
  const query = new URLSearchParams({ address, token }).toString();
  const res = await fetchLib<Resopsne>(`/v1/assert/token_balance?${query}`);
  return res?.data;
} */

export function useTokenBalance(address: string, token: string) {
  const query = new URLSearchParams({ address, token }).toString();
  const { data } = useRequest(
    () => fetchLib<Resopsne>(`/v1/assert/token_balance?${query}`),
    {
      ready: !!address && !!token,
      refreshDeps: [address, token],
    }
  );
  return {
    data: data?.data,
  };
}
