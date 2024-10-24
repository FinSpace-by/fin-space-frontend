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
    header: {
      color: '#fff',
      fontSize: 24,
      fontFamily: 'GoghRegular, sans-serif',
    },
    menu: {
      color: '#fff',
      fontSize: 20,
      fontFamily: 'GoghRegular, sans-serif',
      marginTop: '20px',
    },
    cardText: {
      color: '#000',
      fontSize: '1rem',
      fontFamily: 'Gogh, sans-serif',
    },
    bankName: {
      color: '#fff',
      fontSize: '0.8rem',
      fontFamily: 'GoghRegular, sans-serif',
    },
    date: {
      color: '#fff',
      fontSize: '18px',
      fontFamily: 'Gogh, sans-serif',
    },
    place: {
      color: '#fff',
      fontSize: '18px',
      fontFamily: 'GoghRegular, sans-serif',
    },
    time: {
      color: '#fff',
      fontSize: '16px',
      fontFamily: 'GoghRegular, sans-serif',
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
    MuiTabs: {
      styleOverrides: {
        root: {},
        indicator: {
          backgroundColor: '#1C1C1C', // Индикатор активной вкладки
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: '#fff', // Цвет текста неактивных вкладок
          '&.Mui-selected': {
            color: '#fff', // Цвет текста активной вкладки
            backgroundColor: '#1C1C1C', // Фон активной вкладки
          },
        },
      },
    },
  },
});

export default theme;
