import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const daeguKey = import.meta.env.VITE_DAEGU_KEY;

const asyncDaegu = createAsyncThunk("asyncDaegu", async (value) => {
  const res = await axios(
    `https://apis.data.go.kr/6270000/dgMealCardShop/getGugunList?serviceKey=${daeguKey}&type=json&numOfRows=1000&pageNo=1&gugunName=${value}`
  );
  const data = res.data.body;
  return data;
});

const fetchListSlice = createSlice({
  name: "fetchListSlice",
  initialState: {
    value: sessionStorage.getItem("initList")
      ? JSON.parse(sessionStorage.getItem("initList"))
      : [],
    resetList: [],
    totalCount: 0,
    status: "Welcome",
  },
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncDaegu.pending, (state, action) => {
      state.status = "Loading";
    });
    builder.addCase(asyncDaegu.fulfilled, (state, action) => {
      state.status = "Succecs";
      state.value = action.payload.items.item;
      sessionStorage.setItem(
        "initList",
        JSON.stringify(action.payload.items.item)
      );
      state.totalCount = action.payload.totalCount;
    });

    builder.addCase(asyncDaegu.rejected, (state, action) => {
      state.status = "fail";
    });
  },
});

export default fetchListSlice;
export { asyncDaegu };
