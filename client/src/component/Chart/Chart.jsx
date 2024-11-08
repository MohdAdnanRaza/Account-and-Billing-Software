import React from "react";
import Chart from "react-apexcharts";

const BarColumnChart = () => {
  // Example data
  const chartData = {
    series: [
      {
        name: "Sales",
        data: [30, 40, 45, 50, 49, 60, 70, 91, 125],
      },
    ],
    options: {
      chart: {
        type: "bar", // You can change this to 'column' for a vertical chart
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false, // Set this to true for a horizontal bar chart
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
      yaxis: {
        title: {
          text: "Sales (in units)",
        },
      },
      title: {
        text: "Monthly Sales Data",
        align: "left",
      },
    },
  };

  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar" // You can change this to 'column' for a column chart
        height={350}
      />
    </div>
  );
};

export default BarColumnChart;
