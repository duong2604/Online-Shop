import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TBill } from "../schema/bill";

const billApi = createApi({
  reducerPath: "bill",
  tagTypes: ["Bill"],
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
      bill: builder.query<TBill[], void>({
        query: () => {
          return {
            url: "/bill",
            method: "GET",
          };
        },
        providesTags: ["Bill"],
      }),
      billById: builder.query<TBill, number>({
        query: (id) => {
          return {
            url: `/bill/${id}`,
            method: "GET",
          };
        },
        providesTags: ["Bill"],
      }),

      createBill: builder.mutation<TBill[], Partial<TBill>>({
        query: (billData) => ({
          url: "/bill",
          method: "POST",
          body: billData,
        }),
      }),
      updateBill: builder.mutation<TBill, Partial<TBill>>({
        query: (bill) => {
          return {
            url: `/bill/${bill.id}`,
            method: "PUT",
            body: bill,
          };
        },
        invalidatesTags: ["Bill"],
      }),
      removeBill: builder.mutation<TBill, number>({
        query: (id) => {
          return {
            url: `/bill/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Bill"],
      }),
    };
  },
});

export const {
  useBillQuery,
  useBillByIdQuery,
  useCreateBillMutation,
  useUpdateBillMutation,
  useRemoveBillMutation,
} = billApi;
export const billReducer = billApi.reducer;
export default billApi;
