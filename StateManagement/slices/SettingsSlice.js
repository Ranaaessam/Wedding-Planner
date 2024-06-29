import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import storage from "../../Storage/storage";
import axios from "axios";
import API_URL from "../../constants";

export const submitComplaint = createAsyncThunk(
  "settings/submitComplaint",
  async (complaint) => {
    const response = await fetch("https://yourapi.com/complaints", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(complaint),
    });

    if (!response.ok) {
      throw new Error("Failed to submit complaint");
    }

    const data = await response.json();
    return data;
  }
);

export const getWalletVal = createAsyncThunk(
  "settings/wallet",
  async (_, { rejectWithValue }) => {
    try {
      const userId = await storage.load({ key: "userId" });

      const response = await axios.get(`${API_URL}/account/profile`, {
        params: { userId },
      });

      return response.data.wallet;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
export const payWithWallet = createAsyncThunk(
  "account/payWithWallet",
  async (totalPrice, { getState, rejectWithValue }) => {
    const state = getState();
    const accountId = await storage.load({ key: "accountId" });

    try {
      const response = await axios.patch(
        `${API_URL}/account?accountId=${accountId}`,
        {
          account: {
            wallet: state.settings.wallet - totalPrice,
          },
        }
      );
      return response.data;
    } catch (error) {
      // Return a rejected action containing the error message
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    complaints: [],
    status: "idle",
    error: null,
    wallet: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitComplaint.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitComplaint.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.complaints.push(action.payload);
      })
      .addCase(submitComplaint.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(getWalletVal.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getWalletVal.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.wallet = action.payload;
      })
      .addCase(getWalletVal.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default settingsSlice.reducer;
