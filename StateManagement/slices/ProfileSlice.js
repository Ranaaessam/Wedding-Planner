import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../constants";
import storage from "../../Storage/storage";
export const getUserProfile = createAsyncThunk(
  "UserProfile",
  async (userId) => {
    const response = await axios.get(
      `${API_URL}/account/profile?userId=${userId}`
    );
    return response.data;
  }
);

export const updateProfile = createAsyncThunk("UpdateProfile", async (data) => {
  {
    const accountId = await storage.load({ key: "accountId" });

    const response = await axios.patch(
      `${API_URL}/account?accountId=${accountId}`,
      { account: data }
    );
    return response.data;
  }
});

export const getPlanPercentage = createAsyncThunk(
  "PlanPercentage",
  async () => {
    const token = await storage.load({ key: "token" });
    const response = await axios.get(`${API_URL}/orders/PlanPercentage`, {
      headers: {
        "x-auth-token": token,
      },
    });
    return response.data["percentage"];
  }
);

const profileSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
    plan: null,
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
      })
      .addCase(getPlanPercentage.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(getPlanPercentage.fulfilled, (state, action) => {
        state.status = "Successed";
        state.plan = action.payload;
      })
      .addCase(getPlanPercentage.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.error.message;
      });
  },
});
export default profileSlice.reducer;
