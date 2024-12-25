"use client";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const IncomeExpenseChart = () => {
    const categories = ["Salary", "Food", "Rent", "Entertainment", "Other"];
    const spending = {
        Salary: 1000,
        Food: 300,
        Rent: 500,
        Entertainment: 150,
        Other: 200,
      };
      
      const income = {
        Salary: 3000,
        Food: 0,
        Rent: 0,
        Entertainment: 0,
        Other: 0,
      };
      

    const data = {
        labels: categories,
        spendingValues: categories.map((category) => spending[category] || 0),
        incomeValues: categories.map((category) => income[category] || 0),
      };



  const chartData = {
    labels: data.labels, 
    datasets: [
      {
        label: 'Income',
        data: data.incomeValues, 
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
      {
        label: 'Spending',
        data: data.spendingValues,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
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
    <div className="flex-1 md:mr-5">
      <h2 className="text-base md:text-xl font-semibold mb-4 text-center">Income and Spending Chart</h2>
      <div className="relative lg:h-[500px] " >
        <Bar
          data={chartData}
          options={options}
        />
      </div>
    </div>
  );
};

export default IncomeExpenseChart;
