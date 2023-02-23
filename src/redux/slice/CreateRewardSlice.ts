import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { onApiCall } from "../../API";

export const createRewardWeb = createAsyncThunk(
  "createRewardWebSlice",
  (data: any) => {
    const apiData = {
      url: "/reward/create-web-reward",
      method: "POST",
      data: data,
    };

    return onApiCall(apiData)
      .then((res) => {})
      .catch((err) => {});
  }
);

export const createRewardApp = createAsyncThunk(
  "createRewardAppSlice",
  (data: any) => {
    const apiData = {
      url: "/reward/create-app-reward",
      method: "POST",
      data: data,
    };
    console.log("apidataapp", data);

    return onApiCall(apiData)
      .then((res) => {})
      .catch((err) => {});
  }
);

export const createRewardWebDraftData = createAsyncThunk(
  "createRewardWebSlice",
  (data: any) => {
    const apiData = {
      url: "reward/create-reward-in-draft",
      method: "POST",
      data: data,
    };
    console.log("raft dta", data);
    return onApiCall(apiData)
      .then((res) => {})
      .catch((err) => {});
  }
);

export const createRewardAppDraftData = createAsyncThunk(
  "createRewardAppSlice",
  (data: any) => {
    const apiData = {
      url: "/reward/create-reward-in-draft",
      method: "POST",
      data: data,
    };
    console.log("raft dta", data);
    return onApiCall(apiData)
      .then((res) => {})
      .catch((err) => {});
  }
);

export const createDuplicateWebReward = createAsyncThunk(
  "createRewardWebSlice",
  (data: any) => {
    const apiData = {
      url: "/reward/create-web-reward",
      method: "POST",
      data: data,
    };
    return onApiCall(apiData)
      .then((res) => {})
      .catch((err) => {});
  }
);

export const createDuplicateAppReward = createAsyncThunk(
  "createRewardWebSlice",
  (data: any) => {
    const apiData = {
      url: "/reward/create-app-reward",
      method: "POST",
      data: data,
    };
    return onApiCall(apiData)
      .then((res) => {})
      .catch((err) => {});
  }
);

export const createMultipleRewardWebDraftData = createAsyncThunk(
  "createRewardWebSlice",
  (data: any) => {
    const apiData = {
      url: "reward/create-reward-in-draft",
      method: "POST",
      data: data,
    };
    console.log("raft dta", data);
    return onApiCall(apiData)
      .then((res) => {})
      .catch((err) => {});
  }
);

export const createMultipleRewardAppDraftData = createAsyncThunk(
  "createRewardAppSlice",
  (data: any) => {
    const apiData = {
      url: "/reward/create-reward-in-draft",
      method: "POST",
      data: data,
    };
    console.log("raft dta", data);
    return onApiCall(apiData)
      .then((res) => {})
      .catch((err) => {});
  }
);

const createRewardWebSlice = createSlice({
  name: "createRewardWeb",
  initialState: {
    data: [],
  },
  reducers: {
    ADD_CREATEREWARD_DATA: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { ADD_CREATEREWARD_DATA } = createRewardWebSlice.actions;
export default createRewardWebSlice.reducer;
