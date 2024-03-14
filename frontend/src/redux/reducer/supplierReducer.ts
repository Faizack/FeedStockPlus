import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialUserState } from "../../types/types";
import { UserAccountData } from "../../types/user";

// Define initial state
const supplierInit: InitialUserState = {
  user: null,
  token: null,
  isLoading: false,
};

export const userReducer = createSlice({
  name: "SupplierReducer",
  initialState: supplierInit,
  reducers: {
    // Action to set user information and token
    setUserAndToken: (state, action: PayloadAction<{ user: UserAccountData, token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoading = false;
    },
    // Action to reset user information and token
    resetUserAndToken: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
    },
  },
});

// Export actions
export const { setUserAndToken, resetUserAndToken } = userReducer.actions;
