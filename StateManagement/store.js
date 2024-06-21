import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./slices/AdminSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
  },
});

export default store;
