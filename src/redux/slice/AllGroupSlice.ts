import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AllGroup from "../../data/MockAllGroupManagement.json";

interface AllGroupData {
  id: string;
  name: string;
  totalUsers: string;
  permissionGiven: string;
  date: string;
  actions: string;
}

interface AllGroupState {
  AllGroup: AllGroupData[];
}

const initialState: AllGroupState = {
  AllGroup: AllGroup,
};

const AllGroupSlice = createSlice({
  name: "allgroup",
  initialState,
  reducers: {
    ADD_GROUP(state, action: PayloadAction<AllGroupData>) {
      state.AllGroup.unshift(action.payload);
    },
  },
});

export const { ADD_GROUP } = AllGroupSlice.actions;

export default AllGroupSlice.reducer;
