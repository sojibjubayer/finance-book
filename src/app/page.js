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
      <div className="flex flex-col md:flex-row gap-10 ">
        <Summary />
        <IncomeExpenseChart  />
      </div>
      <div className="flex flex-col md:w-[60%] mx-auto justify-center gap-4 my-6 px-2">
        <Link className="text-center bg-[#FF9800] p-2 rounded-md " href="/add-transaction">Add Transaction</Link>
        <Link className="text-center bg-[#FF6347] p-2 rounded-md "  href="/see-transaction" >See Transaction List</Link>
      </div>
      
    </div>
  );
};

export default Home;
