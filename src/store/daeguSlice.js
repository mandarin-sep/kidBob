import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const ggKey = process.env.REACT_APP_GG_KEY;

// "shopId": "string",
//         "shopName": "string",
//         "shopType": "string",
//         "sidoName": "string",
//         "gunguName": "string",
//         "gunguCode": "string",
//         "shopRoadAddr": "string",
//         "shopRoadAddr2": "string",
//         "shopAddr": "string",
//         "shopAddr2": "string",
//         "shopTel": "string",
//         "coRegNo": "string",
//         "coSubRegNo": "string",
//         "coOwnNm": "string",
//         "coJobSt": "string",
//         "coJobStDate": "string",
//         "coFrNm": "string",
//         "coFrGbn": "string",
//         "shopBsType": "string",
//         "shopFaType": "string",
//         "shopLat": 0,
//         "shopLon": 0,
//         "wdFrTime": "string",
//         "wdToTime": "string",
//         "stFrTime": "string",
//         "stToTime": "string",
//         "hoFrTime": "string",
//         "hoToTime": "string",
//         "deliFrTime": "string",
//         "deliToTime": "string",
//         "mealType": "string",
//         "deliverYn": "string",
//         "mngGoNm": "string",
//         "mngGoTel": "string",
//         "insDate": "string"

const daeguKey = import.meta.env.VITE_DAEGU_KEY;

const asyncDaegu = createAsyncThunk("asyncDaegu", async (value) => {
  const res = await axios(
    `https://apis.data.go.kr/6270000/dgMealCardShop/getGugunList?serviceKey=${daeguKey}&type=json&numOfRows=1&pageNo=20&gugunName=${value}`
  );
  console.log(res);
  const data = res.data.body.items.item;
  return data;
});

const DaeguSlice = createSlice({
  name: "DaeguSlice",
  initialState: {
    value: {},
    status: "Welcome",
  },
  extraReducers: (builder) => {
    builder.addCase(asyncDaegu.pending, (state, action) => {
      state.status = "Loading";
    });
    builder.addCase(asyncDaegu.fulfilled, (state, action) => {
      state.status = "Succecs";
      state.value = action.payload;
    });

    builder.addCase(asyncDaegu.rejected, (state, action) => {
      state.status = "fail";
    });
  },
});

export default DaeguSlice;
export { asyncDaegu };
