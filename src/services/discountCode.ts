import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TDiscountCode } from "../schema/discountCode";

const discountCodeApi = createApi({
  reducerPath: "discountCode",
  tagTypes: ["DiscountCode"],
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
      discountCode: builder.query<TDiscountCode[], void>({
        query: () => {
          return {
            url: "/discountCode",
            method: "GET",
          };
        },
        providesTags: ["DiscountCode"],
      }),
      discountCodeById: builder.query<TDiscountCode, number>({
        query: (id) => {
          return {
            url: `/discountCode/${id}`,
            method: "GET",
          };
        },
        providesTags: ["DiscountCode"],
      }),

      createDiscountCode: builder.mutation<
        TDiscountCode[],
        Partial<TDiscountCode>
      >({
        query: (discountCodeData) => ({
          url: "/discountCode",
          method: "POST",
          body: discountCodeData,
        }),
      }),
      updateDiscountCode: builder.mutation<
        TDiscountCode,
        Partial<TDiscountCode>
      >({
        query: (discountCode) => {
          return {
            url: `/discountCode/${discountCode.id}`,
            method: "PUT",
            body: discountCode,
          };
        },
        invalidatesTags: ["DiscountCode"],
      }),
      removeDiscountCode: builder.mutation<TDiscountCode, number>({
        query: (id) => {
          return {
            url: `/discountCode/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["DiscountCode"],
      }),
    };
  },
});

export const {
  useDiscountCodeQuery,
  useDiscountCodeByIdQuery,
  useCreateDiscountCodeMutation,
  useUpdateDiscountCodeMutation,
  useRemoveDiscountCodeMutation,
} = discountCodeApi;
export const discountCodeReducer = discountCodeApi.reducer;
export default discountCodeApi;
