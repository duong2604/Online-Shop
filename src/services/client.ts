import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TClient } from "../schema/client";

const clientApi = createApi({
  reducerPath: "client",
  tagTypes: ["Client"],
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
      client: builder.query<TClient[], void>({
        query: () => {
          return {
            url: "/client",
            method: "GET",
          };
        },
        providesTags: ["Client"],
      }),
      clientById: builder.query<TClient, number>({
        query: (id) => {
          return {
            url: `/client/${id}`,
            method: "GET",
          };
        },
        providesTags: ["Client"],
      }),

      createClient: builder.mutation<TClient[], Partial<TClient>>({
        query: (clientData) => ({
          url: "/client",
          method: "POST",
          body: clientData,
        }),
      }),
      updateClient: builder.mutation<TClient, Partial<TClient>>({
        query: (client) => {
          return {
            url: `/client/${client.id}`,
            method: "PUT",
            body: client,
          };
        },
        invalidatesTags: ["Client"],
      }),
      removeClient: builder.mutation<TClient, number>({
        query: (id) => {
          return {
            url: `/client/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Client"],
      }),
    };
  },
});

export const {
  useClientQuery,
  useClientByIdQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useRemoveClientMutation,
} = clientApi;
export const clientReducer = clientApi.reducer;
export default clientApi;
