// src/redux/slices/guestListSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Example API endpoint
const API_URL = "https://jsonplaceholder.typicode.com/users";

// Async thunk to fetch guests from an API
export const fetchGuests = createAsyncThunk(
  "guestList/fetchGuests",
  async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  }
);

const guestListSlice = createSlice({
  name: "guestList",
  initialState: {
    guests: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // Additional reducers can be added here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuests.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGuests.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.guests = action.payload;
      })
      .addCase(fetchGuests.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default guestListSlice.reducer;
