import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api/productApi";

export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  const response = await api.fetchProducts();
  return response.data.products;
});

export const addProduct = createAsyncThunk("products/add", async (product) => {
  const response = await api.createProduct(product);
  return response.data;
});

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, product }) => {
    const response = await api.updateProduct(id, product);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk("products/delete", async (id) => {
  await api.deleteProduct(id);
  return id;
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
