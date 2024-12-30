import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}` }),
  tagTypes: ["Transaction", "Goal"],
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: () => "/api/transactions",
      providesTags: ["transaction"],
    }),
    // getSIngleUser by id
    getTransaction: builder.query({
      query: (email) => `/api/getTransaction/${email}`,
      providesTags: ["Transaction"],
    }),
    // CREATE
    addTransaction: builder.mutation({
      query: (transaction) => ({
        url: "/api/addTransaction",
        method: "POST",
        body: transaction,
      }),
      invalidatesTags: ["Transaction"],
    }),

    // UPDATE
    updateTransaction: builder.mutation({
      query: (transaction) => ({
        url: `/api/updateTransaction/${transaction.id}`,
        method: "PUT",
        body: transaction,
      }),
      invalidatesTags: ["Transaction"],
    }),
    // DELETE
    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `/api/deleteTransaction/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Transaction"],
    }),

    // GOAL
    addGoal: builder.mutation({
      query: (goal) => ({
        url: "/api/addGoal",
        method: "POST",
        body: goal,
      }),
      invalidatesTags: ["Goal"],
    }),
    getGoal: builder.query({
      query: (email) => `/api/getGoal/${email}`,
      providesTags: ["Goal"],
    }),
    deleteGoal: builder.mutation({
      query: (id) => ({
        url: `/api/deleteGoal/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Goal"],
    }),
  }),
});
export const {
  useGetTransactionsQuery,
  useGetTransactionQuery,
  useAddTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
  useAddGoalMutation,
  useGetGoalQuery,
  useDeleteGoalMutation
} = transactionApi;
