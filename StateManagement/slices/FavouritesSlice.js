import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Get all favorites
export const getAllFavourites = createAsyncThunk(
  "favourites/fetchAll",
  async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return response.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

// Add a favorite
export const addToFavorites = createAsyncThunk(
  "favourites/add",
  async ({ favouriteItem, accountId }) => {
    try {
      const response = await axios.post(
        `API_URL/favourites?accountId=${accountId}`,
        favouriteItem,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.status === 200) {
        throw new Error("Failed to add favorite");
      }

      const addedFavourite = response.data;
      return addedFavourite;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

// Remove a favorite from favorites
export const removeFromFavorites = createAsyncThunk(
  "favourites/remove",
  async (favouriteId) => {
    try {
      const response = await axios.delete(`API_URL/favourites/${favouriteId}`);

      if (!response.status === 200) {
        throw new Error("Failed to remove favorite");
      }

      return favouriteId;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: [""],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle pending, fulfilled, and rejected states for all thunks
      .addCase(getAllFavourites.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllFavourites.fulfilled, (state, action) => {
        state.status = "idle";
        state.favourites = action.payload;
      })
      .addCase(getAllFavourites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Handle add and remove thunks similarly
      .addCase(addToFavorites.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.status = "idle";
        state.favourites.push(action.payload);
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(removeFromFavorites.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.status = "idle";
        state.favourites = state.favourites.filter(
          (fav) => fav.id !== action.payload
        );
      })
      .addCase(removeFromFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default favouritesSlice.reducer;
