import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const transactionApi=createApi({
    reducerPath:'transactionApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:3000'}),
    tagTypes:['Transaction'],
    endpoints: (builder) => ({
        getTransactions: builder.query({
            query: () => '/transactions',
            providesTags:['transaction']
        }),
        // getSIngleUser by id
        getTransaction: builder.query({
            query: (id) => `/transactions/${id}`,
            providesTags:['Transaction']
        }),
        // CREATE 
        addTransaction: builder.mutation({
            query: (transaction) => ({
                url: '/transactions',
                method:'POST',
                body:transaction
            }),
            invalidatesTags:['Transaction']
        }),

        // UPDATE 
        updateTransaction: builder.mutation({
            query: (transaction) => ({
                url: `/transactions/${transaction.id}`,
                method:'PUT',
                body:user
            }),
            invalidatesTags:['Transaction']
        }),
        // DELETE
        deleteTransaction: builder.mutation({
            query: (id) => ({
                url: `/transactions/${id}`,
                method:'DELETE',
            }),
            invalidatesTags:['Transaction']
        }),
    }),

})
export const { useGetTransactionsQuery,useGetTransactionQuery, useAddTransactionMutation,useUpdateTransactionMutation,useDeleteTransactionMutation } = transactionApi;




