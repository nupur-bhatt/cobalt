import React from 'react';
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  Devices as DevicesIcon,
  Report as IncidentsIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import './Sidebar.css';

export const drawerWidth = 240;
export const collapsedWidth = 60;

export default function Sidebar({ open, handleDrawerClose }) {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Devices', icon: <DevicesIcon />, path: '/devices' },
    { text: 'Incidents', icon: <IncidentsIcon />, path: '/incidents' }
  ];

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      className="drawer"
      classes={{ paper: "drawerPaper" }}
    >
      <Toolbar className="drawerToolbar">
        {open && (
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        )}
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              onClick={handleDrawerClose}
              className="listItemButton"
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              {open && <ListItemText primary={item.text} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
