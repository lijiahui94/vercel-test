"use client";
import { WagmiProvider } from "wagmi";
import { config } from "@/helper/wagmiConfig";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { Provider } from "react-redux";
import { store } from "@/store";
import { Toaster } from "react-hot-toast";
export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={darkTheme()}>
            <Provider store={store}>{children}</Provider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
