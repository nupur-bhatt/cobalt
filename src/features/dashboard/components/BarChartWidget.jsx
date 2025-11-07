import { Card, CardContent } from "@mui/material";
import '../style/BarChartWidget.css'; 
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChartWidget() {

  const barChartLabels = ['Online', 'Offline', 'Maintenance', 'Pending'];

  const barChartDataRaw = [
    { label: 'Devices', data: [12, 5, 3, 2] },     
    { label: 'Gateways', data: [8, 2, 1, 1] },    
    { label: 'Sensors', data: [6, 3, 2, 1] },  
    { label: 'Edge Devices', data: [4, 1, 2, 0] },
  ];

  const colors = [
    "#4B73C3", // Soft periwinkle
    "#7B8ED6", // Pale lavender-blue
    "#E67DF7", // Bright magenta accent
    "#FFD700", // Gold accent
  ];

  const barChartData = {
    labels: barChartLabels,
    datasets: barChartDataRaw.map((dataset, index) => ({
      ...dataset,
      backgroundColor: colors[index % colors.length],
      borderColor: colors[index % colors.length],
      borderWidth: 1,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // fill parent container
    plugins: {
      legend: { position: 'top' },
      tooltip: { mode: 'index', intersect: false },
    },
    interaction: { mode: 'nearest', axis: 'x', intersect: false },
    animation: {
      duration: 1500,
      easing: 'easeInOutQuad',
    },
    scales: {
      x: { stacked: false },
      y: { beginAtZero: true },
    },
  };

  return (
    <Card className="barChartCard">
      <CardContent className="barChartContainer">
        <Bar data={barChartData} options={options} />
      </CardContent>
    </Card>
  );
}