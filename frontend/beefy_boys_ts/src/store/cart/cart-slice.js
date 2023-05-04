import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cartId: null,
    cartList: [],
    total: 0,
  },
  reducers: {
    setCartId: (state, action) => {
      state.cartId = action.payload.cartId;
    },
    setCartList: (state, action) => {
      state.cartList = action.payload;
    },
    addToCart: (state, action) => {
      const product = action.payload;
      const productIndex = state.cartList.findIndex(
        (item) => item.id === product.id
      );
    
      // Ensure product.price is a number
      const productPrice = parseFloat(product.shirtPrice);
      if (isNaN(productPrice)) {
        console.error(`Invalid price for product ${product.id}: ${product.shirtPrice}`);
        productPrice = 0; // Set product price to 0 if it's not a valid number
      }
    
      if (productIndex >= 0) {
        state.cartList[productIndex].count += 1;
      } else {
        state.cartList.push({ ...product, count: 1 });
      }
      state.total = state.cartList.reduce((total, product) => {
        return total + parseFloat(product.shirtPrice) * product.count;
      }, 0);
    },
    removeFromCart: (state, action) => {
      const product = action.payload;
      const productIndex = state.cartList.findIndex(
        (item) => item.id === product.id
      );
    
      if (productIndex >= 0) {
        const product = state.cartList[productIndex];
    
        // Ensure product.price is a number
        const productPrice = parseFloat(product.shirtPrice);
        if (isNaN(productPrice)) {
          console.error(`Invalid price for product ${product.id}: ${product.shirtPrice}`);
          productPrice = 0; // Set product price to 0 if it's not a valid number
        }
    
        state.total -= productPrice;
        product.count -= 1;
    
        if (product.count === 0) {
          state.cartList.splice(productIndex, 1);
        }
    
        // Recalculate total
        state.total = state.cartList.reduce((total, product) => {
          return total + parseFloat(product.shirtPrice) * product.count;
        }, 0);
      }
    },
    
  },
});

export const { setCartId, setCartList, addToCart, removeFromCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
