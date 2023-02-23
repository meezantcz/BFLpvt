import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { onApiCall } from "../../API";

export const createOfferWeb = createAsyncThunk(
  "createOfferWebSlice",
  (data: any) => {
    const apiData = {
      url: "/offer/create-web-offer",
      method: "POST",
      data: data,
    };

    return onApiCall(apiData)
      .then((res) => {})
      .catch((err) => {});
  }
);

export const createOfferApp = createAsyncThunk(
  "createOfferAppSlice",
  (data: any) => {
    const apiData = {
      url: "/offer/create-app-offer",
      method: "POST",
      data: data,
    };
    console.log("apidataapp", data);

    return onApiCall(apiData)
      .then((res) => {})
      .catch((err) => {});
  }
);

export const createOfferWebDraftData = createAsyncThunk(
  "createOfferWebSlice",
  (data: any) => {
    const apiData = {
      url: "/offer/create-offer-in-draft",
      method: "POST",
      data: data,
    };
    console.log("raft dta", data);
    return onApiCall(apiData)
      .then((res) => {})
      .catch((err) => {});
  }
);

export const createOfferAppDraftData = createAsyncThunk(
  "createOfferAppSlice",
  (data: any) => {
    const apiData = {
      url: "/offer/create-offer-in-draft",
      method: "POST",
      data: data,
    };
    console.log("raft dta", data);
    return onApiCall(apiData)
      .then((res) => {})
      .catch((err) => {});
  }
);

export const createDuplicateWebOffer = createAsyncThunk(
  "createOfferWebSlice",
  (data: any) => {
    const apiData = {
      url: "offer/create-web-offer",
      method: "POST",
      data: data,
    };
    return onApiCall(apiData)
      .then((res) => {})
      .catch((err) => {});
  }
);

export const createDuplicateAppOffer = createAsyncThunk(
  "createOfferWebSlice",
  (data: any) => {
    const apiData = {
      url: "offer/create-app-offer",
      method: "POST",
      data: data,
    };
    return onApiCall(apiData)
      .then((res) => {})
      .catch((err) => {});
  }
);

export const createMultipleOfferWebDraftData = createAsyncThunk(
  "createOfferWebSlice",
  (data: any) => {
    const apiData = {
      url: "/offer/create-offer-in-draft",
      method: "POST",
      data: data,
    };
    console.log("raft dta", data);
    return onApiCall(apiData)
      .then((res) => {})
      .catch((err) => {});
  }
);

export const createMultipleOfferAppDraftData = createAsyncThunk(
  "createOfferAppSlice",
  (data: any) => {
    const apiData = {
      url: "/offer/create-offer-in-draft",
      method: "POST",
      data: data,
    };
    console.log("raft dta", data);
    return onApiCall(apiData)
      .then((res) => {})
      .catch((err) => {});
  }
);

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
