import { Card, CardContent, CircularProgress, Typography, Box } from "@mui/material";
import "../style/BatteryWidget.css";
import { useState, useEffect } from "react";

function CircularProgressWithLabel({ value }) {
  return (
    <Box className="circularContainer">
      <CircularProgress
        variant="determinate"
        value={value}
        className="circularProgress"
      />
      <Box className="circularInner">
        <Typography className="batteryPercentage">
          {`${Math.round(value)}%`}
        </Typography>
        
      </Box>
    </Box>
  );
}

export default function BatteryWidget() {
  
  const [progress, setProgress] = useState(0);
  const label = "Battery Health";

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 85 ? 85 : prev + 5)); 
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
     <Card className="batteryCard">
      
      <CardContent className="batteryContainer">
       
        <CircularProgressWithLabel value={progress} />
      </CardContent>
    </Card>
  );
}
