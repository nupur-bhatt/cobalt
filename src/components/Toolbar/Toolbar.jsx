
import { AppBar, Toolbar as MuiToolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './Toolbar.css';

export default function ToolbarComponent({ open, handleDrawerOpen }) {
  return (
    <AppBar className="toolbar">
      <MuiToolbar>
        {!open && (
          <IconButton className="menuButton" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
        )}
      </MuiToolbar>
    </AppBar>
  );
}