import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialUserState } from "../../types/types";
import { UserAccountData } from "../../types/user";

// Define initial state
const userInit: InitialUserState = {
  user: null,
  isLoading: false,
};

export const userReducer = createSlice({ 
  name: "userReducer",
  initialState: userInit,
  reducers: {
    // Action to set user information and token
    setUser: (state, action: PayloadAction<{ user: UserAccountData }>) => {
      state.user = action.payload.user;
      state.isLoading = false;
    },
    // Action to reset user information and token
    resetUser: (state) => {
      state.user = null;
      state.isLoading = false;
    },
  },
});

// Export actions
export const { setUser, resetUser } = userReducer.actions;
