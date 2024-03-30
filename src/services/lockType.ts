import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TLockType } from "../schema/lockType";

const lockTypeApi = createApi({
  reducerPath: "lockType",
  tagTypes: ["LockType"],
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
      lockType: builder.query<TLockType[], void>({
        query: () => {
          return {
            url: "/lockType",
            method: "GET",
          };
        },
        providesTags: ["LockType"],
      }),
      lockTypeById: builder.query<TLockType, number>({
        query: (id) => {
          return {
            url: `/lockType/${id}`,
            method: "GET",
          };
        },
        providesTags: ["LockType"],
      }),

      createLockType: builder.mutation<TLockType[], Partial<TLockType>>({
        query: (lockTypeData) => ({
          url: "/lockType",
          method: "POST",
          body: lockTypeData,
        }),
      }),
      updateLockType: builder.mutation<TLockType, Partial<TLockType>>({
        query: (lockType) => {
          return {
            url: `/lockType/${lockType.id}`,
            method: "PUT",
            body: lockType,
          };
        },
        invalidatesTags: ["LockType"],
      }),
      removeLockType: builder.mutation<TLockType, number>({
        query: (id) => {
          return {
            url: `/lockType/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["LockType"],
      }),
    };
  },
});

export const {
  useLockTypeQuery,
  useLockTypeByIdQuery,
  useCreateLockTypeMutation,
  useUpdateLockTypeMutation,
  useRemoveLockTypeMutation,
} = lockTypeApi;
export const lockTypeReducer = lockTypeApi.reducer;
export default lockTypeApi;
