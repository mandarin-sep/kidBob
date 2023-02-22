import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const daeguKey = import.meta.env.VITE_DAEGU_KEY;

const asyncDaegu = createAsyncThunk("asyncDaegu", async (value) => {
  const res = await axios(
    `https://apis.data.go.kr/6270000/dgMealCardShop/getGugunList?serviceKey=${daeguKey}&type=json&numOfRows=1000&pageNo=1&gugunName=${value}`
  );
  console.log(res);
  const data = res.data.body;
  return data;
});

const DaeguSlice = createSlice({
  name: "DaeguSlice",
  initialState: {
    value: [],
    totalCount: 0,
    status: "Welcome",
  },
  extraReducers: (builder) => {
    builder.addCase(asyncDaegu.pending, (state, action) => {
      state.status = "Loading";
    });
    builder.addCase(asyncDaegu.fulfilled, (state, action) => {
      state.status = "Succecs";
      state.value = action.payload.items.item;
      state.totalCount = action.payload.totalCount;
    });

    builder.addCase(asyncDaegu.rejected, (state, action) => {
      state.status = "fail";
    });
  },
});

export default DaeguSlice;
export { asyncDaegu };
