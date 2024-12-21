import fetchLib from "@/helper/request";

interface Resopnse {
  code: number;
  msg: string;
  data: wORDIInfoData;
}

export interface wORDIInfoData {
  btc_token: Btctoken;
  wtoken: Wtoken;
  apy: string;
  btc_token_amount: string;
  wtoken_amount: string;
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

export async function getPairDetail(name: string) {
  const res = await fetchLib<Resopnse>(`/v1/pair/detail?name=${name}`);
  return res?.data;
}
