import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunks for users
export const getAllUsers = createAsyncThunk("admin/getAllUsers", async () => {
  // Replace this with your API call
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return data;
});

export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (userId) => {
    // Replace this with your API call
    await fetch(`https://your-api.com/users/${userId}`, {
      method: "DELETE",
    });
    return userId;
  }
);

// Async thunks for suppliers
export const getAllSuppliers = createAsyncThunk(
  "admin/getAllSuppliers",
  async () => {
    // Replace this with your API call
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    return data;
  }
);

export const deleteSupplier = createAsyncThunk(
  "admin/deleteSupplier",
  async (supplierId) => {
    // Replace this with your API call
    await fetch(`https://your-api.com/suppliers/${supplierId}`, {
      method: "DELETE",
    });
    return supplierId;
  }
);

// Async thunks for orders
export const getAllOrders = createAsyncThunk("admin/getAllOrders", async () => {
  // Replace this with your API call
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return data;
});

export const deleteOrder = createAsyncThunk(
  "admin/deleteOrder",
  async (orderId) => {
    // Replace this with your API call
    await fetch(`https://your-api.com/orders/${orderId}`, {
      method: "DELETE",
    });
    return orderId;
  }
);

// Async thunks for complaints
export const getAllComplaints = createAsyncThunk(
  "admin/getAllComplaints",
  async () => {
    // Replace this with your API call
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    return data;
  }
);

// Async thunk for statistics
export const getStatistics = createAsyncThunk(
  "admin/getStatistics",
  async () => {
    const usersResponse = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );
    const usersData = await usersResponse.json();
    const suppliersResponse = await fetch(
      "https://jsonplaceholder.typicode.com/post"
    );
    const suppliersData = await suppliersResponse.json();

    const venuesResponse = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );
    const venuesData = await venuesResponse.json();

    const usersCount = usersData.length;
    const suppliersCount = suppliersData.length;
    const venuesCount = venuesData.length;

    const photographersCount = suppliersData.filter(
      (supplier) => supplier.type === "Photographer"
    ).length;
    const makeupArtistsCount = suppliersData.filter(
      (supplier) => supplier.type === "Makeup Artist"
    ).length;
    const floristsCount = suppliersData.filter(
      (supplier) => supplier.type === "Florist"
    ).length;

    return {
      usersCount,
      suppliersCount,
      venuesCount,
      photographersCount,
      makeupArtistsCount,
      floristsCount,
    };
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    suppliers: [],
    orders: [],
    complaints: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // User-related cases
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })

      // Supplier-related cases
      .addCase(getAllSuppliers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllSuppliers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.suppliers = action.payload;
      })
      .addCase(getAllSuppliers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteSupplier.fulfilled, (state, action) => {
        state.suppliers = state.suppliers.filter(
          (supplier) => supplier.id !== action.payload
        );
      })

      // Orders-related cases
      .addCase(getAllOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (order) => order.id !== action.payload
        );
      })

      // Complaints-related cases
      .addCase(getAllComplaints.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllComplaints.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.complaints = action.payload;
      })
      .addCase(getAllComplaints.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Statistics-related cases
      .addCase(getStatistics.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getStatistics.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.statistics = action.payload;
      })
      .addCase(getStatistics.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default adminSlice.reducer;
