"use client"
import { useGetTransactionQuery } from '@/redux/features/transactionApi';
import { useSession } from 'next-auth/react';
import React from 'react';

const getTransaction = () => {
  const {data:session} = useSession()
    const {data} = useGetTransactionQuery(session?.user?.email)
    console.log(data?.transactions)
    return (
        <div>
            
        </div>
    );
};

export default getTransaction;