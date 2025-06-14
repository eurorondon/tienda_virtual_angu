import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  fullName: null,
  email: null,
  phoneNumber: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return (state = action.payload);
    },

    resetUser: (state) => {
      return (state = {
        id: null,
        fullName: null,
        email: null,
        phoneNumber: null,
      });
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
