import { createTheme } from '@mui/material/styles'

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
    categoryAll: {
      color: '#7268E5',
      fontSize: '20px',
      fontFamily: 'GoghRegular, sans-serif',
    },
    category: {
      color: '#fff',
      fontSize: '20px',
      fontFamily: 'GoghRegular, sans-serif',
      marginTop: '16px',
    },
    plus: {
      color: '#fff',
      fontSize: '40px',
      fontFamily: 'GoghRegular, sans-serif',
    },
    graphic: {
      color: '#000',
      fontSize: '20px',
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
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: '#fff',
          backgroundColor: 'transparent',
          borderRadius: '3vw',
          border: '0.5px solid #fff',
          '& .MuiInputBase-input': {
            color: '#fff',
            backgroundColor: 'transparent',
            borderRadius: '3vw',
            border: '0.7px solid #fff',
          },
        },
        input: {
          color: '#fff',
          backgroundColor: 'transparent',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: '#fff',
        },
        select: {
          backgroundColor: 'transparent',
          color: '#fff !important',
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: '3vw !important',
          background: '#111111 !important',
          color: '#fff !important',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#5c4ce3 !important',
            borderRadius: '2vw !important',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: '#fff',
          backgroundColor: 'transparent',
          '&::placeholder': {
            color: '#717171',
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
        indicator: {
          backgroundColor: '#1C1C1C',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: '#fff',
          '&.Mui-selected': {
            color: '#fff',
            backgroundColor: '#1C1C1C',
          },
        },
      },
    },
  },
})

export default theme
