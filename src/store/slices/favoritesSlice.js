import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteCities: JSON.parse(localStorage.getItem("favoriteCities")) || [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const newCity = action.payload;
      if (!state.favoriteCities.includes(newCity)) {
        state.favoriteCities.push(newCity);
        localStorage.setItem(
          "favoriteCities",
          JSON.stringify(state.favoriteCities)
        );
      }
    },
    removeFavorite: (state, action) => {
      const cityToRemove = action.payload;
      state.favoriteCities = state.favoriteCities.filter(
        (city) => city !== cityToRemove
      );
      localStorage.setItem(
        "favoriteCities",
        JSON.stringify(state.favoriteCities)
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
