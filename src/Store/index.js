import { configureStore } from "@reduxjs/toolkit";
import frontpageSlice from "../Slice/frontpageSlice"
import topupSlice from "../Slice/topupSlice";

export default configureStore({
  reducer: {
    frontpage:frontpageSlice,
    topup:topupSlice,
  }
});
