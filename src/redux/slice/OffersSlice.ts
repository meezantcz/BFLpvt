import { createSlice } from "@reduxjs/toolkit";
import Offers from "../../data/MockOfferListing.json";
import { PayloadAction } from "@reduxjs/toolkit";

interface OffersData {
  offerId: string;
  offerName: string;
  startDate: string;
  endDate: string;
  loremIpsum: string;
  offerType: string;
  status: string;
  actions: string;
}

interface ArchiveData {
  itemName: string;
  itemId: string;
  expiry: string;
  archivedDate: string;
  actions: string;
}

interface CreateOfferData {}

interface OffersState {
  Offers: OffersData[];
  ArchivedItems: ArchiveData[];
  CreatedOffer: CreateOfferData[];
}

const initialState: OffersState = {
  Offers: Offers,
  ArchivedItems: [],
  CreatedOffer: [],
};

const OffersSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {
    DELETE_OFFER: (state, action: PayloadAction<string>) => {
      const deletedOffer = state.Offers.find(
        (offer) => offer.offerId === action.payload
      );
      if (deletedOffer) {
        state.Offers = state.Offers.filter(
          (offer) => offer.offerId !== action.payload
        );
        const archivedDate = new Date();
        const expiry = new Date(
          archivedDate.getTime() + 30 * 24 * 60 * 60 * 1000
        );

        state.ArchivedItems = [
          ...state.ArchivedItems,
          {
            itemName: deletedOffer.offerName,
            itemId: deletedOffer.offerId,
            expiry: expiry.toLocaleString(),
            archivedDate: archivedDate.toLocaleString(),

            actions: "Restore",
          },
        ];
      }
    },
    CREATE_OFFER: (state, action: PayloadAction<OffersData>) => {
      state.Offers.unshift(action.payload);
    },
    ADD_CREATEOFFER_DATA: (state, action) => {
      state.CreatedOffer = action.payload;
    },
  },
});

export const { DELETE_OFFER, CREATE_OFFER } = OffersSlice.actions;

export default OffersSlice.reducer;
