import { configureStore } from "@reduxjs/toolkit";
import titleSlice from "./titleSlice";

const store = configureStore({
  reducer: {
    title: titleSlice,
  },
});

export default store;