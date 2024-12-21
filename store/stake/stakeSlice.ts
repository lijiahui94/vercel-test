import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
const TimeList1 = [
  {
    ratio: "35%",
    day: "90",
    eventIndex: 0,
  },
  {
    ratio: "75%",
    day: "180",
    eventIndex: 1,
  },
  {
    ratio: "150%",
    day: "360",
    eventIndex: 2,
  },
];
const TimeList2 = [
  {
    ratio: "2%",
    day: "30",
    eventIndex: 3,
  },
  {
    ratio: "5%",
    day: "90",
    eventIndex: 4,
  },
  {
    ratio: "12%",
    day: "180",
    eventIndex: 5,
  },
  {
    ratio: "30%",
    day: "360",
    eventIndex: 6,
  },
];
export interface stakeItemType {
  id: number;
  title: string;
  type: string;
  state: cutTabsType;
  stakeTime: number;
  stakeTimeList: stakeTimeListType[];
}
interface stakeTimeListType {
  ratio: string;
  day: string;
  eventIndex: number;
}
export type cutTabsType = "Live" | "Ended";
interface stakeState {
  cutTabs: cutTabsType;
  stakeList: stakeItemType[];
}
const initialState: stakeState = {
  cutTabs: "Live",
  stakeList: [
    {
      id: 0,
      title: "GWGW #1",
      type: "GWGW",
      state: "Ended",
      stakeTime: 0,
      stakeTimeList: TimeList1,
    },
    {
      id: 1,
      title: "GWGW #3",
      type: "GWGW",
      state: "Live",
      stakeTime: 3,
      stakeTimeList: TimeList2,
    },
    {
      id: 2,
      title: "UPFI #2",
      type: "UPFI",
      state: "Live",
      stakeTime: 0,
      stakeTimeList: TimeList1,
    },
  ],
};

export const stakeSlice = createSlice({
  name: "stakeSlice",
  initialState,
  reducers: {
    setstakeInfo: (state, action: PayloadAction<Partial<stakeState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setstakeInfo } = stakeSlice.actions;

export default stakeSlice.reducer;
