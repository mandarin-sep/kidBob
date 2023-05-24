import { createSlice } from "@reduxjs/toolkit";

const { naver } = window;

export const MapSlice = createSlice({
  name: "MapSlice",
  initialState: {
    location: new naver.maps.LatLng(37.5656, 126.9769),
    listitemClicked: false,
    info: {},
    type: "",
    division: "",
  },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setInfo: (state, action) => {
      state.info = action.payload;
    },
    setItemClick: (state, action) => {
      state.listitemClicked = action.payload;
    },
    setShopType: (state, action) => {
      state.type = action.payload;
    },
    setDivision: (state, action) => {
      state.division = action.payload;
    },
  },
});
