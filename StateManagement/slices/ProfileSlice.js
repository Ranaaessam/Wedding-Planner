import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getUserProfile = createAsyncThunk("UserProfile", async (token) => {
  const response = await axios.get(`URl/clients/getProfile`, {
    headers: {
      "x-auth-token": token,
    },
  });
  return response.data;
});

const profileSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.status = "Loding";
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.status = "Successed";
        state.user = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.error.message;
      });
  },
});
export default profileSlice.reducer;
