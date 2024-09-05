import { configureStore } from "@reduxjs/toolkit";
import titleSlice from "./titleSlice";
import reloadSlice from "./reloadSlice";

const store = configureStore({
  reducer: {
    title: titleSlice,
    reload: reloadSlice,
  },
});

export default store;