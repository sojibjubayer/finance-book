"use client";
import { useGetTransactionQuery } from "@/redux/features/transactionApi";
import { useSession } from "next-auth/react";
import React from "react";

const ExpenseInsight = () => {
  const { data: session } = useSession();
  const { data, isLoading, isError } = useGetTransactionQuery(
    session?.user?.email
  );

  const Categories = ["Food", "Rent", "Entertainment", "Other"];
  const transactions = data?.transactions || [];

  // Calculate totals for each category
  const calculateTotalByCategory = (category) => {
    return transactions
      .filter((transaction) => transaction.category.toLowerCase() === category.toLowerCase())
      .reduce((total, transaction) => total + Number(transaction.amount), 0);
  };

  if (isLoading) return <div className="min-h-screen">Loading...</div>;
  if (isError) return <div className="min-h-screen">Error loading data...</div>;

  return (
    <div className="min-h-screen p-4">
      <h2 className="text-xl font-semibold text-center mb-4">Expense Insight</h2>
      {Categories.map((category) => {
        const totalAmount = calculateTotalByCategory(category);

        return (
          <div key={category} className="mb-4">
            <div className="p-4 border rounded-md shadow-md">
              <p className="text-lg font-bold">{category}: ${totalAmount}</p>
              {totalAmount > 200 ? (
                <p className="text-red-600 font-semibold">
                  Consider reducing your spending on {category.toLowerCase()}. You have spent more than 200 this month. 
                </p>
              ):
              <p className="text-green-600 font-semibold">
                  Your spending on {category.toLowerCase()} is within a reasonable range. 
                </p>
              }
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExpenseInsight;
