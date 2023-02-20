import { createSlice } from "@reduxjs/toolkit";

const createOfferWebSlice = createSlice({
  name: "createOfferWeb",
  initialState: {
    data: [],
  },
  reducers: {
    ADD_CREATEOFFER_DATA: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { ADD_CREATEOFFER_DATA } = createOfferWebSlice.actions;
export default createOfferWebSlice.reducer;
