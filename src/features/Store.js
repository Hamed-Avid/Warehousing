import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./Category/categoriesSlice";
import productsReducer from "./Product/productsSlice";

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    products: productsReducer,
  },
});
