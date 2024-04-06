import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import {
    NewSupplierResponse
} from "../../types/api";
import { SupplierData } from "../../types/user";

export const supplierAPI = createApi({
  reducerPath: "supplierAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:5000/api/v1/supplier",
    credentials: "include",
    prepareHeaders: (headers) => {
      // Get token from the state
      const token = Cookies.get("token") || localStorage.getItem("token");

      if (token) {
        // If token exists, set it in the headers
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createSupplier: builder.mutation<NewSupplierResponse, SupplierData>({
      query: (data) => ({
        url: "/new",
        method: "POST",
        body: data,
      }),
    }),

  }),
});

// Accessing the signup, signupFinish, and setUserRole mutations
export const {
    useCreateSupplierMutation

} = supplierAPI;
