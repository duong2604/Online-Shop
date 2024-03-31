import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TProduct } from "../schema/product";

const productApi = createApi({
  reducerPath: "product",
  tagTypes: ["Product"],
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
      product: builder.query<TProduct[], void>({
        query: () => {
          return {
            url: "/product",
            method: "GET",
          };
        },
        providesTags: ["Product"],
      }),
      productById: builder.query<TProduct, number>({
        query: (id) => {
          return {
            url: `/product/${id}`,
            method: "GET",
          };
        },
        providesTags: ["Product"],
      }),

      createProduct: builder.mutation<TProduct[], Partial<TProduct>>({
        query: (productData) => ({
          url: "/product",
          method: "POST",
          body: productData,
        }),
      }),
      updateProduct: builder.mutation<TProduct, Partial<TProduct>>({
        query: (product) => {
          return {
            url: `/product/${product.id}`,
            method: "PUT",
            body: product,
          };
        },
        invalidatesTags: ["Product"],
      }),
      removeProduct: builder.mutation<TProduct, number>({
        query: (id) => {
          return {
            url: `/product/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Product"],
      }),
    };
  },
});

export const {
  useProductQuery,
  useProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useRemoveProductMutation,
} = productApi;
export const productReducer = productApi.reducer;
export default productApi;
