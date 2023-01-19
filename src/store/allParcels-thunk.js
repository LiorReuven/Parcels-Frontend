import API from '../api/config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PARCEL_URL, UNSTOCK_URL, SEARCH_URL } from '../api/config';

export const fetchAllParcels = createAsyncThunk(
  'allParcels/fetchData',
  async () => {
    try {
      const response = await API.get(PARCEL_URL);

      console.log('this client is fetching data');
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
);

export const createParcel = createAsyncThunk(
  'allParcels/createParcel',
  async (newParcel) => {
    try {
      const response = await API.post(PARCEL_URL, newParcel);

      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
);

export const updateParcel = createAsyncThunk(
  'allParcels/updateParcel',
  async (updateProperties) => {
    console.log(updateProperties);
    try {
      const response = await API.patch(PARCEL_URL, updateProperties);

      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
);

export const unStockParcel = createAsyncThunk(
  'allParcels/unStockParcel',
  async (unStockProperties) => {
    try {
      const response = await API.patch(UNSTOCK_URL, unStockProperties);

      //The Message i wanna display:
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
);

export const deleteParcel = createAsyncThunk(
  'allParcels/deleteParcel',
  async (deleteProperties) => {
    try {
      const response = await API.delete(SEARCH_URL, { data: deleteProperties });

      console.log(response.data);
      console.log(deleteProperties);

      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
);

export const returnParcel = createAsyncThunk(
  'allParcels/returnParcel',
  async (returnProperties) => {
    try {
      const response = await API.patch(SEARCH_URL, returnProperties);

      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
);
