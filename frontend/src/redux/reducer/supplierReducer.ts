import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialSupplierState } from "../../types/types";
import { SupplierData } from "../../types/user";

// Define initial state
const supplierInit: InitialSupplierState = {
  supplier: null,
  isLoading: false,
};

export const supplierReducer = createSlice({
  name: "SupplierReducer",
  initialState: supplierInit,
  reducers: {
    // Action to set user information and token
    setSupplier: (state, action: PayloadAction<{ data: SupplierData }>) => {
      state.supplier = action.payload.data;
      state.isLoading = false;
    },
    // Action to reset user information and token
    resetSupplier: (state) => {
      state.supplier = null;
      state.isLoading = false;
    },
  },
});

// Export actions
export const { setSupplier, resetSupplier } = supplierReducer.actions;
