import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../constants";
import storage from "../../Storage/storage";

export const addReview = createAsyncThunk(
  "review/addReview",
  async ({ review, rate, to }) => {
    const accountId = await storage.load({ key: "accountId" });

    const body = {
      review: review,
      rate: rate,
      to: to,
      from: accountId,
    };

    const response = await axios.post(`${API_URL}/reviews/`, body);
    return response.data;
  }
);

export const getSupplierReview = createAsyncThunk(
  "review/getSupplierReview",
  async ({ supplierId }) => {
    const response = await axios.get(`${API_URL}/reviews/${supplierId}`);
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
      })
      .addCase(addReview.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.error.message;
      })
      .addCase(getSupplierReview.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(getSupplierReview.fulfilled, (state, action) => {
        state.status = "Successed";
        state.review = action.payload;
      })
      .addCase(getSupplierReview.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.error.message;
      });
  },
});
export default reviewSlice.reducer;
