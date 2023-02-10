import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// "연번": 0,
//       "가맹점명": "string",
//       "시도명": "string",
//       "시군구명": "string",
//       "소재지도로명주소": "string",
//       "전화번호": "string",
//       "위도": "string",
//       "경도": "string"

const incheonkey = import.meta.env.VITE_INCHEON_KEY;

const asyncIncheon = createAsyncThunk("asyncIncheon", async () => {
  const res = await axios(
    `https://api.odcloud.kr/api/15101752/v1/uddi:a627cfc3-33cf-4479-a42a-a9ef29807ac6?page=1&perPage=10&serviceKey=${incheonkey}`
  );
  console.log(res);
  const data = res.data.data;
  return data;
});

const IncheonSlice = createSlice({
  name: "IncheonSlice",
  initialState: {
    value: {},
    status: "Welcome",
  },
  extraReducers: (builder) => {
    builder.addCase(asyncIncheon.pending, (state, action) => {
      state.status = "Loading";
    });
    builder.addCase(asyncIncheon.fulfilled, (state, action) => {
      state.status = "Succecs";
      state.value = action.payload;
    });

    builder.addCase(asyncIncheon.rejected, (state, action) => {
      state.status = "fail";
    });
  },
});

export default IncheonSlice;
export { asyncIncheon };
