import { createSlice } from '@reduxjs/toolkit';
import {
  fetchStorages,
  createStorage,
  updateStorage,
  deleteStorage,
} from './storage-thunk';

const initialStoragesState = { allStorages: [] };

const storagesSlice = createSlice({
  name: 'storages',
  initialState: initialStoragesState,
  reducers: {},
  extraReducers: {
    [fetchStorages.fulfilled]: (state, action) => {
      if (action.payload.mongoAllStorages) {
        state.allStorages = [...action.payload.mongoAllStorages];
      }
    },
    [createStorage.fulfilled]: (state, action) => {
      if (action.payload.newStorage && !action.payload.invalid) {
        state.allStorages = [...state.allStorages, action.payload.newStorage];
      }
    },
    [updateStorage.fulfilled]: (state, action) => {
      if (action.payload.mongoUpdatedStorage && !action.payload.invalid) {
        const indexOfAllStorages = state.allStorages.findIndex((storage) => {
          return storage._id === action.payload.mongoUpdatedStorage._id;
        });
        if (indexOfAllStorages !== -1) {
          state.allStorages[indexOfAllStorages] = {
            ...action.payload.mongoUpdatedStorage,
          };
        }
      }
    },
    [deleteStorage.fulfilled]: (state, action) => {
      if (action.payload.mongoDeletedStorage && !action.payload.invalid) {
        const indexOfAllStorages = state.allStorages.findIndex((storage) => {
          return storage._id === action.payload.mongoDeletedStorage._id;
        });
        if (indexOfAllStorages !== -1) {
          state.allStorages.splice(indexOfAllStorages, 1);
        }
      }
    },
  },
});

export const storagesActions = storagesSlice.actions;
export default storagesSlice.reducer;
