import type { Metadata } from "next";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import localFont from "next/font/local";
import AppProvider from "./provider";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "GoWrap",
  // description: "Generated by create next app",
};

const clashDisplay = localFont({
  src: [
    {
      path: "../assets/fonts/ClashDisplay_400.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/ClashDisplay_500.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/ClashDisplay_600.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/ClashDisplay_700.otf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clashDisplay.className}>
        <AppProvider>
          <Nav />
          <div className="pt-10 md:pt-[90px]">{children}</div>
        </AppProvider>
      </body>
    </html>
  );
}
