import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TSize } from "../schema/kich_co";

const sizeApi = createApi({
  reducerPath: "size",
  tagTypes: ["Size"],
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
      size: builder.query<TSize[], void>({
        query: () => {
          return {
            url: "/size",
            method: "GET",
          };
        },
        providesTags: ["Size"],
      }),
      sizeById: builder.query<TSize, number>({
        query: (id) => {
          return {
            url: `/size/${id}`,
            method: "GET",
          };
        },
        providesTags: ["Size"],
      }),

      createSize: builder.mutation<TSize[], Partial<TSize>>({
        query: (sizeData) => ({
          url: "/size",
          method: "POST",
          body: sizeData,
        }),
      }),
      updateSize: builder.mutation<TSize, Partial<TSize>>({
        query: (size) => {
          return {
            url: `/size/${size.id}`,
            method: "PUT",
            body: size,
          };
        },
        invalidatesTags: ["Size"],
      }),
      removeSize: builder.mutation<TSize, number>({
        query: (id) => {
          return {
            url: `/size/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Size"],
      }),
    };
  },
});

export const {
  useSizeQuery,
  useSizeByIdQuery,
  useCreateSizeMutation,
  useUpdateSizeMutation,
  useRemoveSizeMutation,
} = sizeApi;
export const sizeReducer = sizeApi.reducer;
export default sizeApi;
