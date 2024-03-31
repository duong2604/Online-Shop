import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TCommentStatus } from "../schema/commentStatus";

const commentStatusApi = createApi({
  reducerPath: "commentStatus",
  tagTypes: ["CommentStatus"],
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
      commentStatus: builder.query<TCommentStatus[], void>({
        query: () => {
          return {
            url: "/commentStatus",
            method: "GET",
          };
        },
        providesTags: ["CommentStatus"],
      }),
      commentStatusById: builder.query<TCommentStatus, number>({
        query: (id) => {
          return {
            url: `/commentStatus/${id}`,
            method: "GET",
          };
        },
        providesTags: ["CommentStatus"],
      }),

      createCommentStatus: builder.mutation<TCommentStatus[], Partial<TCommentStatus>>({
        query: (commentStatusData) => ({
          url: "/commentStatus",
          method: "POST",
          body: commentStatusData,
        }),
      }),
      updateCommentStatus: builder.mutation<TCommentStatus, Partial<TCommentStatus>>({
        query: (commentStatus) => {
          return {
            url: `/commentStatus/${commentStatus.id}`,
            method: "PUT",
            body: commentStatus,
          };
        },
        invalidatesTags: ["CommentStatus"],
      }),
      removeCommentStatus: builder.mutation<TCommentStatus, number>({
        query: (id) => {
          return {
            url: `/commentStatus/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["CommentStatus"],
      }),
    };
  },
});

export const {
  useCommentStatusQuery,
  useCommentStatusByIdQuery,
  useCreateCommentStatusMutation,
  useUpdateCommentStatusMutation,
  useRemoveCommentStatusMutation,
} = commentStatusApi;
export const commentStatusReducer = commentStatusApi.reducer;
export default commentStatusApi;
