import { createSlice } from '@reduxjs/toolkit';

import {
  fetchAllParcels,
  createParcel,
  updateParcel,
  unStockParcel,
  deleteParcel,
  returnParcel,
} from './allParcels-thunk';

const initialState = {
  allParcels: [],
  stockParcels: [],
  stockAmount: 0,
};

const allParcelsSlice = createSlice({
  name: 'allParcels',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchAllParcels.fulfilled]: (state, action) => {
      if (action.payload.mongoAllParcels || action.payload.mongoStockParcels) {
        state.allParcels = [...action.payload.mongoAllParcels];

        state.stockParcels = [...action.payload.mongoStockParcels];

        state.stockAmount = action.payload.mongoStockParcels.length;
      }
    },

    [createParcel.fulfilled]: (state, action) => {
      if (action.payload.newParcel && !action.payload.invalid) {
        state.stockParcels = [...state.stockParcels, action.payload.newParcel];
        state.allParcels = [...state.allParcels, action.payload.newParcel];
        state.stockAmount++;
      }

      
    },

    [updateParcel.fulfilled]: (state, action) => {
      if (action.payload.mongoUpdatedParcel && !action.payload.invalid) {
        const indexOfStockParcel = state.stockParcels.findIndex((parcel) => {
          return parcel._id === action.payload.mongoUpdatedParcel._id;
        });
        const indexOfAllParcel = state.allParcels.findIndex((parcel) => {
          return parcel._id === action.payload.mongoUpdatedParcel._id;
        });
        if (indexOfAllParcel && indexOfStockParcel !== -1) {
          state.stockParcels[indexOfStockParcel] = {
            ...action.payload.mongoUpdatedParcel,
          };
          state.allParcels[indexOfAllParcel] = {
            ...action.payload.mongoUpdatedParcel,
          };
        }
      }
    },

    [unStockParcel.fulfilled]: (state, action) => {
      if (action.payload.mongoCurrentParcel && !action.payload.invalid) {
        const indexOfStockParcel = state.stockParcels.findIndex((parcel) => {
          return parcel._id === action.payload.mongoCurrentParcel._id;
        });
        const indexOfAllParcel = state.allParcels.findIndex((parcel) => {
          return parcel._id === action.payload.mongoCurrentParcel._id;
        });
        if (indexOfAllParcel && indexOfStockParcel !== -1) {
          state.stockParcels.splice(indexOfStockParcel, 1);
          state.allParcels[indexOfAllParcel] = {
            ...action.payload.mongoCurrentParcel,
          };
          state.stockAmount--;
        }
      }
    },

    [deleteParcel.fulfilled]: (state, action) => {
      if (action.payload.mongoDeletedParcel && !action.payload.invalid) {
        const indexOfStockParcel = state.stockParcels.findIndex((parcel) => {
          return parcel._id === action.payload.mongoDeletedParcel._id;
        });
        const indexOfAllParcel = state.allParcels.findIndex((parcel) => {
          return parcel._id === action.payload.mongoDeletedParcel._id;
        });
        if (indexOfStockParcel !== -1) {
          state.stockParcels.splice(indexOfStockParcel, 1);
        }
        if (indexOfAllParcel !== -1) {
          state.allParcels.splice(indexOfAllParcel, 1);
        }
        state.stockAmount = state.stockParcels.length;
      }
    },

    [returnParcel.fulfilled]: (state, action) => {
      if (action.payload.mongoReturnedParcel && !action.payload.invalid) {
        const indexOfStockParcel = state.stockParcels.findIndex((parcel) => {
          return parcel._id === action.payload.mongoReturnedParcel._id;
        });
        const indexOfAllParcel = state.allParcels.findIndex((parcel) => {
          return parcel._id === action.payload.mongoReturnedParcel._id;
        });
        if (indexOfAllParcel && indexOfStockParcel !== -1) {
          state.stockParcels.splice(indexOfStockParcel, 1);
          state.allParcels[indexOfAllParcel] = {
            ...action.payload.mongoReturnedParcel,
          };
        }
      }
    },
  },
});

export const allParcelsActions = allParcelsSlice.actions;
export default allParcelsSlice.reducer;
