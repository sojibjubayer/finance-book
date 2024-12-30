"use client";

import { useState } from "react";
import {
  useDeleteTransactionMutation,
  useGetTransactionQuery,
  useUpdateTransactionMutation,
} from "@/redux/features/transactionApi";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

const ViewTransactions = () => {
  const { data: session } = useSession();
  const { data, isLoading, isError } = useGetTransactionQuery(
    session?.user?.email
  );
  const transactions = data?.transactions || [];

  const [editingTransactionId, setEditingTransactionId] = useState(null);
  const [formData, setFormData] = useState({
    type: "",
    amount: "",
    category: "",
  });

  const [updateTransaction] = useUpdateTransactionMutation();
  const [deleteTransaction] = useDeleteTransactionMutation();

  const handleEdit = (transaction) => {
    setEditingTransactionId(transaction._id);
    setFormData({
      type: transaction.type,
      amount: transaction.amount,
      category: transaction.category,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateTransaction({ id: editingTransactionId, ...formData }).unwrap();
      toast.success("Transaction updated successfully");
      setEditingTransactionId(null);
    } catch (error) {
      console.error("Error updating transaction:", error);
      toast.error("Failed to update transaction");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id).unwrap();
      toast.success("Transaction deleted successfully");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      toast.error("Failed to delete transaction");
    }
  };

  if (isLoading) {
    return <h3 className="min-h-screen">Loading data...</h3>;
  }

  if (isError) {
    return <h3 className="min-h-screen">Error loading transactions.</h3>;
  }

  return (
    <div className="min-h-screen relative md:w-[50%] mx-auto space-y-4 mt-5 mb-20 px-2">
      <h2 className="text-center font-semibold">Transaction List</h2>
      {transactions
        .slice()
        .reverse()
        .map((transaction) => (
          <div key={transaction._id} className="border shadow-md p-4">
            {editingTransactionId === transaction._id ? (
              <form onSubmit={handleSubmit} className="space-y-2">
                <div>
                  <label htmlFor="type" className="block text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    name="type"
                    id="type"
                    className="border rounded-md p-2 w-full"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="amount" className="block text-gray-700 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    className="border rounded-md p-2 w-full"
                    value={formData.amount}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    id="category"
                    className="border rounded-md p-2 w-full"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="salary">Salary</option>
                    <option value="food">Food</option>
                    <option value="rent">Rent</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-3 py-1 rounded-md"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingTransactionId(null)}
                    className="bg-gray-500 text-white px-3 py-1 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
                <div>
                  <span className="font-semibold">{transaction.type}</span>:
                  <span className="mr-5">${transaction.amount}</span> -
                  {transaction.category}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(transaction)}
                    className="bg-green-200 px-1 rounded-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(transaction._id)}
                    className="bg-red-200 px-1 rounded-sm"
                  >
                    Delete
                  </button>
                </div>
                <Toaster />
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default ViewTransactions;
