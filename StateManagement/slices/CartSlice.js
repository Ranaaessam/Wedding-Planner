import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  selectedDate: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
      state.selectedDate = null;
    },
  },
});

export const { addToCart, removeFromCart, setSelectedDate, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
