import API from '../../api/config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { STORAGES_URL } from '../../api/config';

export const fetchStorages = createAsyncThunk(
  'storages/fetchStorages',
  async () => {
    try {
      const response = await API.get(STORAGES_URL);

      console.log('this client is fetching storages');
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
);

export const createStorage = createAsyncThunk(
  'storages/createStorage',
  async (newParcel) => {
    try {
      const response = await API.post(STORAGES_URL, newParcel);

      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
);

export const updateStorage = createAsyncThunk(
  'storages/updateStorage',
  async (updateProperties) => {
    console.log(updateProperties);
    try {
      const response = await API.patch(STORAGES_URL, updateProperties);

      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
);

export const deleteStorage = createAsyncThunk(
  'storages/deleteStorage',
  async (_id) => {
    try {
      const response = await API.delete(STORAGES_URL, { data: { _id: _id } });

      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
);
