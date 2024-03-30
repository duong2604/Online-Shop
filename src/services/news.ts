import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TNews } from "../schema/news";

const newsApi = createApi({
  reducerPath: "news",
  tagTypes: ["News"],
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
      news: builder.query<TNews[], void>({
        query: () => {
          return {
            url: "/news",
            method: "GET",
          };
        },
        providesTags: ["News"],
      }),
      newsById: builder.query<TNews, number>({
        query: (id) => {
          return {
            url: `/news/${id}`,
            method: "GET",
          };
        },
        providesTags: ["News"],
      }),

      createNews: builder.mutation<TNews[], Partial<TNews>>({
        query: (newsData) => ({
          url: "/news",
          method: "POST",
          body: newsData,
        }),
      }),
      updateNews: builder.mutation<TNews, Partial<TNews>>({
        query: (news) => {
          return {
            url: `/news/${news.id}`,
            method: "PUT",
            body: news,
          };
        },
        invalidatesTags: ["News"],
      }),
      removeNews: builder.mutation<TNews, number>({
        query: (id) => {
          return {
            url: `/news/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["News"],
      }),
    };
  },
});

export const {
  useNewsQuery,
  useNewsByIdQuery,
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useRemoveNewsMutation,
} = newsApi;
export const newsReducer = newsApi.reducer;
export default newsApi;
