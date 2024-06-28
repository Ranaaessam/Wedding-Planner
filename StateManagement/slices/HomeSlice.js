import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../constants";
import storage from "../../Storage/storage";

export const getVenuesNearLocation = createAsyncThunk(
  "home/getVenuesNearLocation",
  async (_, { rejectWithValue }) => {
    try {
      const userID = await storage.load({ key: "userId" });
      const locationResponse = await axios.get(
        `${API_URL}/account/profile?userId=${userID}`
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

export const getNames = createAsyncThunk(
  "home/getNames",
  async (_, { rejectWithValue }) => {
    try {
      const userID = await storage.load({ key: "userId" });
      const response = await axios.get(
        `${API_URL}/account/usernames?userId=${userID}`
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
    names: {
      user1Name: "",
      user2Name: "",
    },
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
      })
      .addCase(getNames.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNames.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.names = action.payload;
      })
      .addCase(getNames.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default homeSlice.reducer;
