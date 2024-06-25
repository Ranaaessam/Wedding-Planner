import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../constants";

export const searchAll = createAsyncThunk(
  "search/searchAll",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/suppliers/filter?name=${searchQuery}`
      );
      console.log("API Response:", response.data);
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
      console.log("Filtering by category:", category);
      state.filteredResults = state.results.filter(
        (result) => result.type === category
      );
      console.log("Filtered Results:", state.filteredResults);
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
        console.log("Results:", state.results);
        state.filteredResults = action.payload.filter(
          (result) => result.type === "venue"
        );
        console.log("Initial Filtered Results:", state.filteredResults);
      })
      .addCase(searchAll.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { filterResultsByCategory } = searchSlice.actions;

export default searchSlice.reducer;
