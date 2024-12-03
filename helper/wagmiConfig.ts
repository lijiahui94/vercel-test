import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { bsc, bscTestnet } from "wagmi/chains";
import { createConfig, http } from "wagmi";
import { okxWallet, metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";

const projectId = "926416b44dc72bed4897d74529b24e3f";

export const chains = bscTestnet;
// process.env.NEXT_PUBLIC_STAKE_CHAINID === "56" ? bsc : bscTestnet;
const connectors = connectorsForWallets(
  [
    {
      groupName: "Popular",
      wallets: [okxWallet, metaMaskWallet],
    },
  ],
  {
    appName: "Popular",
    projectId,
  }
);

export const config = createConfig({
  connectors,
  chains: [chains],
  transports: {
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
  },
});
