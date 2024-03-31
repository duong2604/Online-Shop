import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TSale } from "../schema/sale";

const saleApi = createApi({
  reducerPath: "sale",
  tagTypes: ["Sale"],
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
      sale: builder.query<TSale[], void>({
        query: () => {
          return {
            url: "/sale",
            method: "GET",
          };
        },
        providesTags: ["Sale"],
      }),
      saleById: builder.query<TSale, number>({
        query: (id) => {
          return {
            url: `/sale/${id}`,
            method: "GET",
          };
        },
        providesTags: ["Sale"],
      }),

      createSale: builder.mutation<TSale[], Partial<TSale>>({
        query: (saleData) => ({
          url: "/sale",
          method: "POST",
          body: saleData,
        }),
      }),
      updateSale: builder.mutation<TSale, Partial<TSale>>({
        query: (sale) => {
          return {
            url: `/sale/${sale.id}`,
            method: "PUT",
            body: sale,
          };
        },
        invalidatesTags: ["Sale"],
      }),
      removeSale: builder.mutation<TSale, number>({
        query: (id) => {
          return {
            url: `/sale/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Sale"],
      }),
    };
  },
});

export const {
  useSaleQuery,
  useSaleByIdQuery,
  useCreateSaleMutation,
  useUpdateSaleMutation,
  useRemoveSaleMutation,
} = saleApi;
export const saleReducer = saleApi.reducer;
export default saleApi;
