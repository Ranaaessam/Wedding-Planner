import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_URL from "../../constants";

export const fetchBudgetData = createAsyncThunk(
  "budget/fetchBudgetData",
  async () => {
    const accountId = await storage.load({ key: "accountId" });
    // const accountId = "667a80f6e50f45e1fb219168";

    try {
      const ordersResponse = await fetch(
        `${API_URL}/orders/getOrderedProductsForUser?userID=${accountId}`
      );
      if (!ordersResponse.ok) {
        throw new Error("Failed to fetch orders");
      }
      const orders = await ordersResponse.json();
      console.log(orders);
      const productsResponse = await fetch(
        `${API_URL}/suppliers/retrieveSuppliersByIds`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids: orders }),
        }
      );
      if (!productsResponse.ok) {
        throw new Error("Failed to fetch products");
      }
      const products = await productsResponse.json();
      return products.map((product) => ({
        id: product._id,
        price: product.price,
        type: product.type,
        name: product.name,
        image: product.images[0],
      }));
    } catch (error) {
      console.error("Error fetching budget data:", error);
      throw error;
    }
  }
);

export const refundItem = createAsyncThunk("budget/refundItem", async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return id;
});

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
          (item) => item.id !== id
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
