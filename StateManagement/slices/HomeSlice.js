import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../constants";

export const getVenuesNearLocation = createAsyncThunk(
  "home/getVenuesNearLocation",
  async (_, { rejectWithValue }) => {
    try {
      const locationResponse = await axios.get(
        `${API_URL}/account/profile?userId=66773957627fa3d2658f55e5`
      );
      const location = locationResponse.data.location;
      const response = await axios.get(
        `${API_URL}/suppliers/filter?type=Venue&location=${location}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState: {
    venues: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVenuesNearLocation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getVenuesNearLocation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.venues = action.payload;
      })
      .addCase(getVenuesNearLocation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default homeSlice.reducer;
