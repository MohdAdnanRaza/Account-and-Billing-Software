import React from "react";
import Chart from "react-apexcharts";

const WeeklyRevenueChart = () => {
  // Example data for weekly revenue
  const chartData = {
    series: [
      {
        name: "Revenue",
        data: [1200, 1500, 1100, 1800, 2200, 1900, 2400],
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Weekly Revenue",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // alternating grid colors
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        title: {
          text: "Days of the Week",
        },
      },
      yaxis: {
        title: {
          text: "Revenue (in USD)",
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$" + val + " USD";
          },
        },
      },
    },
  };

  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default WeeklyRevenueChart;
