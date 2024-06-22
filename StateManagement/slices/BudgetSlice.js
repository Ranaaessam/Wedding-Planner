import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch budget data
export const fetchBudgetData = createAsyncThunk(
  "budget/fetchBudgetData",
  async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    // Here we are mocking the data structure to match your example
    return data.slice(0, 7).map((item, index) => ({
      id: item.id.toString(),
      image: "https://i.ytimg.com/vi/rBLXCpC23CM/maxresdefault.jpg",
      type: index % 2 === 0 ? "Venue" : "Photographer",
      name: item.title,
      price: Math.floor(Math.random() * 5000),
    }));
  }
);

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
      });
  },
});

export const { calculateTotalSpent } = budgetSlice.actions;

export default budgetSlice.reducer;
