import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: null,
  token: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      state.loading = false;
    },
    clearAuth: () => initialState,
  },
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
  clearAuth 
} = authSlice.actions;

export default authSlice.reducer;