import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBudgetData = createAsyncThunk(
  "budget/fetchBudgetData",
  async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return data.slice(0, 7).map((item, index) => ({
      id: item.id.toString(),
      image: "https://i.ytimg.com/vi/rBLXCpC23CM/maxresdefault.jpg",
      type: index % 2 === 0 ? "Venue" : "Photographer",
      name: item.title,
      price: Math.floor(Math.random() * 5000),
    }));
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
    totalBudget: 100000,
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
      });
  },
});

export const { calculateTotalSpent } = budgetSlice.actions;

export default budgetSlice.reducer;
