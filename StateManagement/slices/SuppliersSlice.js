// SuppliersSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch suppliers by type
export const getSuppliersByType = createAsyncThunk(
  "suppliers/getSuppliersByType",
  async (type) => {
    const response = await fetch(`http://localhost:3000/suppliers/filtersuppliersByType`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type }),
    });
    const data = await response.json();
    return data;
  }
);

// Suppliers slice definition
const suppliersSlice = createSlice({
  name: "suppliers",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSuppliersByType.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSuppliersByType.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(getSuppliersByType.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default suppliersSlice.reducer;
