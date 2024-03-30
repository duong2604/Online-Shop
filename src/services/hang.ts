import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { THang } from "../schema/hang";

const hangApi = createApi({
  reducerPath: "hang",
  tagTypes: ["Hang"],
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
      hang: builder.query<THang[], void>({
        query: () => {
          return {
            url: "/hang",
            method: "GET",
          };
        },
        providesTags: ["Hang"],
      }),
      hangById: builder.query<THang, number>({
        query: (id) => {
          return {
            url: `/hang/${id}`,
            method: "GET",
          };
        },
        providesTags: ["Hang"],
      }),

      createHang: builder.mutation<THang[], Partial<THang>>({
        query: (hangData) => ({
          url: "/hang",
          method: "POST",
          body: hangData,
        }),
      }),
      updateHang: builder.mutation<THang, Partial<THang>>({
        query: (hang) => {
          return {
            url: `/hang/${hang.id}`,
            method: "PUT",
            body: hang,
          };
        },
        invalidatesTags: ["Hang"],
      }),
      removeHang: builder.mutation<THang, number>({
        query: (id) => {
          return {
            url: `/hang/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Hang"],
      }),
    };
  },
});

export const {
  useHangQuery,
  useHangByIdQuery,
  useCreateHangMutation,
  useUpdateHangMutation,
  useRemoveHangMutation,
} = hangApi;
export const hangReducer = hangApi.reducer;
export default hangApi;
