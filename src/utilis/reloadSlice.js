import { createSlice } from "@reduxjs/toolkit";

const reloadSlice = createSlice({
  name: "reload",
  initialState: {
    isReload: false,
  },
  reducers: {
    toogleReload: (state) => {
      state.isReload = !state.isReload;
    },
  },
});

export const { toogleReload } = reloadSlice.actions;
export default reloadSlice.reducer;