import { configureStore } from "@reduxjs/toolkit";
import posSlice from "./pos-slice";

const store = configureStore({
  reducer: {
    pos: posSlice.reducer,
  },
});

export default store;
