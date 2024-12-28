"use client";
import { useState } from "react";
import { useGetTransactionQuery } from "@/redux/features/transactionApi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Modal from "@/components/Modal"; // Import Modal component
import { useRouter } from "next/navigation"; // For navigation

const ViewTransactions = () => {
  const { data: session } = useSession();
  const { data, isLoading, isError } = useGetTransactionQuery(session?.user?.email);
  const transactions = data?.transactions;

  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [selectedTransaction, setSelectedTransaction] = useState(null); // Selected transaction to edit
  const [formData, setFormData] = useState({
    type: "",
    amount: "",
    category: "",
  });

 

  // Open the modal with the transaction data
  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setFormData({
      type: transaction.type,
      amount: transaction.amount,
      category: transaction.category,
    });
    setIsModalOpen(true);
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
    // Example: updateTransaction(selectedTransaction._id, formData);

    // Close the modal after submitting
    setIsModalOpen(false);
    console.log("Updated transaction", formData);
  };

  if (isLoading) return <h3 className="min-h-screen">Loading data...</h3>;
  if (isError) return <h3 className="min-h-screen">Error loading transactions.</h3>;

  return (
    <div className="relative md:w-[50%] mx-auto space-y-4 mt-5 mb-20 px-2">
      <h2 className="text-center font-semibold">Transaction List</h2>
      {transactions?.slice().reverse().map((transaction) => (
        <div key={transaction._id} className="border shadow-md p-4 ">
          <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
            <div>
              <span className="font-semibold ">{transaction.type}</span>:{" "}
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
        </div>
      ))}
      
      {/* Modal for editing transaction */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close modal
        onSubmit={handleSubmit} // Handle form submit
        transaction={formData}
        handleChange={handleChange}
      />
    </div>
  );
};

export default ViewTransactions;
