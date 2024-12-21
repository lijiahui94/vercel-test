import fetchLib from "@/helper/request";

export interface Resopnse {
  code: number;
  data: pairData;
  msg: string;
}

export interface pairData {
  btc_token: Btctoken;
  wtoken: Wtoken;
  has_whitelist: number;
  start_time?: number;
}

interface Wtoken {
  chain: string;
  name: string;
  show_name: string;
  contract_address: string;
}

interface Btctoken {
  tick: string;
}
export async function getPairInfo(name: string) {
  const res = await fetchLib<Resopnse>(`/v1/pair/info?name=${name}`, {
    cache: "no-cache",
  });
  return res?.data;
}
