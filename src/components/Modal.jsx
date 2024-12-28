"use client"
import { useState, useEffect } from "react";
import { useUpdateTransactionMutation } from "@/redux/features/transactionApi"; // Assuming you have the update mutation
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

const Modal = ({ isOpen, onClose, transaction, onSubmit }) => {
  if (!isOpen) return null; // Don't render anything if the modal isn't open

  // Local state for form data
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    type: "income", 
    amount: "", 
    currency: "USD", 
    category: "salary",
    email: session?.user?.email || ""
  });

  useEffect(() => {
    if (transaction) {
      setFormData({
        type: transaction.type || "income",
        amount: transaction.amount || "",
        currency: transaction.currency || "USD",
        category: transaction.category || "salary",
        email: session?.user?.email || ""
      });
    }
  }, [transaction, session]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [updateTransaction] = useUpdateTransactionMutation(); // Assuming you have this mutation

  // Handle form submission (update transaction)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.amount || !formData.currency || !formData.category) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await updateTransaction({ transactionId: transaction._id, ...formData });
      toast.success('Transaction updated successfully!');
      onSubmit();  // Close modal and refresh the parent component after successful update
    } catch (error) {
      toast.error("Error updating transaction");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-md shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent click from closing the modal when clicking inside the modal
      >
        <h2 className="text-center font-semibold mb-4">Edit Transaction</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Transaction Type */}
          <div>
            <label htmlFor="type" className="block text-gray-700 mb-2">
              Type
            </label>
            <select
              name="type"
              id="type"
              className="border rounded-md p-2 w-full focus:border-[#58dede] focus:outline-none"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="amount" className="block text-gray-700 mb-2">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              className="border rounded-md p-2 w-full focus:border-[#58dede] focus:outline-none"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              required
            />
          </div>

          {/* Currency */}
          <div>
            <label htmlFor="currency" className="block text-gray-700 mb-2">
              Currency
            </label>
            <select
              name="currency"
              id="currency"
              className="border rounded-md p-2 w-full focus:border-[#58dede] focus:outline-none"
              value={formData.currency}
              onChange={handleChange}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">BDT</option>
              <option value="INR">INR</option>
            </select>
          </div>

          {/* Amount in USD */}
          <div>
            <p className="text-gray-700 mb-3">Amount in USD: ${formData.amount}</p>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              id="category"
              className="border rounded-md p-2 w-full focus:border-[#58dede] focus:outline-none"
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

          {/* Submit Button */}
          <div className="mt-4">
            <button
              type="submit"
              className="w-full py-2 mt-5 bg-[#58dede] text-white rounded-md hover:bg-[#45b6b6] transition duration-300"
            >
              Save Changes
            </button>
          </div>
        </form>

        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={onClose}
        >
          ✖
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default Modal;
