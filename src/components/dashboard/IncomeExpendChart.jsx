"use client";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import { useGetTransactionQuery } from "@/redux/features/transactionApi";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const IncomeExpenseChart = () => {
  const { data: session } = useSession();
  
  const { data: getData, isLoading, isError } = useGetTransactionQuery(session?.user?.email);


  // Predefined categories
  const categories = ["Salary", "Food", "Rent", "Entertainment", "Other"];

  // Placeholder data for static chart
  const staticChartData = {
    labels: categories,
    datasets: [
      {
        label: "Income",
        data: [0, 0, 0, 0, 0], // Static income values
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
      {
        label: "Spending",
        data: [0, 0, 0, 0, 0], // Static spending values
        backgroundColor: "#FECACA",
        borderColor: "#F87171",
        borderWidth: 1,
      },
    ],
  };

  // Compute dynamic data when available
  const { incomeValues, spendingValues } = useMemo(() => {
    const transactions = getData?.transactions || [];

    const income = categories.reduce((acc, category) => {
      acc[category] = transactions
        .filter((transaction) => transaction.type === "income" && transaction.category.toLowerCase() === category.toLowerCase())
        .reduce((sum, transaction) => sum + Number(transaction.amount), 0);
      return acc;
    }, {});

    const spending = categories.reduce((acc, category) => {
      acc[category] = transactions
        .filter((transaction) => transaction.type === "expense" && transaction.category.toLowerCase() === category.toLowerCase())
        .reduce((sum, transaction) => sum + Number(transaction.amount), 0);
      return acc;
    }, {});

    return {
      incomeValues: categories.map((category) => income[category] || 0),
      spendingValues: categories.map((category) => spending[category] || 0),
    };
  }, [getData, categories]);

  // Chart data
  const chartData = useMemo(() => {
    return {
      labels: categories,
      datasets: [
        {
          label: "Income",
          data: incomeValues,
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
        },
        {
          label: "Spending",
          data: spendingValues,
          backgroundColor: "#FECACA",
          borderColor: "#F87171",
          borderWidth: 1,
        },
      ],
    };
  }, [incomeValues, spendingValues, categories]);

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.dataset.label}: $${tooltipItem.raw.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 10,
          },
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex-1 md:mr-5 px-1 md:px-0">
      <h2 className="text-base md:text-xl font-semibold mb-4 text-center">Income and Spending Chart</h2>
      <div className="md:h-[350px] w-[100%]">
        <Bar 
          data={isLoading ? staticChartData : chartData} 
          options={options} 
        />
      </div>
    </div>
  );
};

export default IncomeExpenseChart;
