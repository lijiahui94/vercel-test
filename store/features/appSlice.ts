import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface APPState {
  BTCAddress: string;
  EVMAddress: string;
}

const initialState: APPState = { BTCAddress: "", EVMAddress: "" };

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setAppInfo: (state, action: PayloadAction<Partial<APPState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setAppInfo } = appSlice.actions;

export default appSlice.reducer;
