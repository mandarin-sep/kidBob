import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ATPT_NM: "충청북도"
// DATA_STDR_DE: "2022-04-01"
// LA: 36.63267545
// LO: 127.4568589
// LOCPLC_ADRES: "충청북도 청주시 서원구 사창동 217-22"
// LOCPLC_RDNMADR_ADRES: "충청북도 청주시 서원구 내수동로102번길 36 (사창동)"
// MGC_NM: "충청북도 청주시"
// MGC_TELNO: "043-201-1925"
// MRHST_NM: "(주)맘스터치 충북대중문점"
// MRHST_TY_CODE: 1
// SIGNGU_CODE: 43112
// SIGNGU_NM: "청주시"
// TELNO: "043-265-9770"

const cbKey = import.meta.env.VITE_CB_KEY;

const asyncCb = createAsyncThunk("asyncCb", async () => {
  const res = await axios(
    `https://apis.data.go.kr/6430000/childMealCardMerchantService/getChildMealCardMerchant?serviceKey=${cbKey}&pageNo=0&numOfRows=20`
  );
  const data = res.data.response.body.items.item;
  return data;
});

const CbSlice = createSlice({
  name: "CbSlice",
  initialState: {
    value: {},
    status: "Welcome",
  },
  extraReducers: (builder) => {
    builder.addCase(asyncCb.pending, (state, action) => {
      state.status = "Loading";
    });
    builder.addCase(asyncCb.fulfilled, (state, action) => {
      state.status = "Succecs";
      state.value = action.payload;
    });

    builder.addCase(asyncCb.rejected, (state, action) => {
      state.status = "fail";
    });
  },
});

export default CbSlice;
export { asyncCb };
