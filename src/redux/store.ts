import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AllUserReducer from "./slice/AllUserSlice";
import AllGroupReducer from "./slice/AllGroupSlice";
import AllPermissionReducer from "./slice/AllPermissionSlice";
import OffersReducer from "./slice/OffersSlice";
import CreateOfferReducer from "./slice/CreateOfferSlice";

export const store = configureStore({
  reducer: {
    alluser: AllUserReducer,
    allgroup: AllGroupReducer,
    allpermission: AllPermissionReducer,
    offers: OffersReducer,
    createOfferWeb: CreateOfferReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
