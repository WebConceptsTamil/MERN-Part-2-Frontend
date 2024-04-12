import { apiSlice } from "./apiSlice";
const USER_ENDPOINT = "/api/users";

export const userAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginAPI: builder.mutation({
      query: (data) => ({
        url: `${USER_ENDPOINT}/login`,
        method: "POST",
        body: data,
      }),
    }),
    logoutAPI: builder.mutation({
      query: (data) => ({
        url: `${USER_ENDPOINT}/logout`,
        method: "POST",
      }),
    }),
    registerAPI: builder.mutation({
      query: (data) => ({
        url: `${USER_ENDPOINT}`,
        method: "POST",
        body: data,
      }),
    }),
    updateProfileAPI: builder.mutation({
      query: (data) => ({
        url: `${USER_ENDPOINT}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginAPIMutation,
  useLogoutAPIMutation,
  useRegisterAPIMutation,
  useUpdateProfileAPIMutation,
} = userAPISlice;
