import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TCompartment } from "../schema/compartment";

const compartmentApi = createApi({
  reducerPath: "compartment",
  tagTypes: ["Compartment"],
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
      compartment: builder.query<TCompartment[], void>({
        query: () => {
          return {
            url: "/compartment",
            method: "GET",
          };
        },
        providesTags: ["Compartment"],
      }),
      compartmentById: builder.query<TCompartment, number>({
        query: (id) => {
          return {
            url: `/compartment/${id}`,
            method: "GET",
          };
        },
        providesTags: ["Compartment"],
      }),

      createCompartment: builder.mutation<
        TCompartment[],
        Partial<TCompartment>
      >({
        query: (compartmentData) => ({
          url: "/compartment",
          method: "POST",
          body: compartmentData,
        }),
      }),
      updateCompartment: builder.mutation<TCompartment, Partial<TCompartment>>({
        query: (compartment) => {
          return {
            url: `/compartment/${compartment.id}`,
            method: "PUT",
            body: compartment,
          };
        },
        invalidatesTags: ["Compartment"],
      }),
      removeCompartment: builder.mutation<TCompartment, number>({
        query: (id) => {
          return {
            url: `/compartment/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Compartment"],
      }),
    };
  },
});

export const {
  useCompartmentQuery,
  useCompartmentByIdQuery,
  useCreateCompartmentMutation,
  useUpdateCompartmentMutation,
  useRemoveCompartmentMutation,
} = compartmentApi;
export const compartmentReducer = compartmentApi.reducer;
export default compartmentApi;
