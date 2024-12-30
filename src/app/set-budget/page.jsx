"use client";
import {
  useAddGoalMutation,
  useDeleteGoalMutation,
  useGetGoalQuery,
  useGetTransactionQuery,
} from "@/redux/features/transactionApi";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const SetBudget = () => {
  const { data: session } = useSession();

  const { data, isLoading: goalLoading, isError: goalError } = useGetGoalQuery(session?.user?.email);
  const goals = data?.goals || [];
  const [deleteGoalCall] = useDeleteGoalMutation();

  // Transactions
  const { data: transactionsData, isLoading: transactionLoading, isError: transactionError } =
    useGetTransactionQuery(session?.user?.email);
  const transactions = transactionsData?.transactions || [];

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, curr) => acc + parseFloat(curr.amount), 0); 

  const [goal, setGoal] = useState("");
  const [addGoal] = useAddGoalMutation();
  const email = session?.user?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      goal,
      email,
    };
    await addGoal(data);
    toast.success("Goal Added");
    setGoal("");
  };

  const deleteGoal = async (id) => {
    await deleteGoalCall(id);
    toast.success("Goal Deleted");
  };

  

  return (
    <div className="min-h-screen px-2 mt-5">
      <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center">Set Budget Goal</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center space-y-4"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="goal" className="text-gray-700 font-medium">
            Enter Your Budget Goal:
          </label>
          <input
            type="number"
            id="goal"
            name="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
            placeholder="Enter amount in USD"
            required
            min="0"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-[200px] mx-auto"
        >
          Submit
        </button>
      </form>

      <div className="my-4">
        
        {goalLoading?'Loading...':
        goals?.map((goal) => {
          const progress = Math.min((totalExpenses / goal.goal) * 100, 100); 

          return (
            <div
              key={goal._id}
              className="bg-teal-50 shadow-md mt-4 p-4 flex flex-col gap-5 md:flex-row items-center justify-between"


            >
              <div className="w-full">
                <p className="text-gray-800 font-semibold">
                  Budget Goal: ${goal.goal}
                </p>
                <p className="text-gray-600">
                  Total Expenses: ${totalExpenses}
                </p>
                <div className="w-full bg-gray-200 h-4 rounded-md mt-2">
                  <div
                    className={`h-full ${
                      progress > 100 ? "bg-red-500" : "bg-green-400"
                    } rounded-md`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p
                  className={`mt-1 text-sm ${
                    progress > 100 ? "text-red-500" : "text-gray-600"
                  }`}
                >
                  {progress > 100
                    ? "You have exceeded your budget!"
                    : `Progress: ${progress.toFixed(2)}%`}
                </p>
              </div>
              <button
                onClick={() => deleteGoal(goal._id)}
                className="bg-red-300 px-2 py-1 rounded-md"
              >
                Delete Goal
              </button>
            </div>
          );
        })}
      </div>
      <Toaster />
    </div>
  );
};

export default SetBudget;
