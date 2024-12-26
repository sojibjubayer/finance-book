"use client";
import { useGetTransactionQuery } from "@/redux/features/transactionApi";
import { useSession } from "next-auth/react";
import React from "react";

const Summary = () => {
  const { data: session } = useSession();
  const { data, isLoading, isError } = useGetTransactionQuery(session?.user?.email);
  

  // Calculate totals
  const transactions = data?.transactions || [];
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);
  const totalExpense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);
  const totalSavings = totalIncome - totalExpense;

  if (isError) {
    return <p className="text-center mt-4 text-red-500">Failed to load transactions. Please try again later.</p>;
  }

  return (
    <div className="flex-1">
      <h2 className="text-base md:text-xl font-semibold mb-4 text-center">Summary</h2>
      <div className="space-y-4 py-4">
        <div className="bg-[#E6D9FF] p-4 border rounded-md shadow-md mx-4 flex flex-col justify-center items-center">
          <h3>Total Income</h3>
          <p>${isLoading?'0':totalIncome.toFixed(2)}</p>
        </div>
        <div className="bg-red-200 p-4 border rounded-md shadow-md mx-4 flex flex-col justify-center items-center">
          <h3 className="text-lg">Total Expense</h3>
          <p>${isLoading?'0':totalExpense.toFixed(2)}</p>
        </div>
        <div className="bg-green-300 p-4 border rounded-md shadow-md mx-4 flex flex-col justify-center items-center">
          <h3>Total Savings</h3>
          <p>${isLoading?'0':totalSavings.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
