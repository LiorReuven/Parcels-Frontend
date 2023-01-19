import API from '../api/config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { LOGIN_URL } from '../api/config';

export const login = createAsyncThunk('auth/login', async (loginInfo) => {
  try {
    const response = await API.post(LOGIN_URL, loginInfo);

    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
});
