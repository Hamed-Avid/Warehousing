import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteProduct } from "../../services/Product/deleteProductService";
import { getAllProducts } from "../../services/Product/getAllProductsService";
import { postProduct } from "../../services/Product/postProductService";
import { putProduct } from "../../services/Product/putProductService";

export const getAsyncProducts = createAsyncThunk(
  "products/getAsyncProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllProducts();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addAsyncProduct = createAsyncThunk(
  "products/addAsyncProduct",
  async ({ title, quantity, categoryId }, { rejectWithValue }) => {
    try {
      const response = await postProduct({
        title,
        quantity: parseInt(quantity),
        categoryId: parseInt(categoryId),
        createAt: new Date().toISOString(),
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue([], error.message);
    }
  }
);

export const deleteAsyncProduct = createAsyncThunk(
  "products/deleteAsyncProduct",
  async ({ id }, { rejectWithValue }) => {
    try {
      await deleteProduct(id);
      return { id };
    } catch (error) {
      return rejectWithValue([], error.message);
    }
  }
);

export const updateAsyncProduct = createAsyncThunk(
  "products/updateAsyncProduct",
  async (
    { id, title, quantity, categoryId, createAt },
    { rejectWithValue }
  ) => {
    try {
      const response = await putProduct(id, {
        title,
        quantity: parseInt(quantity),
        categoryId: parseInt(categoryId),
        createAt: new Date().toISOString(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue([], error.message);
    }
  }
);

const initialState = {
  products: [],
  error: null,
  loading: false,
};

const categoriesSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: {
    [getAsyncProducts.pending]: (state) => {
      return { ...state, products: [], loading: true, error: null };
    },
    [getAsyncProducts.fulfilled]: (state, { payload }) => {
      return { ...state, products: payload, loading: false, error: null };
    },
    [getAsyncProducts.rejected]: (state, { payload }) => {
      return { ...state, products: [], loading: false, error: payload };
    },
    [addAsyncProduct.fulfilled]: (state, { payload }) => {
      state.products.push(payload);
    },
    [deleteAsyncProduct.fulfilled]: (state, { payload }) => {
      state.products = state.products.filter(
        (product) => product.id !== payload.id
      );
    },
    [updateAsyncProduct.fulfilled]: (state, { payload }) => {
      const index = state.products.findIndex(
        (product) => product.id === payload.id
      );
      state.products[index] = payload;
    },
  },
});

export default categoriesSlice.reducer;
