import IncomeExpenseChart from "@/components/dashboard/IncomeExpendChart";
import Summary from "@/components/dashboard/Summary";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="">
      <h2 className="md:w-[50%] mx-auto text-center border-b-2 text-xl mt-4 mb-6 md:mb-10 text-[#58dede] font-semibold">
        Welcome to Your Finance Dashboard
      </h2>
      <div className="flex flex-col md:flex-row gap-10">
        <Summary />
        <IncomeExpenseChart  />
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-10 my-4">
        <Link className="flex-1 bg-[#D3F5F5] p-2 rounded-md flex justify-center" href="/add-transaction">Add Transaction</Link>
        <Link className="flex-1 bg-[#D3F5F5] p-2 rounded-md flex justify-center" href="/add-transaction">See Transaction List</Link>
      </div>
    </div>
  );
};

export default Home;
