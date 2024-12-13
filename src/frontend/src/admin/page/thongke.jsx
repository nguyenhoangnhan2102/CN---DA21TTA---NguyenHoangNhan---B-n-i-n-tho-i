import React from "react";
import {
  Bar,
  Line,
  Pie,
  Doughnut,
  Radar,
  Bubble,
  Scatter,
  Chart,
  PolarArea,
} from "react-chartjs-2";
import "chart.js/auto"; // Đăng ký tự động

const Charts = () => {
  // Biểu đồ cột (Bar Chart)
  const barData = {
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        label: "Sales",
        data: [30, 20, 50, 80],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  // Biểu đồ đường (Line Chart)
  const lineData = {
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        label: "Temperature",
        data: [30, 35, 40, 45],
        borderColor: "#FF6384",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  };

  // Biểu đồ tròn (Pie Chart)
  const pieData = {
    labels: ["Red", "Blue", "Yellow", "Green"],
    datasets: [
      {
        data: [300, 50, 100, 75],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  // Biểu đồ bánh rán (Doughnut Chart)
  const doughnutData = {
    labels: ["Red", "Blue", "Yellow", "Green"],
    datasets: [
      {
        data: [300, 50, 100, 75],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  // Biểu đồ radar (Radar Chart)
  const radarData = {
    labels: ["Speed", "Strength", "Agility", "Endurance", "Skill"],
    datasets: [
      {
        label: "Player 1",
        data: [80, 70, 90, 60, 75],
        borderColor: "#FF6384",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        pointBackgroundColor: "#FF6384",
      },
      {
        label: "Player 2",
        data: [60, 80, 70, 85, 65],
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        pointBackgroundColor: "#36A2EB",
      },
    ],
  };

  // Biểu đồ bong bóng (Bubble Chart)
  const bubbleData = {
    datasets: [
      {
        label: "Bubble Chart",
        data: [
          { x: 20, y: 30, r: 15 },
          { x: 40, y: 10, r: 10 },
          { x: 50, y: 50, r: 25 },
        ],
        backgroundColor: "#FF6384",
      },
    ],
  };

  // Biểu đồ phân tán (Scatter Chart)
  const scatterData = {
    datasets: [
      {
        label: "Scatter Chart",
        data: [
          { x: 10, y: 20 },
          { x: 30, y: 50 },
          { x: 50, y: 60 },
        ],
        backgroundColor: "#36A2EB",
      },
    ],
  };

  // Biểu đồ hỗn hợp (Mixed Chart)
  const mixedData = {
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        label: "Sales",
        type: "bar",
        data: [30, 20, 50, 80],
        backgroundColor: "#FF6384",
      },
      {
        label: "Revenue",
        type: "line",
        data: [20, 35, 40, 60],
        borderColor: "#36A2EB",
        fill: false,
      },
    ],
  };

  // Biểu đồ khu vực cực (Polar Area Chart)
  const polarData = {
    labels: ["Red", "Blue", "Yellow", "Green"],
    datasets: [
      {
        data: [300, 50, 100, 75],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <h2>Bar Chart</h2>
        <Bar data={barData} />
      </div>

      <div className="col-md-6">
        <h2>Line Chart</h2>
        <Line data={lineData} />
      </div>

      <div className="col-md-6">
        <h2>Pie Chart</h2>
        <Pie data={pieData} />
      </div>

      <div className="col-md-6">
        <h2>Doughnut Chart</h2>
        <Doughnut data={doughnutData} />
      </div>

      <div className="col-md-6">
        <h2>Radar Chart</h2>
        <Radar data={radarData} />
      </div>

      <div className="col-md-6">
        <h2>Bubble Chart</h2>
        <Bubble data={bubbleData} />
      </div>

      <div className="col-md-6">
        <h2>Scatter Chart</h2>
        <Scatter data={scatterData} />
      </div>

      <div className="col-md-6">
        <h2>Mixed Chart</h2>
        <Chart type="bar" data={mixedData} />
      </div>

      <div className="col-md-6">
        <h2>Polar Area Chart</h2>
        <PolarArea data={polarData} />
      </div>
    </div>
  );
};

export default Charts;
