import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_URL, { wallet } from "../../constants";
import storage from "../../Storage/storage";
import axios from "axios";

export const fetchBudgetData = createAsyncThunk(
  "budget/fetchBudgetData",
  async () => {
    const accountId = await storage.load({ key: "accountId" });

    try {
      const response = await fetch(
        `${API_URL}/orders/getOrdersForUser?userID=${accountId}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch orders: ${response.statusText}`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid response format: expected an array");
      }

      const arrItems = data.flatMap((order) => order.items || []);

      return arrItems;
    } catch (error) {
      console.error("Error fetching budget data:", error);
      throw error;
    }
  }
);

export const refundItem = createAsyncThunk(
  "budget/refundItem",
  async (itemId, { rejectWithValue }) => {
    try {
      const accountId = await storage.load({ key: "accountId" });
      const response = await axios.delete(
        `${API_URL}/orders/refund?accountID=${accountId}&itemId=${itemId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const budgetSlice = createSlice({
  name: "budget",
  initialState: {
    budgetHistory: [],
    amountSpent: 0,
    status: "idle",
    error: null,
  },
  reducers: {
    calculateTotalSpent: (state) => {
      state.amountSpent = state.budgetHistory.reduce(
        (total, item) => total + item.price,
        0
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBudgetData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBudgetData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.budgetHistory = action.payload;
        state.amountSpent = action.payload.reduce(
          (total, item) => total + item.price,
          0
        );
      })
      .addCase(fetchBudgetData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(refundItem.fulfilled, (state, action) => {
        const id = action.payload;
        state.budgetHistory = state.budgetHistory.filter(
          (item) => item._id !== id
        );
        state.amountSpent = state.budgetHistory.reduce(
          (total, item) => total + item.price,
          0
        );
      });
  },
});

export const { calculateTotalSpent } = budgetSlice.actions;

export default budgetSlice.reducer;
