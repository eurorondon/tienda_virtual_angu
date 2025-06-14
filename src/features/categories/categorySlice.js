import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "",
  search: "",
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.category = action.payload;
      state.search = "";
    },
    setSearch: (state, action) => {
      state.search = action.payload;
      state.category = "";
    },
  },
});

export const { setCategories, setSearch } = categorySlice.actions;

export default categorySlice.reducer;
