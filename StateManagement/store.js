import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./slices/AdminSlice";
import cartReducer from "./slices/CartSlice"

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    cart: cartReducer,
  },
});

export default store;
