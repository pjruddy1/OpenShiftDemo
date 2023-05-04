import { createSlice } from "@reduxjs/toolkit";

export const purchaseOrderSlice = createSlice({
  name: "purchaseOrderSlice",
  initialState: {
    purchaseOrderList: [],
  },
  reducers: {
    setPurchaseOrderList: (currentSlice, action) => {
      currentSlice.purchaseOrderList = action.payload;
    },
    updatePurchaseOrder: (currentSlice, action) => {
      const indexToUpdate = currentSlice.purchaseOrderList.findIndex(
        (purchaseOrder) => purchaseOrder.id === action.payload.id
      );
      const updatedPurchaseOrderList = [...currentSlice.purchaseOrderList]; // create a new copy of the purchaseorder list array
      updatedPurchaseOrderList[indexToUpdate] = action.payload; // update the specific purchase order in the copied array
    
      // return a new copy of the currentSlice object with the updated purchaseorderlist array
      return {
        ...currentSlice,
        purchaseOrderList: updatedPurchaseOrderList
      };
    }
  },
});

export const { setPurchaseOrderList, updatePurchaseOrder} =
purchaseOrderSlice.actions;
export const purchaseOrderReducer = purchaseOrderSlice.reducer;