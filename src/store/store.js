import { configureStore } from "@reduxjs/toolkit";

import DaeguSlice from "./daeguSlice";

export const store = configureStore({
  reducer: {
    daegu: DaeguSlice.reducer,
  },
});
