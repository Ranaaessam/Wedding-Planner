import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addReview = createAsyncThunk("ReviewSlice", async (body) => {
  const response = await axios.post("url", body);
  return response.data;
});

const reviewSlice = createSlice({
  name: "Review",
  initialState: {
    review: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addReview.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.status = "Successed";
        state.review = action.payload;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.error.message;
      });
  },
});
export default reviewSlice.reducer;
