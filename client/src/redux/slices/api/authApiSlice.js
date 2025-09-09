import { apiSlice } from "../apiSlice";

const AUTH_URL = "/user";
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkSession: builder.query({
      query: () => ({
        url: `${AUTH_URL}/check-session`,
        method: "GET",
        credentials: "include",
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCheckSessionQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} = authApiSlice;
