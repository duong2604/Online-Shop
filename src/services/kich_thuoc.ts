import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TSizee } from "../schema/kich_thuoc";

const sizeeApi = createApi({
  reducerPath: "sizee",
  tagTypes: ["Sizee"],
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
      sizee: builder.query<TSizee[], void>({
        query: () => {
          return {
            url: "/sizee",
            method: "GET",
          };
        },
        providesTags: ["Sizee"],
      }),
      sizeeById: builder.query<TSizee, number>({
        query: (id) => {
          return {
            url: `/sizee/${id}`,
            method: "GET",
          };
        },
        providesTags: ["Sizee"],
      }),

      createSizee: builder.mutation<TSizee[], Partial<TSizee>>({
        query: (sizeeData) => ({
          url: "/sizee",
          method: "POST",
          body: sizeeData,
        }),
      }),
      updateSizee: builder.mutation<TSizee, Partial<TSizee>>({
        query: (sizee) => {
          return {
            url: `/sizee/${sizee.id}`,
            method: "PUT",
            body: sizee,
          };
        },
        invalidatesTags: ["Sizee"],
      }),
      removeSizee: builder.mutation<TSizee, number>({
        query: (id) => {
          return {
            url: `/sizee/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Sizee"],
      }),
    };
  },
});

export const {
  useSizeeQuery,
  useSizeeByIdQuery,
  useCreateSizeeMutation,
  useUpdateSizeeMutation,
  useRemoveSizeeMutation,
} = sizeeApi;
export const sizeeReducer = sizeeApi.reducer;
export default sizeeApi;
