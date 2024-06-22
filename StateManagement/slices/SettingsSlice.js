import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    complaints: [],
    status: "idle",
    error: null,
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
      });
  },
});

export default settingsSlice.reducer;
