import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { onApiCall } from "../../API";

// interface OffersData {
//   offerId: string;
//   offerName: string;
//   startDate: string;
//   endDate: string;
//   loremIpsum: string;
//   offerType: string;
//   status: string;
//   actions: string;
// }

// interface ArchiveData {
//   itemName: string;
//   itemId: string;
//   expiry: string;
//   archivedDate: string;
//   actions: string;
// }

// interface OffersState {
//   Offers: OffersData[];
//   ArchivedItems: ArchiveData[];
// }

const initialState: any = {
  Offers: [],
  ArchivedItems: [],
};

export const fetchOffersData = createAsyncThunk(
  "OffersSlice",
  (offerType: string) => {
    const url =
      offerType === "all"
        ? "offer/get-all-offers"
        : `/offer/get-all-offers?offerType=${offerType}`;
    const apiData = {
      url,
      method: "GET",
    };

    return onApiCall(apiData)
      .then((res) => {
        if (res.status === 200) {
          return res.data.data;
        }
      })
      .catch((err) => {
        return err.response.message;
      });
  }
);

export const deleteOffer = createAsyncThunk(
  "OffersSlice/deleteOffer",
  (offerId: string) => {
    const apiData = {
      url: `/offer/delete-offer/${offerId}`,
      method: "DELETE",
    };
    return onApiCall(apiData)
      .then((res) => {
        if (res.status === 200) {
          return offerId;
        }
      })
      .catch((err) => {
        return err.response.message;
      });
  }
);

const OffersSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {
    setOffersData: (state, action: PayloadAction<any[]>) => {
      // state.Offers = action.payload;
    },
    DELETE_OFFER: (state, action: PayloadAction<string>) => {
      const deletedOffer = state.Offers.find(
        (offer: any) => offer.offerId === action.payload
      );
      if (deletedOffer) {
        state.Offers = state.Offers.filter(
          (offer: any) => offer.offerId !== action.payload
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
    CREATE_OFFER: (state, action: PayloadAction<any>) => {
      // state.Offers.unshift(action.payload);
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(fetchOffersData.fulfilled, (state: any, action: any) => {
      console.log("inside fulfiiled");

      return {
        ...state,
        Offers: action.payload.offers,
      };
    });
    builder.addCase(fetchOffersData.rejected, (state: any, action: any) => {
      console.log(action.payload);
      console.log("inside rej");
    });
    builder.addCase(fetchOffersData.pending, (state: any, action: any) => {
      console.log(action.payload);
      console.log("inside pending");
    });
    builder.addCase(deleteOffer.fulfilled, (state: any, action: any) => {
      console.log("Delete offer fulfilled");
      state.Offers = state.Offers.filter(
        (offer: any) => offer.offerId !== action.payload
      );
    });

    builder.addCase(deleteOffer.rejected, (state: any, action: any) => {
      console.log(action.payload);
      console.log("Delete offer rejected");
    });

    builder.addCase(deleteOffer.pending, (state: any, action: any) => {
      console.log(action.payload);
      console.log("Delete offer pending");
    });
  },
});

export const { setOffersData, DELETE_OFFER, CREATE_OFFER } =
  OffersSlice.actions;

export default OffersSlice.reducer;
