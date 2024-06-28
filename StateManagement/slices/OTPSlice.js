import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../constants";

export const verifyOTP = createAsyncThunk(
  "otp/verifyOTP",
  async ({ userId, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/users/verify`, {
        userId,
        otp,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const otpSlice = createSlice({
  name: "otp",
  initialState: {
    loading: false,
    error: null,
    otpVerified: false,
  },
  reducers: {
    resetOTPState: (state) => {
      state.loading = false;
      state.error = null;
      state.otpVerified = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state) => {
        state.loading = false;
        state.otpVerified = true;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOTPState } = otpSlice.actions;

export default otpSlice.reducer;
