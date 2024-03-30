import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TStrapMaterial } from "../schema/strapMaterial";

const strapMaterialApi = createApi({
  reducerPath: "strapMaterial",
  tagTypes: ["StrapMaterial"],
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
      strapMaterial: builder.query<TStrapMaterial[], void>({
        query: () => {
          return {
            url: "/strapMaterial",
            method: "GET",
          };
        },
        providesTags: ["StrapMaterial"],
      }),
      strapMaterialById: builder.query<TStrapMaterial, number>({
        query: (id) => {
          return {
            url: `/strapMaterial/${id}`,
            method: "GET",
          };
        },
        providesTags: ["StrapMaterial"],
      }),

      createStrapMaterial: builder.mutation<
        TStrapMaterial[],
        Partial<TStrapMaterial>
      >({
        query: (strapMaterialData) => ({
          url: "/strapMaterial",
          method: "POST",
          body: strapMaterialData,
        }),
      }),
      updateStrapMaterial: builder.mutation<
        TStrapMaterial,
        Partial<TStrapMaterial>
      >({
        query: (strapMaterial) => {
          return {
            url: `/strapMaterial/${strapMaterial.id}`,
            method: "PUT",
            body: strapMaterial,
          };
        },
        invalidatesTags: ["StrapMaterial"],
      }),
      removeStrapMaterial: builder.mutation<TStrapMaterial, number>({
        query: (id) => {
          return {
            url: `/strapMaterial/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["StrapMaterial"],
      }),
    };
  },
});

export const {
  useStrapMaterialQuery,
  useStrapMaterialByIdQuery,
  useCreateStrapMaterialMutation,
  useUpdateStrapMaterialMutation,
  useRemoveStrapMaterialMutation,
} = strapMaterialApi;
export const strapMaterialReducer = strapMaterialApi.reducer;
export default strapMaterialApi;
