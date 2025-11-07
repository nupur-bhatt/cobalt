import React from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/index.css'
import theme from "./config/theme.js"
import App from './app/App.jsx'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

createRoot(document.getElementById('root')).render(

  <React.StrictMode> 
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <App />
    </ThemeProvider>
  </React.StrictMode>

);
