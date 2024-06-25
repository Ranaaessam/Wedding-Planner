import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../constants";

export const fetchTypes = createAsyncThunk("checkList/fetchTypes", async () => {
  const accountId = await storage.load({ key: "accountId" });
  const response = await axios.get(
    `${API_URL}/orders/getSupplierTypesByID?userID=${accountId}`
  );
  return response.data;
});

const checkListSlice = createSlice({
  name: "checklist",
  initialState: {
    types: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTypes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTypes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.types = action.payload;
      })
      .addCase(fetchTypes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default checkListSlice.reducer;
