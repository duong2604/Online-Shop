import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TMaterial } from "../schema/material";

const materialApi = createApi({
  reducerPath: "material",
  tagTypes: ["Material"],
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
      material: builder.query<TMaterial[], void>({
        query: () => {
          return {
            url: "/material",
            method: "GET",
          };
        },
        providesTags: ["Material"],
      }),
      materialById: builder.query<TMaterial, number>({
        query: (id) => {
          return {
            url: `/material/${id}`,
            method: "GET",
          };
        },
        providesTags: ["Material"],
      }),

      createMaterial: builder.mutation<TMaterial[], Partial<TMaterial>>({
        query: (materialData) => ({
          url: "/material",
          method: "POST",
          body: materialData,
        }),
      }),
      updateMaterial: builder.mutation<TMaterial, Partial<TMaterial>>({
        query: (material) => {
          return {
            url: `/material/${material.id}`,
            method: "PUT",
            body: material,
          };
        },
        invalidatesTags: ["Material"],
      }),
      removeMaterial: builder.mutation<TMaterial, number>({
        query: (id) => {
          return {
            url: `/material/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Material"],
      }),
    };
  },
});

export const {
  useMaterialQuery,
  useMaterialByIdQuery,
  useCreateMaterialMutation,
  useUpdateMaterialMutation,
  useRemoveMaterialMutation,
} = materialApi;
export const materialReducer = materialApi.reducer;
export default materialApi;
