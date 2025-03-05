import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";
import { logout } from "../features/auth/authSlice";

// Define userApiSlice with injected endpoints
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`, // Corrected the template literal
        method: "POST",
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`, // Corrected the template literal
        method: "POST",
        body: data,
      }),
    }),
    logout:builder.mutation({
      query:()=>({
        url: '${USERS_URL}/logout',
        method:"POST",

      }),
    }),
  }),
});

// Export hooks for login and register mutations
export const { useLoginMutation, useRegisterMutation,useLogoutMutation } = userApiSlice;
