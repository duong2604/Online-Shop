import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TComment } from "../schema/comment";

const commentApi = createApi({
  reducerPath: "comment",
  tagTypes: ["Comment"],
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
      comment: builder.query<TComment[], void>({
        query: () => {
          return {
            url: "/comment",
            method: "GET",
          };
        },
        providesTags: ["Comment"],
      }),
      commentById: builder.query<TComment, number>({
        query: (id) => {
          return {
            url: `/comment/${id}`,
            method: "GET",
          };
        },
        providesTags: ["Comment"],
      }),

      createComment: builder.mutation<TComment[], Partial<TComment>>({
        query: (commentData) => ({
          url: "/comment",
          method: "POST",
          body: commentData,
        }),
      }),
      updateComment: builder.mutation<TComment, Partial<TComment>>({
        query: (comment) => {
          return {
            url: `/comment/${comment.id}`,
            method: "PUT",
            body: comment,
          };
        },
        invalidatesTags: ["Comment"],
      }),
      removeComment: builder.mutation<TComment, number>({
        query: (id) => {
          return {
            url: `/comment/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Comment"],
      }),
    };
  },
});

export const {
  useCommentQuery,
  useCommentByIdQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useRemoveCommentMutation,
} = commentApi;
export const commentReducer = commentApi.reducer;
export default commentApi;
