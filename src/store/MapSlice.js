import { createSlice } from "@reduxjs/toolkit";

const { naver } = window;

export const MapSlice = createSlice({
  name: "MapSlice",
  initialState: {
    location: new naver.maps.LatLng(37.5656, 126.9769),
  },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});
