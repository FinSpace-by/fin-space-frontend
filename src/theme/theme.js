import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5C4CE3',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#000000',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 14,
    h5: {
      color: '#FFFFFF',
      fontFamily: 'Gogh, sans-serif',
    },
    login_register: {
      color: '#5C4CE3',
      fontFamily: 'Gogh, sans-serif',
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '10vw',
        },
        input: {
          color: '#000',
          backgroundColor: '#fff',
          borderRadius: '10vw',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginTop: '5px',
          marginBottom: '5px',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&::placeholder': {
            color: '#1C1C1C',
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '10vw',
        },
      },
    },
  },
});

export default theme;
