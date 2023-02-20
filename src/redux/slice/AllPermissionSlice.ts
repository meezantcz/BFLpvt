import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AllPermission from "../../data/MockAllPermissionManagement.json";

interface AllPermissionData {
  id: string;
  name: string;
  totalGroup: string;
  permissionId: string;
  date: string;
  actions: string;
}

interface AllPermissionState {
  AllPermission: AllPermissionData[];
}

const initialState = {
  AllPermission: AllPermission,
};

const AllPermssionSlice = createSlice({
  name: "allpermission",
  initialState,
  reducers: {
    ADD_PERMISSION(state, action: PayloadAction<AllPermissionData>) {
      state.AllPermission.unshift(action.payload);
    },
  },
});

export const { ADD_PERMISSION } = AllPermssionSlice.actions;
export default AllPermssionSlice.reducer;
