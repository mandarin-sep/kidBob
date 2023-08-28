import { createSlice } from "@reduxjs/toolkit";

const { naver } = window;

export const ListInfoSlice = createSlice({
  name: "ListInfoSlice",
  initialState: {
    location: sessionStorage.getItem("initCenter")
      ? JSON.parse(sessionStorage.getItem("initCenter"))
      : new naver.maps.LatLng(37.5656, 126.9769),
    listitemClicked: false,
    info: {},
    type: "",
    division: sessionStorage.getItem("initDivision")
      ? JSON.parse(sessionStorage.getItem("initDivision"))
      : "",
  },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
      sessionStorage.setItem("initCenter", JSON.stringify(action.payload));
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
      sessionStorage.setItem("initDivision", JSON.stringify(action.payload));
    },
  },
});
