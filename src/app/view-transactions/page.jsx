"use client";
import { useGetTransactionQuery } from "@/redux/features/transactionApi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const ViewTransactions = () => {
  const { data: session } = useSession();
  const { data, isLoading, isError } = useGetTransactionQuery(
    session?.user?.email
  );
  const transactions = data?.transactions;

  if(isLoading)
    return <h3 className="min-h-screen">Loading data...</h3>

  return (
    <div className="md:w-[50%] mx-auto space-y-4 my-5 px-2">
        <h2 className="text-center font-semibold">Transaction List</h2>
      {transactions?.slice().reverse().map((transaction) => (
        <div key={transaction._id} className="border shadow-md p-4 ">
          <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
            <div>
            <span className="font-semibold ">{transaction.type}</span>: <span className="mr-5">{transaction.amount}</span> 
            - {transaction.category}
            </div>
            <div className="flex gap-2">
                <Link href="" className="bg-green-200 px-1 rounded-sm">Edit</Link>
                <Link href="" className="bg-red-200 px-1 rounded-sm">Delete</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewTransactions;
