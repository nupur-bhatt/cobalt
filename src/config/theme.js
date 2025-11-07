import { createTheme } from '@mui/material/styles';

const theme = createTheme({

  cssVariables: true,
  palette: {
    primary: {
      main: "#10294C",
    },
    secondary: {
      main: "#0F75BB",
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Arial", sans-serif', 
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6
        },
      },
    },
  },
});

export default theme;