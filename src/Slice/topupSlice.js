import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  topupMoney: 0 ,
};

export const TopupSlice = createSlice({
  name: "topup",
  initialState: { ...initialState },
  reducers: {
    inputtopupMoney: function (state, action) {
      state.topupMoney = action.payload;
    },
  },
});

export const {
  inputtopupMoney
} = TopupSlice.actions;

export default TopupSlice.reducer;
