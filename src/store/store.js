import { configureStore } from "@reduxjs/toolkit";
import CbSlice from "./cbSlice";
import DaeguSlice from "./daeguSlice";
import GGSlice from "./ggSlice";
import GwSlice from "./gwSlice";
import IncheonSlice from "./incheonSlice";

export const store = configureStore({
  reducer: {
    gyeonggi: GGSlice.reducer,
    chungbunk: CbSlice.reducer,
    daegu: DaeguSlice.reducer,
    incheon: IncheonSlice.reducer,
    gangwon: GwSlice.reducer,
  },
});
