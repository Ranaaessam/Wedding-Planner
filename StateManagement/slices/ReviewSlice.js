import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../constants";

export const addReview = createAsyncThunk("ReviewSlice", async (body) => {
  const response = await axios.post(`${API_URL}/reviews`, body);
  console.log(response.data);
  return response.data;
});

export const getReviews = createAsyncThunk(
  "GetAllReviews",
  async (supplierId) => {
    const response = await axios.get(
      `${API_URL}/reviews?SupplierID=${supplierId}`
    );
    console.log(response.data);
    return response.data;
  }
);

const reviewSlice = createSlice({
  name: "review",
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
      })
      .addCase(getReviews.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.status = "Successed";
        state.review = action.payload;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.error.message;
      });
  },
});
export default reviewSlice.reducer;
