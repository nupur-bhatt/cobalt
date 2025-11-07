import { Card, CardContent } from "@mui/material";
import '../style/LineChartWidget.css';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function LineChartWidget() {

  const lineChartLabels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"];
  const lineChartDataRaw = [
    { label: "Open", data: [5, 6, 7, 8, 6, 7] },
    { label: "Resolved", data: [2, 3, 4, 3, 5, 4] },
    { label: "Pending", data: [1, 2, 1, 2, 3, 2] },
  ];
    
  const colors = [
    "#4B73C3", // Soft periwinkle
    "#7B8ED6", // Pale lavender-blue
    "#E67DF7", // Bright magenta accent
    "#FFD700", // Gold accent
];

  const lineChartData = {
    labels: lineChartLabels,
    datasets: lineChartDataRaw.map((dataset,index) => ({
      ...dataset,
      borderColor: colors[index % colors.length],
      backgroundColor: colors[index % colors.length],
      fill: false,
      tension: 0.3,
      pointRadius: 5,
      pointHoverRadius: 7,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // allows chart to scale to parent height
    plugins: {
      legend: { position: "top" },
      tooltip: { mode: "index", intersect: false },
    },
    interaction: { mode: "nearest", axis: "x", intersect: false },
    animation: {
      duration: 1500,
      easing: "easeInOutQuad",
    },
  };

  return (
    <Card className="lineChartCard">
      <CardContent className="lineChartContainer">
        <Line data={lineChartData} options={options} height={300} />
      </CardContent>
    </Card>
  );
}