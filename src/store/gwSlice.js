//강원은 춘천의 데이터api만 있음

// "가맹점명": "string",
// "가맹점유형코드": 0,
// "시도명": "string",
// "시군구명": "string",
// "시군구코드": 0,
// "소재지도로명주소": "string",
// "소재지지번주소": "string",
// "위도": "string",
// "경도": "string",
// "전화번호": "string",
// "평일운영시작시각": "string",
// "평일운영종료시각": "string",
// "토요일운영시작시각": "string",
// "토요일운영종료시각": "string",
// "공휴일운영시작시각": "string",
// "공휴일운영종료시각": "string",
// "배달시작시각": "string",
// "배달종료시각": "string",
// "관리기관명": "string",
// "관리기관전화번호": "string",
// "데이터기준일자": "string"

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const gwKey = import.meta.env.VITE_GW_KEY;

const asyncGw = createAsyncThunk("asyncGw", async () => {
  const res = await axios(
    `https://api.odcloud.kr/api/15101733/v1/uddi:6f13a221-5461-401d-b60d-f88c845edf67?page=1&perPage=10&serviceKey=${gwKey}`
  );
  console.log(res);
  const data = res.data.data;
  return data;
});

const GwSlice = createSlice({
  name: "GwSlice",
  initialState: {
    value: {},
    status: "Welcome",
  },
  extraReducers: (builder) => {
    builder.addCase(asyncGw.pending, (state, action) => {
      state.status = "Loading";
    });
    builder.addCase(asyncGw.fulfilled, (state, action) => {
      state.status = "Succecs";
      state.value = action.payload;
    });

    builder.addCase(asyncGw.rejected, (state, action) => {
      state.status = "fail";
    });
  },
});

export default GwSlice;
export { asyncGw };
