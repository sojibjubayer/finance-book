"use client";
import { useState } from "react";
import { useGetTransactionQuery } from "@/redux/features/transactionApi";
import { useSession } from "next-auth/react";
import Link from "next/link";

const ViewTransactions = () => {
  const { data: session } = useSession();
  const { data, isLoading, isError } = useGetTransactionQuery(session?.user?.email);
  const transactions = data?.transactions;

  const [editingTransactionId, setEditingTransactionId] = useState(null); // To track the transaction being edited
  const [formData, setFormData] = useState({
    type: "",
    amount: "",
    category: "",
  });

  // Open the edit form with the transaction data
  const handleEdit = (transaction) => {
    setEditingTransactionId(transaction._id);
    setFormData({
      type: transaction.type,
      amount: transaction.amount,
      category: transaction.category,
    });
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submit to update the transaction
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can call an API to update the transaction here (e.g., dispatch Redux action)
    console.log("Updated transaction", formData);

    // Close the edit form after submitting
    setEditingTransactionId(null);
  };

  if (isLoading) return <h3 className="min-h-screen">Loading data...</h3>;
  if (isError) return <h3 className="min-h-screen">Error loading transactions.</h3>;

  return (
    <div className="relative md:w-[50%] mx-auto space-y-4 mt-5 mb-20 px-2">
      <h2 className="text-center font-semibold">Transaction List</h2>
      {transactions?.slice().reverse().map((transaction) => (
        <div key={transaction._id} className="border shadow-md p-4">
          {editingTransactionId === transaction._id ? (
            // Inline Edit Form
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
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingTransactionId(null)} // Cancel editing
                  className="bg-gray-500 text-white px-3 py-1 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            // Display transaction details
            <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
              <div>
                <span className="font-semibold">{transaction.type}</span>:{" "}
                <span className="mr-5">{transaction.amount}</span> -{" "}
                {transaction.category}
              </div>
              <div className="flex gap-2">
                {/* Edit Button */}
                <button
                  onClick={() => handleEdit(transaction)}
                  className="bg-green-200 px-1 rounded-sm"
                >
                  Edit
                </button>
                {/* Delete Button */}
                <button
                  onClick={() => console.log("Delete", transaction._id)}
                  className="bg-red-200 px-1 rounded-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ViewTransactions;
