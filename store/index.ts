import { configureStore } from "@reduxjs/toolkit";

import appSlice from "./features/appSlice";
import launchpadSlice from "./launchpad/launchpadSlice";
import stakeSlice from "./stake/stakeSlice";

const reducer = {
  app: appSlice,
  launchpad: launchpadSlice,
  stake: stakeSlice,
};

export function makeStore() {
  return configureStore({
    reducer,
  });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
