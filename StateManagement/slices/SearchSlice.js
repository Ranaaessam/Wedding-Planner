import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const searchAll = createAsyncThunk(
  "search/searchAll",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/search?q=${searchQuery}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: [],
    filteredResults: [],
    status: "idle",
    error: null,
  },
  reducers: {
    filterResultsByCategory: (state, action) => {
      const { category } = action.payload;
      state.filteredResults = state.results.filter(
        (result) => result.category === category
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchAll.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchAll.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload;
        state.filteredResults = action.payload.filter(
          (result) => result.category === "Venues"
        );
      })
      .addCase(searchAll.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { filterResultsByCategory } = searchSlice.actions;

export default searchSlice.reducer;
