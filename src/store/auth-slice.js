import { createSlice } from '@reduxjs/toolkit';
import { login } from './auth-thunk';

const initialAuthState = { authData: null, isAuth: false };

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    logout(state) {
      localStorage.clear();
      state.authData = null;
      state.isAuth = false;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      if (action.payload.token) {
        localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
        state.authData = { ...action?.payload };
        state.isAuth = true;
      } else {
        state.isAuth = false;
      }
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
