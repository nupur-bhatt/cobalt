import { ThemeProvider } from "@mui/material";
import theme from "../config/theme";


export default function Provider({children}){
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}