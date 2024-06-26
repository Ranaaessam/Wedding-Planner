import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_URL, { wallet } from "../../constants";
import storage from "../../Storage/storage";

export const fetchBudgetData = createAsyncThunk(
  "budget/fetchBudgetData",
  async () => {
    const accountId = await storage.load({ key: "accountId" });

    try {
      const ordersResponse = await fetch(
        `${API_URL}/orders/getOrdersForUser?userID=${accountId}`
      );
      if (!ordersResponse.ok) {
        throw new Error("Failed to fetch orders");
      }
      const orders = await ordersResponse.json();

      return orders[0].items;
    } catch (error) {
      console.error("Error fetching budget data:", error);
      throw error;
    }
  }
);

export const refundItem = createAsyncThunk(
  "budget/refundItem",
  async (id, { getState }) => {
    const state = getState();
    const item = state.budget.budgetHistory.find((item) => item._id === id);
    if (!item) {
      throw new Error("Item not found");
    }
    wallet += item.price;
    return id;
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
