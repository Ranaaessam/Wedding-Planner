import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./slices/AdminSlice";
import cartReducer from "./slices/CartSlice";
import searchReducer from "./slices/SearchSlice";
export const store = configureStore({
  reducer: {
    admin: adminReducer,
    cart: cartReducer,
    search: searchReducer,
  },
});

export default store;
