import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import storage from "../../Storage/storage";
import API_URL from "../../constants";

// Get all cart items
export const getAllCartItems = createAsyncThunk(
  "cart/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const userId = await storage.load({ key: "userId" });
      const response = await axios.get(
        `${API_URL}/account/profile?userId=${userId}`
      );

      return response.data.cart;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add an item to the cart
export const addToCart = createAsyncThunk(
  "cart/add",
  async ({ cartItem, accountId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/account/cart?accountId=${accountId}`,
        cartItem,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to add item to cart");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Remove an item from the cart
export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async (cartItemId, { rejectWithValue }) => {
    try {
      const accountId = await storage.load({ key: "accountId" });
      const response = await axios.delete(
        `${API_URL}/account/cart?accountId=${accountId}&itemId=${cartItemId}`
      );

      if (response.status !== 200) {
        throw new Error("Failed to remove item from cart");
      }

      return cartItemId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const clearCart = createAsyncThunk(
  "cart/clear",
  async (_, { rejectWithValue }) => {
    try {
      const accountId = await storage.load({ key: "accountId" });
      const response = await axios.post(
        `${API_URL}/account/cart/clear?accountId=${accountId}`
      );
      if (response.status !== 200) {
        throw new Error("Failed to clear cart");
      } else {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//Create order
export const createOrder = createAsyncThunk(
  "order/create",
  async (order, { rejectWithValue }) => {
    try {
      const token = await storage.load({ key: "token" });

      const response = await axios.post(`${API_URL}/orders/create`, order, {
        headers: { "x-auth-token": `${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle get all cart items
      .addCase(getAllCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCartItems.fulfilled, (state, action) => {
        state.status = "idle";
        state.cartItems = action.payload;
      })
      .addCase(getAllCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Handle add to cart
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "idle";
        state.cartItems.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Handle remove from cart
      .addCase(removeFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = "idle";
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Handle clear cart
      .addCase(clearCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.status = "idle";
        state.cartItems = [];
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Handle create order
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "idle";
        state.cartItems = [];
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
