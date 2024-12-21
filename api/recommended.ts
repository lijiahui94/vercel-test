export interface reFeeMetadataType {
  fastestFee: number;
  halfHourFee: number;
  hourFee: number;
  economyFee: number;
  minimumFee: number;
}

export async function getFee() {
  const f = await fetch("https://mempool.space/api/v1/fees/recommended", {
    next: {
      revalidate: 0,
    },
  });
  const res: reFeeMetadataType = await f.json();
  return res;
}
