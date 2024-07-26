// src/utils/store.js
import { configureStore } from "@reduxjs/toolkit";
import favReducer from "./favSlice";
import { loadState, saveState } from "./localStorage";

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    fav: favReducer,
  },
  preloadedState, // Initialize the store with the persisted state
});

store.subscribe(() => {
  saveState({
    fav: store.getState().fav,
  });
});

export default store;
