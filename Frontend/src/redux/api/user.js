import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";
import { logout } from "../features/auth/authSlice";

// Define userApiSlice with injected endpoints
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`, // ✅ Fixed template literal
        method: "POST",
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`, // ✅ Fixed template literal
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`, // ✅ Fixed template literal
        method: "POST",
      }),
    }),

    profile: builder.mutation({ // ✅ Fixed space issue
      query: (data) => ({
        url: `${USERS_URL}/profile`, // ✅ Fixed template literal
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

// Exporting hooks for the mutations
export const { 
  useLoginMutation, 
  useRegisterMutation, 
  useLogoutMutation, 
  useProfileMutation 
} = userApiSlice;
