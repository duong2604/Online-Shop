import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TCategory } from "../schema/category";

const categoryApi = createApi({
  reducerPath: "category",
  tagTypes: ["Category"],
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
      category: builder.query<TCategory[], void>({
        query: () => {
          return {
            url: "/category",
            method: "GET",
          };
        },
        providesTags: ["Category"],
      }),
      categoryById: builder.query<TCategory, number>({
        query: (id) => {
          return {
            url: `/category/${id}`,
            method: "GET",
          };
        },
        providesTags: ["Category"],
      }),

      createCategory: builder.mutation<TCategory[], Partial<TCategory>>({
        query: (categoryData) => ({
          url: "/category",
          method: "POST",
          body: categoryData,
        }),
      }),
      updateCategory: builder.mutation<TCategory, Partial<TCategory>>({
        query: (category) => {
          return {
            url: `/category/${category.id}`,
            method: "PUT",
            body: category,
          };
        },
        invalidatesTags: ["Category"],
      }),
      removeCategory: builder.mutation<TCategory, number>({
        query: (id) => {
          return {
            url: `/category/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Category"],
      }),
    };
  },
});

export const {
  useCategoryQuery,
  useCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useRemoveCategoryMutation,
} = categoryApi;
export const categoryReducer = categoryApi.reducer;
export default categoryApi;
