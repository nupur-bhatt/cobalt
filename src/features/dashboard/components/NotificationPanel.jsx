import React from "react";
import { Card, CardContent, List, ListItem, ListItemText, Typography } from "@mui/material";
import "../style/NotificationPanel.css";

export default function NotificationPanel() {
  const notifications = [
    "Device A restarted successfully",
    "New firmware update available",
    "Incident resolved at Site 3",
    "Low battery warning - Sensor 12",
    "Network restored in Zone 5",
    "Temperature spike detected in Zone 2",
    "Maintenance scheduled for tomorrow",
    "Power outage reported at Site 7",
    "Connection lost with Sensor 4",
    "System diagnostics completed successfully"
  ];

  return (
    <Card className="notificationCard">
      <CardContent className="notificationContainer">
        <Typography className="notificationTitle">Recent Notifications</Typography>
        <List className="notificationList">
          {notifications.map((note, index) => (
            <ListItem key={index} className="notificationItem">
              <ListItemText primary={note} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
