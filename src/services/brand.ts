import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TBrand } from "../schema/brand";

const brandApi = createApi({
  reducerPath: "brand",
  tagTypes: ["Brand"],
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
      brand: builder.query<TBrand[], void>({
        query: () => {
          return {
            url: "/brand",
            method: "GET",
          };
        },
        providesTags: ["Brand"],
      }),
      brandById: builder.query<TBrand, number>({
        query: (id) => {
          return {
            url: `/brand/${id}`,
            method: "GET",
          };
        },
        providesTags: ["Brand"],
      }),

      createBrand: builder.mutation<TBrand[], Partial<TBrand>>({
        query: (brandData) => ({
          url: "/brand",
          method: "POST",
          body: brandData,
        }),
      }),
      updateBrand: builder.mutation<TBrand, Partial<TBrand>>({
        query: (brand) => {
          return {
            url: `/brand/${brand.id}`,
            method: "PUT",
            body: brand,
          };
        },
        invalidatesTags: ["Brand"],
      }),
      removeBrand: builder.mutation<TBrand, number>({
        query: (id) => {
          return {
            url: `/brand/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Brand"],
      }),
    };
  },
});

export const {
  useBrandQuery,
  useBrandByIdQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useRemoveBrandMutation,
} = brandApi;
export const brandReducer = brandApi.reducer;
export default brandApi;
