import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const ggKey = import.meta.env.VITE_GG_KEY;

const asyncGg = createAsyncThunk("asyncGg", async () => {
  const res = await axios(
    `https://openapi.gg.go.kr/ChildWelfareMealsrv?KEY=${ggKey}&Type=json`
  );
  console.log(res);
  const data = res.data.ChildWelfareMealsrv[1].row;
  return data;
});

const GGSlice = createSlice({
  name: "GGSlice",
  initialState: {
    value: {},
    status: "Welcome",
  },
  extraReducers: (builder) => {
    builder.addCase(asyncGg.pending, (state, action) => {
      state.status = "Loading";
    });
    builder.addCase(asyncGg.fulfilled, (state, action) => {
      state.status = "Succecs";
      state.value = action.payload;
    });

    builder.addCase(asyncGg.rejected, (state, action) => {
      state.status = "fail";
    });
  },
});

export default GGSlice;
export { asyncGg };
