import { Card, CardContent } from "@mui/material";
import "../style/DoughnutWidget.css";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutWidget() {
  const deviceTypeLabels = [
    "Temperature",
    "Humidity",
    "Pressure",
    "Air Quality",
    "Motion",
    "Light",
    "Gas",
    "Vibration"
  ];

  const deviceTypeData = [12, 8, 10, 6, 5, 9, 4, 7];

  const colors = [
    "#10294C", // Deep twilight blue
    "#264F88", // Indigo
    "#3C6BB3", // Mid blue
    "#5E81C2", // Periwinkle
    "#7FA4E0", // Soft blue
    "#9BB4E4", // Pale highlight
    "#E67DF7", // Magenta accent
    "#FFD700", // Gold accent
  ];

  const data = {
    labels: deviceTypeLabels,
    datasets: [
      {
        data: deviceTypeData,
        backgroundColor: colors,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        
      },
    },
    animation: {
      animateRotate: true,
      duration: 1500,
      easing: "easeInOutQuart",
    },
  };

  return (
    <Card className="doughnutCard">
      <CardContent className="doughnutContainer">
        <Doughnut data={data} options={options} />
      </CardContent>
    </Card>
  );
}
