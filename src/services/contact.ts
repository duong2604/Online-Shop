import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TContact } from "../schema/contact";

const contactApi = createApi({
  reducerPath: "contact",
  tagTypes: ["Contact"],
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
      contact: builder.query<TContact[], void>({
        query: () => {
          return {
            url: "/contact",
            method: "GET",
          };
        },
        providesTags: ["Contact"],
      }),
      contactById: builder.query<TContact, number>({
        query: (id) => {
          return {
            url: `/contact/${id}`,
            method: "GET",
          };
        },
        providesTags: ["Contact"],
      }),

      createContact: builder.mutation<TContact[], Partial<TContact>>({
        query: (contactData) => ({
          url: "/contact",
          method: "POST",
          body: contactData,
        }),
      }),
      updateContact: builder.mutation<TContact, Partial<TContact>>({
        query: (contact) => {
          return {
            url: `/contact/${contact.id}`,
            method: "PUT",
            body: contact,
          };
        },
        invalidatesTags: ["Contact"],
      }),
      removeContact: builder.mutation<TContact, number>({
        query: (id) => {
          return {
            url: `/contact/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Contact"],
      }),
    };
  },
});

export const {
  useContactQuery,
  useContactByIdQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useRemoveContactMutation,
} = contactApi;
export const contactReducer = contactApi.reducer;
export default contactApi;
