import React from "react";

const Summary = () => {
  return (
    <div className="flex-1">
      <h2 className="text-base md:text-xl font-semibold mb-4 text-center">Summary</h2>
      <div className="space-y-4 py-4">
        <div className="bg-[#E6D9FF] p-4  border rounded-md shadow-md mx-4 flex flex-col justify-center items-center">
          <h3>Total Income</h3>
          <p>$ 00.0</p>
        </div>
        <div className="bg-red-200 p-4  border rounded-md shadow-md mx-4 flex flex-col justify-center items-center">
          <h3 className="text-lg">Total Expense</h3>
          <p>$ 00.0</p>
        </div>
        <div className="bg-green-300 p-4  border rounded-md shadow-md mx-4 flex flex-col justify-center items-center">
          <h3>Total Savings</h3>
          <p>$ 00.0</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
