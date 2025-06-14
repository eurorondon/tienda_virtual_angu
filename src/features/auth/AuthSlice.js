// authSlice.js

import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authState: "defaultAuth",
    email: "eurorondon03@gmail.com",
    password: "12345678",
    confirmPassword: "",
    phoneNumber: "",
    verificationCode: "",
    isLoading: false,
    fullName: "",
    user: null,
    error: null,
  },
  reducers: {
    setAuthState: (state, action) => {
      state.authState = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload;
    },

    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setVerificationCode: (state, action) => {
      state.verificationCode = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setFullName: (state, action) => {
      state.fullName = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setAuthState,
  setEmail,
  setPassword,
  setConfirmPassword,
  setPhoneNumber,
  setVerificationCode,
  setLoading,
  setUser,
  setError,
  setFullName,
} = authSlice.actions;

export default authSlice.reducer;
