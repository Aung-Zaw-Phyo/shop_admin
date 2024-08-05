"use client"
import { Button, createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#233044', // Set primary color to black
        },
        secondary: {
            main: '#dc004e', // Secondary color can be any color
        },
    },
});

const ThemeButton = () => {
    return (
        <ThemeProvider theme={theme}>
            <Button variant="contained" color="primary">
                Black Primary Button
            </Button>
        </ThemeProvider>
    );
};
export default ThemeButton;
