import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TColor } from "../schema/color";

const colorApi = createApi({
  reducerPath: "color",
  tagTypes: ["Color"],
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
      color: builder.query<TColor[], void>({
        query: () => {
          return {
            url: "/color",
            method: "GET",
          };
        },
        providesTags: ["Color"],
      }),
      colorById: builder.query<TColor, number>({
        query: (id) => {
          return {
            url: `/color/${id}`,
            method: "GET",
          };
        },
        providesTags: ["Color"],
      }),

      createColor: builder.mutation<TColor[], Partial<TColor>>({
        query: (colorData) => ({
          url: "/color",
          method: "POST",
          body: colorData,
        }),
      }),
      updateColor: builder.mutation<TColor, Partial<TColor>>({
        query: (color) => {
          return {
            url: `/color/${color.id}`,
            method: "PUT",
            body: color,
          };
        },
        invalidatesTags: ["Color"],
      }),
      removeColor: builder.mutation<TColor, number>({
        query: (id) => {
          return {
            url: `/color/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Color"],
      }),
    };
  },
});

export const {
  useColorQuery,
  useColorByIdQuery,
  useCreateColorMutation,
  useUpdateColorMutation,
  useRemoveColorMutation,
} = colorApi;
export const colorReducer = colorApi.reducer;
export default colorApi;
