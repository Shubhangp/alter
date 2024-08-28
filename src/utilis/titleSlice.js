import { createSlice } from "@reduxjs/toolkit";

const titleSlice = createSlice({
    name: "title",
    initialState: {
        details: ""
    },
    reducers: {
        titleData: (state, action) => {
            state.details=(action.payload);
        }
    },
});

export const { titleData } = titleSlice.actions;
export default titleSlice.reducer;