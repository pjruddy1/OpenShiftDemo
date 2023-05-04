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
    addProduct: (currentSlice, action) => {
      currentSlice.productList.push(action.payload);
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
    deleteProduct: (currentSlice, action) => {
      const filteredProductList = currentSlice.productList.filter(
        (product) => product.id !== action.payload.id
      );
      currentSlice.productList = filteredProductList;
    },
  },
});

export const { setProductList, addProduct, updateProduct, deleteProduct } =
  productSlice.actions;
export const productsReducer = productSlice.reducer;