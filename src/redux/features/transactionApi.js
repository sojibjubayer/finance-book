import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const transactionApi=createApi({
    reducerPath:'transactionApi',
    baseQuery:fetchBaseQuery({baseUrl:`${process.env.NEXT_PUBLIC_BASE_URL}`}),
    tagTypes:['Transaction'],
    endpoints: (builder) => ({
        getTransactions: builder.query({
            query: () => '/api/transactions',
            providesTags:['transaction']
        }),
        // getSIngleUser by id
        getTransaction: builder.query({
            query: (email) => `/api/getTransaction/${email}`,
            providesTags:['Transaction']
        }),
        // CREATE 
        addTransaction: builder.mutation({
            query: (transaction) => ({
                url: '/api/addTransaction',
                method:'POST',
                body:transaction
            }),
            invalidatesTags:['Transaction']
        }),

        // UPDATE 
        updateTransaction: builder.mutation({
            query: (transaction) => ({
                url: `/api/updateTransaction/${transaction.id}`,
                method:'PUT',
                body:user
            }),
            invalidatesTags:['Transaction']
        }),
        // DELETE
        deleteTransaction: builder.mutation({
            query: (id) => ({
                url: `/api/deleteTransaction/${id}`,
                method:'DELETE',
            }),
            invalidatesTags:['Transaction']
        }),
    }),

})
export const { useGetTransactionsQuery,useGetTransactionQuery, useAddTransactionMutation,useUpdateTransactionMutation,useDeleteTransactionMutation } = transactionApi;




