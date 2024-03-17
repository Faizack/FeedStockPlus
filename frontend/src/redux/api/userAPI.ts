import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AuthUser,
  LoginResponse,
  MessageResponse,
  SignupCompleteResponse,
} from "../../types/api";
import { UserAccountData } from "../../types/user";
export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:5000/api/v1/user",
    prepareHeaders: (headers) => {
      // Get token from the state
      const token = localStorage.getItem("token");
      if (token) {
        // If token exists, set it in the headers
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signup: builder.mutation<MessageResponse, AuthUser>({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
    }),
    signupFinish: builder.mutation<SignupCompleteResponse, UserAccountData>({
      query: (data) => ({
        url: "/signup/verification",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation<LoginResponse, AuthUser>({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),

    setUserRole: builder.mutation({
      query: (data) => ({
        url: "/role",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

// Accessing the signup, signupFinish, and setUserRole mutations
export const {
  useSignupMutation,
  useSignupFinishMutation,
  useLoginMutation,
  useSetUserRoleMutation,
} = userAPI;
