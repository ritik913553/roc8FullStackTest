import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ Bardata ,onBarHover }) => {
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState(null);

  useEffect(() => {
    if (Bardata && Bardata.length > 0) {
      const labels = Bardata.map((item) => item.feature || "Unknown Feature");
      const values = Bardata.map((item) => item.totalTime || 0);

      setChartData({
        labels,
        datasets: [
          {
            label: "Total Time Spent",
            data: values,
            backgroundColor: "#d926d5",
            borderColor: "#ddd",
            borderWidth: 1,
            barThickness: 10,
            maxBarThickness: 20, 
            hoverBackgroundColor: "#ff5733", 
            hoverBorderColor: "#33ffff", 
            hoverBorderWidth: 2, 
            hoverBoxShadow: "20px 20px rgb(4,37,37)", 
          },
        ],
      });

      setChartOptions({
        responsive: true,
        maintainAspectRatio: false, // Allow resizing
        plugins: {
          legend: {
            display: false,
            position: "top",
          },
          title: {
            display: true,
            text: "Total Time Spent on Features",
            color: "#fff"
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Total Time",
              color: "#fff"
            },
            ticks: {
              color: "#fff", 
            },
          },
          y: {
            title: {
              display: true,
              text: "Features",
              color: "#fff"
            },
            ticks: {
              color: "#fff", 
              font: {
                size: 14,
              },
            },
            categoryPercentage: 0.8, // Space between categories
            barPercentage: 0.9, // Space between bars
            beginAtZero: true,
          },
          
        },
        indexAxis: "y", 
        onHover: (event, chartElement) => {
          if (chartElement.length > 0) {
            const feature = Bardata[chartElement[0].index].feature;
            onBarHover(feature); // Pass selected feature to parent component
          }
        },
      });
    }
    else{
      setChartData(null);
      setChartOptions(null);
    }
  }, [Bardata ,onBarHover]);

  return (
    <div className="w-full h-64 p-2 border-2 lg:w-1/2 lg:h-96">
      {chartData && chartOptions ? (
        <Bar data={chartData} options={chartOptions} />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default BarChart;
