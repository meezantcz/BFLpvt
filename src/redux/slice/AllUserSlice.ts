import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AllUser from "../../data/MockAllUserManagement.json";

interface AllUserData {
  id: string;
  name: string;
  email: string;
  permissionAssign: string;
  date: string;
  groupAssign: string;
  actions: string;
}

interface AllUserState {
  AllUser: AllUserData[];
}

const initialState: AllUserState = {
  AllUser: AllUser,
};

const AllUserSlice = createSlice({
  name: "alluser",
  initialState,
  reducers: {
    ADD_USER(state, action: PayloadAction<AllUserData>) {
      state.AllUser.unshift(action.payload);
    },
  },
});

export const { ADD_USER } = AllUserSlice.actions;
export default AllUserSlice.reducer;
