import { createSlice } from "@reduxjs/toolkit";
import {
  saveItemToFirestore,
  removeItemFromFirestore,
} from "../components/firebaseHelpers"; // Adjust the path as needed

const favSlice = createSlice({
  name: "fav",
  initialState: {
    items: [],
    userId: null,
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    addItem: (state, action) => {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        saveItemToFirestore(state.userId, action.payload); // Save to Firestore
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      removeItemFromFirestore(state.userId, action.payload); // Remove from Firestore
    },
  },
});

export const { setUserId, setItems, addItem, removeItem } = favSlice.actions;
export default favSlice.reducer;
