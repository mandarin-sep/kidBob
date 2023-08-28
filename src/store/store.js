import { configureStore } from "@reduxjs/toolkit";

import fetchListSlice from "./fetchListSlice";
import { ListInfoSlice } from "./ListInfoSlice";

export const store = configureStore({
  reducer: {
    daegu: fetchListSlice.reducer,
    loca: ListInfoSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
