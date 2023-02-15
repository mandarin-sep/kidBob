import { createSlice } from "@reduxjs/toolkit";

const { naver } = window;

export const MapSlice = createSlice({
  name: "MapSlice",
  initialState: {
    location: new naver.maps.LatLng(37.5656, 126.9769),
    boolean: false,
    value: {},
  },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setInfo: (state, action) => {
      state.boolean = action.payload.isOpen;
      state.value = action.payload.infomation;
    },
  },
});
