import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../constants";
export const getUserProfile = createAsyncThunk(
  "UserProfile",
  async (userId) => {
    const response = await axios.get(
      `${API_URL}/account/profile?userId=${userId}`
    );
    return response.data;
  }
);

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
