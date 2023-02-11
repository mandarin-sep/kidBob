import { configureStore } from "@reduxjs/toolkit";

import DaeguSlice from "./daeguSlice";
import { MapSlice } from "./MapSlice";

export const store = configureStore({
  reducer: {
    daegu: DaeguSlice.reducer,
    loca: MapSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
