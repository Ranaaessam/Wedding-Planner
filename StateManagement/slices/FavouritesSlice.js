import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../constants";
import storage from "../../Storage/storage";

// Get all favorites
export const getAllFavourites = createAsyncThunk(
  "favourites/fetchAll",
  async () => {
    const accountId = await storage.load({ key: "accountId" });

    try {
      const response = await axios.get(
        `${API_URL}/account/favourites?accountId=${accountId}`
      );
      console.log(response.data.favourites);
      return response.data.favourites;
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
        `${API_URL}/account/favourites?accountId=${accountId}`,
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
    const accountId = await storage.load({ key: "accountId" });
    console.log("favouriteId", favouriteId, "accountId", accountId);
    try {
      const response = await axios.delete(
        `${API_URL}/account/favourites?itemId=${favouriteId}&accountId=${accountId}`
      );

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
    favourites: [],
    filteredFavourites: [],
    status: "idle",
    error: null,
  },
  reducers: {
    filterFavouritesByType: (state, action) => {
      state.filteredFavourites = state.favourites.filter(
        (favourite) => favourite.type === action.payload.category
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle pending, fulfilled, and rejected states for all thunks
      .addCase(getAllFavourites.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllFavourites.fulfilled, (state, action) => {
        state.status = "idle";
        state.favourites = action.payload;
        state.filteredFavourites = action.payload; // Update filteredFavourites as well
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
        state.filteredFavourites.push(action.payload); // Update filteredFavourites as well
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
        state.filteredFavourites = state.filteredFavourites.filter(
          (fav) => fav.id !== action.payload
        ); // Update filteredFavourites as well
      })
      .addCase(removeFromFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { filterFavouritesByType } = favouritesSlice.actions;

export default favouritesSlice.reducer;
