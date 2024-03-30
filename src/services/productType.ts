import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TProductType } from "../schema/productType";

const productTypeApi = createApi({
  reducerPath: "productType",
  tagTypes: ["ProductType"],
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
      productType: builder.query<TProductType[], void>({
        query: () => {
          return {
            url: "/productType",
            method: "GET",
          };
        },
        providesTags: ["ProductType"],
      }),
      productTypeById: builder.query<TProductType, number>({
        query: (id) => {
          return {
            url: `/productType/${id}`,
            method: "GET",
          };
        },
        providesTags: ["ProductType"],
      }),

      createProductType: builder.mutation<
        TProductType[],
        Partial<TProductType>
      >({
        query: (productTypeData) => ({
          url: "/productType",
          method: "POST",
          body: productTypeData,
        }),
      }),
      updateProductType: builder.mutation<TProductType, Partial<TProductType>>({
        query: (productType) => {
          return {
            url: `/productType/${productType.id}`,
            method: "PUT",
            body: productType,
          };
        },
        invalidatesTags: ["ProductType"],
      }),
      removeProductType: builder.mutation<TProductType, number>({
        query: (id) => {
          return {
            url: `/productType/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["ProductType"],
      }),
    };
  },
});

export const {
  useProductTypeQuery,
  useProductTypeByIdQuery,
  useCreateProductTypeMutation,
  useUpdateProductTypeMutation,
  useRemoveProductTypeMutation,
} = productTypeApi;
export const productTypeReducer = productTypeApi.reducer;
export default productTypeApi;
