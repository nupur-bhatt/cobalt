import React, { useState } from 'react';
import Sidebar, { drawerWidth, collapsedWidth } from '../Sidebar/Sidebar';
import ToolbarComponent from '../Toolbar/Toolbar';
import './Layout.css';

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <div className="layout">
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
      <div className="mainArea">
        <ToolbarComponent open={open} handleDrawerOpen={handleDrawerOpen} />
        <main
          className="content"
          style={{
            marginLeft: open ? `${drawerWidth}px` : `${collapsedWidth}px`
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
