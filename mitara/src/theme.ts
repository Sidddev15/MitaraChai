import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: { main: '#2E5A36' },      // tea-leaf green
        secondary: { main: '#C99C66' },    // chai-gold
        background: { default: '#F1EFEA', paper: '#FFFFFF' },
        text: { primary: '#1F1F1F' },
    },
    shape: { borderRadius: 10 },
    typography: {
        fontFamily: [
            'Inter',
            'system-ui',
            '-apple-system',
            'Segoe UI',
            'Roboto',
            'Arial',
            'sans-serif',
        ].join(','),
        h1: { fontWeight: 800, letterSpacing: '-0.02em' },
        h2: { fontWeight: 700, letterSpacing: '-0.01em' },
        h3: { fontWeight: 700 },
        button: { textTransform: 'none', fontWeight: 600 },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: { borderRadius: 10 }, // single source of truth
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: { backgroundColor: '#FFFFFF', color: '#1F1F1F' },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: { borderRadius: 12 },
            },
        },
        MuiContainer: {
            defaultProps: {
                // helps typings; 'lg' is a union type
                maxWidth: 'lg',
            },
        },
    },
});

export default theme;
