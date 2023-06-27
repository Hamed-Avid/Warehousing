import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postCategory } from "../../services/Category/postCategoryService";
import { getAllCategories } from "../../services/Category/getAllCategoriesService";

export const getAsyncCategories = createAsyncThunk(
  "categories/getAsyncCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllCategories();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addAsyncCategory = createAsyncThunk(
  "categories/addAsyncCategory",
  async ({ title, description }, { rejectWithValue }) => {
    try {
      const response = await postCategory({
        title,
        description,
        createdAt: new Date().toISOString(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue([], error.message);
    }
  }
);

const initialState = {
  categories: [],
  error: null,
  loading: false,
};

const categoriesSlice = createSlice({
  name: "category",
  initialState,
  extraReducers: {
    [getAsyncCategories.pending]: (state) => {
      return { ...state, categories: [], loading: true, error: null };
    },
    [getAsyncCategories.fulfilled]: (state, { payload }) => {
      return { ...state, categories: payload, loading: false, error: null };
    },
    [getAsyncCategories.rejected]: (state, { payload }) => {
      return { ...state, categories: [], loading: false, error: payload };
    },
    [addAsyncCategory.fulfilled]: (state, { payload }) => {
      state.categories.push(payload);
    },
  },
});

export default categoriesSlice.reducer;
