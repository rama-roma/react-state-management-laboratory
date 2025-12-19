import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todo = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://to-dos-api.softclub.tj/api/" }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: () => `categories`,
      providesTags: ["Category"],
    }),
    getById: builder.query({
      query: (id) => `categories/${id}`,
      providesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({ url: `categories/?id=${id}`, method: "DELETE" }),
      invalidatesTags: ["Category"],
    }),
    editCategory: builder.mutation({
      query: (user) => ({
        url: `categories`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }),
      invalidatesTags: ["Category"]
    }),
    addCategory: builder.mutation({
        query: (user) => ({
            url: `categories`,
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(user)
        }),
        invalidatesTags: ["Category"]
    })
  }),
});
export const { useGetPokemonByNameQuery, useDeleteCategoryMutation, useEditCategoryMutation, useAddCategoryMutation, useGetByIdQuery } = todo;