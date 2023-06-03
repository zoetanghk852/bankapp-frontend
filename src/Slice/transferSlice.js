import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviceId:"",
  transferMoney:""
};

export const transferSlice = createSlice({
  name: "transfer",
  initialState: { ...initialState },
  reducers: {
    inputReviceId: function (state, action) {
      state.reviceId = action.payload;
    },
    inputTransferMoney: function (state, action) {
      state.transferMoney = action.payload;
    }
  },
});

export const {
  inputReviceId,
  inputTransferMoney
} = transferSlice.actions;

export default transferSlice.reducer;
