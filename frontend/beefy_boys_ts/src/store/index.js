import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "store/product/product-slice";
import { cartReducer } from "./cart/cart-slice";

export const store = configureStore({
  reducer: {
    productSlice: productsReducer,
    cartSlice: cartReducer
  },
});
