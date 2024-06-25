import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../constants";
export const registerUser = createAsyncThunk(
  "RegisterUsr",
  async (userData) => {
    const response = await axios.post(
      `${API_URL}/users/Registration`,
      userData
    );
    return response.data;
  }
);
const signUpSlice = createSlice({
  name: "userDetails",
  initialState: {
    userDetails: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.userDetails = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "Failed";

        state.error = action.error.message;
      });
  },
});

export default signUpSlice.reducer;
