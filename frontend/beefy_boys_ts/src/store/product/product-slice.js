import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    productList: [],
  },
  reducers: {
    setProductList: (currentSlice, action) => {
      currentSlice.productList = action.payload;
    },
    updateProduct: (currentSlice, action) => {
      const indexToUpdate = currentSlice.productList.findIndex(
        (product) => product.shirtId === action.payload.shirtId
      );
      const updatedProductList = [...currentSlice.productList]; // create a new copy of the productList array
      updatedProductList[indexToUpdate] = action.payload; // update the specific product in the copied array
    
      // return a new copy of the currentSlice object with the updated productList array
      return {
        ...currentSlice,
        productList: updatedProductList
      };
    },
  },
});

export const { setProductList, updateProduct} =
  productSlice.actions;
export const productsReducer = productSlice.reducer;