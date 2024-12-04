import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import TELEBg from "@/assets/launchpad/TELE-bg.png";
import TELELogo from "@/assets/launchpad/TELE-logo.png";
import MetaphonePassLogo from "@/assets/launchpad/MetaphonePass-icon.png";
import MetaphonePassBg from "@/assets/launchpad/MetaphonePass-bg.png";
import ByinLogo from "@/assets/launchpad/Byin-icon.png";
import JUNLALAAIWatchLogo from "@/assets/launchpad/JUNLALAAIWatch-icon.png";
import UptonLogo from "@/assets/launchpad/Upton-icon.png";
import ByinBg from "@/assets/launchpad/Byin-bg.png";
import JUNLALAAIWatchBg from "@/assets/launchpad/JUNLALAAIWatch-bg.png";
import UptonBg from "@/assets/launchpad/Upton-bg.png";
import websiteIcon from "@/assets/launchpad/icon-website.png";
import telegramIcon from "@/assets/launchpad/icon-telegram.png";
import twitterIcon from "@/assets/launchpad/icon-twitter.png";
const ProjectCardList = [
  {
    id: "Upton",
    url: "/launchpad/Upton",
    logo: UptonLogo.src,
    bg: UptonBg.src,
    state: "Live",
    name: "Upton",
    tokenName: "Upton",
    timeText: "From: December 05 00:00 AM UTC ~ December 07 00:00 AM UTC",
    chain: "TON Chain",
    description:
      "Upton Finance is the first AI-powered MemeCoin Yield Layer within the Telegram ecosystem, merging advanced DeFi strategies with a gamified experience to onboard millions of users into decentralized finance.",
    iconsLink: [
      {
        id: 2,
        src: websiteIcon.src,
        link: "https://www.uptonfi.com",
      },
      {
        id: 3,
        src: telegramIcon.src,
        link: "https://t.me/uptonfinance",
      },
      {
        id: 4,
        src: twitterIcon.src,
        link: "https://t.me/uptonfi_bot",
      },
    ],
    PublicPlacementData: {
      Ticker: "AIUP",
      Price: "1 $AIUP <br/> ≈ $0.142857143 USDT",
      FundingDemand: "100,000",
      PerTicket: "",
      LaunchAmount: "700,000 $AIUP",
      PerTicketValue: "1,399.99 $AIUP <br/> ≈ $200USDT",
      TotalTickets: "",
      RemainingTickets: "",
      Progress: "",
      TotalProgress: "",
    },
  },
  // {
  //   id: "JUNLALAAIWatch",
  //   url: "/launchpad/JUNLALAAIWatch",
  //   logo: JUNLALAAIWatchLogo.src,
  //   bg: JUNLALAAIWatchBg.src,
  //   state: "Ended",
  //   name: "JUNLALA AIWatch",
  //   tokenName: "JUNLALA AIWatch",
  //   timeText: "From: August 26 10:00 AM UTC ~ August 28 10:00 AM UTC",
  //   chain: "TON Chain",
  //   description:
  //     "AI Watch is JUNLALA’s flagship AI hardware device and a key component of its AI+DePIN business model. As the first AI smart hardware device launched within the Ethereum (ETH) ecosystem, AI Watch serves as both a Genesis computing power node and a crucial tool for users to participate in decentralized computing power mining.",
  //   iconsLink: [
  //     {
  //       id: 2,
  //       src: websiteIcon.src,
  //       link: "https://byin.fun",
  //     },
  //     {
  //       id: 3,
  //       src: telegramIcon.src,
  //       link: "https://t.me/BYINchan",
  //     },
  //     {
  //       id: 4,
  //       src: twitterIcon.src,
  //       link: "https://x.com/Byin_Fun",
  //     },
  //   ],
  //   PublicPlacementData: {
  //     Ticker: "AIWatch",
  //     Price: "1 $AIWatch <br/> ≈ 0.000003",
  //     FundingDemand: "96,000",
  //     PerTicket: "0.1 $ETH",
  //     LaunchAmount: "400 $AIWatch",
  //     PerTicketValue: "1 $AIWatch ≈ $240",
  //     TotalTickets: "400",
  //     RemainingTickets: "0",
  //     Progress: "100%",
  //     TotalProgress: "0/400 $AIWatch",
  //   },
  // },
  {
    id: "Byin",
    url: "/launchpad/Byin",
    logo: ByinLogo.src,
    bg: ByinBg.src,
    state: "Ended",
    name: "Byin",
    tokenName: "Byin",
    timeText: "August 26 10:00 AM UTC ~ August 28 10:00 AM UTC",
    chain: "TON Chain",
    description:
      "BYIN is your gateway to effortlessly creating and trading memecoins on TON. Key features include easy token creation, on-platform fundraising, dynamic pricing via Bonding Curve, and seamless DEX integration. Plus, Telegram-based tools enhance the user experience with reminders, trending alerts, and management bots for issuers. With a Fair Launch model, equal opportunities are ensured for all participants.",
    iconsLink: [
      {
        id: 2,
        src: websiteIcon.src,
        link: "https://byin.fun",
      },
      {
        id: 3,
        src: telegramIcon.src,
        link: "https://t.me/BYINchan",
      },
      {
        id: 4,
        src: twitterIcon.src,
        link: "https://x.com/Byin_Fun",
      },
    ],
    PublicPlacementData: {
      Ticker: "BYIN",
      Price: "1 $BYIN <br/> ≈ 0.0000030 $USDT",
      FundingDemand: "40,000",
      PerTicket: "333,333.33 $GWGW = 100 $USDT",
      LaunchAmount: "13,333,333,333.33 $BYIN",
      PerTicketValue: "33,333,333.33 $BYIN ≈ $100",
      TotalTickets: "400",
      RemainingTickets: "0",
      Progress: "100%",
      TotalProgress: "13,333,333,333.33/13,333,333,333.33 $Byin",
    },
  },
  {
    id: "MetaphonePass",
    url: "/launchpad/MetaphonePass",
    logo: MetaphonePassLogo.src,
    bg: MetaphonePassBg.src,
    state: "Ended",
    name: "Metaphone pass",
    tokenName: "MetaPhone PASS",
    timeText: "May 8th 13:00 PM UTC ~ May 10th 12:00 PM UTC",
    chain: "TON Chain",
    description: "MetaPhone, the first #DePIN project on the TON blockchain",
    iconsLink: [
      {
        id: 2,
        src: websiteIcon.src,
        link: "https://metaphone.io",
      },
      {
        id: 3,
        src: telegramIcon.src,
        link: "https://t.me/metaphone_ton",
      },
      {
        id: 4,
        src: twitterIcon.src,
        link: "https://twitter.com/metaphone_ton",
      },
    ],
    PublicPlacementData: {
      Ticker: "MetaPhone PASS",
      Price: "10,000 $MetaPhone PASS <br/> 630,000 $GWGW = 499 $USDT",
      FundingDemand: "10,000,000",
      PerTicket: "630,000 $GWGW = 499 $USDT",
      LaunchAmount: "15,000,000",
      PerTicketValue: "10,000 $MetaPhone PASS <br/> = 1 MetaPhone NFT",
      TotalTickets: "1500",
      RemainingTickets: "606",
      Progress: "59.6%",
      TotalProgress: "8,940,000/15,000,000 $MetaPhone PASS",
    },
  },
  {
    id: "TELE",
    url: "/launchpad/TELE",
    logo: TELELogo.src,
    bg: TELEBg.src,
    state: "Ended",
    name: "TELE",
    tokenName: "TELE",
    timeText: "March 22 12:00 PM UTC ~ March 24 16:00 PM UTC",
    chain: "TON Chain",
    description:
      "TELE stands as a pioneering decentralized social protocol powered by TON, offering users an avenue to unlock earnings through their personal social networks. Rooted within the Telegram ecosystem, our vision is to seamlessly unite billions of users while incentivizing both Web2 and Web3 users to ascend as personal social graph influencers, fostering the growth of countless decentralized communities.",
    iconsLink: [
      {
        id: 2,
        src: websiteIcon.src,
        link: "https://teleprotocol.io/",
      },
      {
        id: 3,
        src: telegramIcon.src,
        link: "https://t.me/the_official_tele_bot",
      },
      {
        id: 4,
        src: twitterIcon.src,
        link: "https://x.com/TELE_Protocol",
      },
    ],
    PublicPlacementData: {
      Ticker: "TELE",
      Price: "1 TELE <br/> ≈ 0.33 GWGW",
      FundingDemand: "50,000",
      PerTicket: "140,000 $GWGW",
      LaunchAmount: "105,000,000",
      PerTicketValue: "420,000 $TELE <br/> ≈ $200",
      TotalTickets: "250",
      RemainingTickets: "0",
      Progress: "100%",
      TotalProgress: "105,000,000/105,000,000 $TELE",
    },
  },
];
export interface launchpadItemType {
  id: string;
  url: string;
  logo: string;
  bg: string;
  state: string;
  name: string;
  chain: string;
  tokenName: string;
  timeText: string;
  description: string;
  iconsLink: iconsLinkType[];
  PublicPlacementData: PublicPlacementDataType;
}
export interface PublicPlacementDataType {
  Ticker: string;
  Price: string;
  FundingDemand: string;
  PerTicket: string;
  LaunchAmount: string;
  PerTicketValue: string;
  TotalTickets: string;
  RemainingTickets: string;
  Progress: string;
  TotalProgress: string;
}
export interface iconsLinkType {
  id: number;
  src: string;
  link: string;
}
interface cutlaunchpadItemType {
  duration: number;
  endTime: number;
  eventIndex: number;
  maxTotalStake: number;
  price: string;
  usdtPrice: string;
  rewardToken: string;
  staked: number;
  startTime: number;
  tokenName: string;
  isEnd: boolean;
  isStart: boolean;
}
interface launchpadState {
  TonAddresses: string;
  ProjectCardList: launchpadItemType[];
  cutlaunchpadItem: cutlaunchpadItemType;
}
const initialState: launchpadState = {
  TonAddresses: "",
  ProjectCardList: ProjectCardList,
  cutlaunchpadItem: {
    duration: 0,
    endTime: 0,
    eventIndex: 0,
    maxTotalStake: 0,
    price: "",
    usdtPrice: "",
    rewardToken: "",
    staked: 0,
    startTime: 0,
    tokenName: "",
    isEnd: false,
    isStart: false,
  },
};

export const launchpadSlice = createSlice({
  name: "launchpadSlice",
  initialState,
  reducers: {
    setLaunchpadInfo: (
      state,
      action: PayloadAction<Partial<launchpadState>>
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setLaunchpadInfo } = launchpadSlice.actions;

export default launchpadSlice.reducer;
