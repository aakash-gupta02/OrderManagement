import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://order-management-dxob.onrender.com";

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/order/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const fetchOrders = createAsyncThunk("orders/fetchAll", async () => {
  const res = await axios.get(`${BASE_URL}/order`);
  return res.data.data;
});

export const fetchOrderById = createAsyncThunk(
  "orders/fetchById",
  async (id) => {
    const res = await axios.get(`${BASE_URL}/order/${id}`);
    return res.data;
  }
);

export const deleteOrder = createAsyncThunk("orders/delete", async (id) => {
  await axios.delete(`${BASE_URL}/order/delete/${id}`);
  return id;
});

export const updateOrderQuantity = createAsyncThunk(
  "orders/updateQuantity",
  async ({ id, quantity }) => {
    const res = await axios.put(`${BASE_URL}/order/update/${id}`, { quantity });
    return res.data;
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    order: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all orders
      .addCase(fetchOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      })
      // Fetch order by id
      .addCase(fetchOrderById.pending, (state) => {
      state.loading = true;
      state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      })
      // Create order
      .addCase(createOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      })
      // Delete order
      .addCase(deleteOrder.fulfilled, (state, action) => {
      state.orders = state.orders.filter(
        (order) => order._id !== action.payload
      );
      })
      // Update order quantity
      .addCase(updateOrderQuantity.pending, (state) => {
      state.loading = true;
      state.error = null;
      })
      .addCase(updateOrderQuantity.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = state.orders.map((order) =>
        order._id === action.payload._id ? { ...order, ...action.payload } : order
      );
      if (state.order && state.order._id === action.payload._id) {
        state.order = { ...state.order, ...action.payload };
      }
      })
      .addCase(updateOrderQuantity.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
