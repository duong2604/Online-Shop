import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TPattern } from "../schema/pattern";

const patternApi = createApi({
  reducerPath: "pattern",
  tagTypes: ["Pattern"],
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
      pattern: builder.query<TPattern[], void>({
        query: () => {
          return {
            url: "/pattern",
            method: "GET",
          };
        },
        providesTags: ["Pattern"],
      }),
      patternById: builder.query<TPattern, number>({
        query: (id) => {
          return {
            url: `/pattern/${id}`,
            method: "GET",
          };
        },
        providesTags: ["Pattern"],
      }),

      createPattern: builder.mutation<TPattern[], Partial<TPattern>>({
        query: (patternData) => ({
          url: "/pattern",
          method: "POST",
          body: patternData,
        }),
      }),
      updatePattern: builder.mutation<TPattern, Partial<TPattern>>({
        query: (pattern) => {
          return {
            url: `/pattern/${pattern.id}`,
            method: "PUT",
            body: pattern,
          };
        },
        invalidatesTags: ["Pattern"],
      }),
      removePattern: builder.mutation<TPattern, number>({
        query: (id) => {
          return {
            url: `/pattern/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Pattern"],
      }),
    };
  },
});

export const {
  usePatternQuery,
  usePatternByIdQuery,
  useCreatePatternMutation,
  useUpdatePatternMutation,
  useRemovePatternMutation,
} = patternApi;
export const patternReducer = patternApi.reducer;
export default patternApi;
