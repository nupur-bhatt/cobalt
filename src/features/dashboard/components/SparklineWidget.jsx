import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Sparklines, SparklinesLine } from "react-sparklines";
import "../style/SparklineWidget.css";

export default function SparklineWidget() {

  const data = [42, 45, 48, 47, 50, 52, 55, 53, 56, 60];

  return (
    <Card className="sparklineCard">
      <CardContent className="sparklineContainer">
        <Typography className="sparklineTitle">Device Uptime</Typography>

        <div className="sparklineChart">
          <Sparklines data={data} limit={20} width={120} height={40}>
            <SparklinesLine />
          </Sparklines>
        </div>
      </CardContent>
    </Card>
  );
}
