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
      <div className="flex flex-col md:w-[50%] mx-auto justify-center gap-4 mt-5 mb-10 px-2">
        <Link className="text-center bg-[#FCFFC1] hover:bg-[#FFE893] py-4 rounded-md "  href="/view-transactions" >View Transactions </Link>
        <Link className="text-center bg-[#B1F0F7] hover:bg-[#81BFDA] py-4 rounded-md " href="/add-transaction">Add Transaction</Link>
      </div>
      
    </div>
  );
};

export default Home;
