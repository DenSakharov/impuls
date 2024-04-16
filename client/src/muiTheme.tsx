import { ThemeOptions, createTheme } from '@mui/material/styles';


const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#147298',
    },
    secondary: {
      main: '#6a75b9',
    },
    error: {
      main: '#E7234D',
    },
    background: {
      default: '#edf5fb',
    },
  },
  typography: {
    fontSize: 26,
    fontWeightLight: 300,
    htmlFontSize: 28,
    fontFamily: 'Inter',
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'inherit',
          height: 40,
        },
      },
    },
    
  },
  spacing: 8,
};

const impulsTheme = createTheme(themeOptions)


export default impulsTheme