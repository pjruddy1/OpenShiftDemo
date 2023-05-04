import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "store/product/productsReducer";
import { cartsReducer } from "./cart/cartReducer";
import { purchaseOrderReducer } from "./purchaseOrder/purchaseOrderReducer";

export const store = configureStore({
  reducer: {
    productSlice: productsReducer,
    purchaseOrderSlice: purchaseOrderReducer,
    cartSlice: cartsReducer,
  },
});
