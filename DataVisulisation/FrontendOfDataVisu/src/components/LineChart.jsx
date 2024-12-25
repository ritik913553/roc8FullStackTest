import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const LineChart = ({ LineData }) => {
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState(null);

  useEffect(() => {
    if (LineData && LineData.length > 0) {
        const labels = LineData.map((item) => {
            const date = new Date(item.day); 
            return `${date.getDate()}-${date.toLocaleString("default", { month: "short" })}`;
          });
      const values = LineData.map((item) => item.totalTime || 0);

      setChartData({
        labels,
        datasets: [
          {
            label: "Total Time Spent",
            data: values,
            borderColor: "#4BC0C0", // Line color
            backgroundColor: "rgba(75, 192, 192, 0.2)", // Fill under the line
            pointBackgroundColor: "#FF6384", // Point color
            pointBorderColor: "#FF6384", // Point border color
            pointRadius: 4, // Size of points
            borderWidth: 2,
            fill: true, // Fill area under the line
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
          tooltip: {
            enabled: true, // Enable tooltips
            callbacks: {
              label: function (tooltipItem) {
                return `Feature: ${labels[tooltipItem.dataIndex]} | Time: ${values[tooltipItem.dataIndex]}`;
              },
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Date",
              color: "#fff" 
            },
            ticks: {
              color: "#FFF", // Color of x-axis labels
              padding:20
            },
            offset: true,
            grid: {
              display: true,
              drawBorder: false, // Optionally hide the vertical grid lines along the border
            },
          },
          y: {
            title: {
              display: true,
              text: "Total Time",
              color: "#fff"
            },
            beginAtZero: true,
            ticks: {
              color: "#FFF", // Color of y-axis labels
            },
          },
        },
      });
    }
    else{
        setChartData(null);
        setChartOptions(null);
    }
  }, [LineData]);

  return (
    <div className="w-full h-64 lg:w-1/2 p-2 border-2 lg:h-96">
      {chartData && chartOptions ? (
        <Line data={chartData} options={chartOptions} />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default LineChart;
