import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TUser } from "../schema/user";

const userApi = createApi({
  reducerPath: "user",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",

    // baseUrl: "http://localhost:8080/api",
    // prepareHeaders: (headers) => {
    //   const token = localStorage.getItem("token");
    //   if (token) {
    //     headers.set("Authorization", "Bearer " + token);
    //   }
    //   return headers;
    // },
  }),
  endpoints(builder) {
    return {
      user: builder.query<TUser[], void>({
        query: () => {
          return {
            url: "/user",
            method: "GET",
          };
        },
        providesTags: ["User"],
      }),
      userById: builder.query<TUser, number>({
        query: (id) => {
          return {
            url: `/user/${id}`,
            method: "GET",
          };
        },
        providesTags: ["User"],
      }),

      createUser: builder.mutation<TUser[], Partial<TUser>>({
        query: (userData) => ({
          url: "/user",
          method: "POST",
          body: userData,
        }),
      }),
      updateUser: builder.mutation<TUser, Partial<TUser>>({
        query: (user) => {
          return {
            url: `/user/${user.id}`,
            method: "PUT",
            body: user,
          };
        },
        invalidatesTags: ["User"],
      }),
      removeUser: builder.mutation<TUser, number>({
        query: (id) => {
          return {
            url: `/user/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["User"],
      }),
    };
  },
});

export const {
  useUserQuery,
  useUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useRemoveUserMutation,
} = userApi;
export const userReducer = userApi.reducer;
export default userApi;
