// features/shipping/shippingSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: "",
  city: "",
  postalCode: "",
  country: "",
};

const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {
    setShippingInfo: (state, action) => {
      const { address, city, postalCode, country } = action.payload;
      state.address = address;
      state.city = city;
      state.postalCode = postalCode;
      state.country = country;
    },
    clearShippingInfo: () => initialState,
  },
});

export const { setShippingInfo, clearShippingInfo } = shippingSlice.actions;
export default shippingSlice.reducer;
