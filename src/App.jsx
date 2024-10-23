import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTER_ROUTES } from '@constants';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import NotFound from '@components/notFound/NotFound';
import MainPage from '@components/mainPage/MainPage';
import MobileMenu from '@components/mobileMenu/MobileMenu';
import NotAvailable from '@components/notAvailable/NotAvailable';

import './sass/index.scss';

function App() {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (
      /android/i.test(userAgent) ||
      (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)
    ) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  if (isMobile === null) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {isMobile ? (
            <Routes>
              <Route path={ROUTER_ROUTES.NOT_FOUND} element={<NotFound />} />
              <Route path={ROUTER_ROUTES.ROOT}>
                <Route index element={<NotFound />} />
                <Route
                  path={ROUTER_ROUTES.MOBILE_MENU}
                  element={<MobileMenu />}
                >
                  <Route path={ROUTER_ROUTES.CARDS} element={<MainPage />} />
                </Route>
              </Route>
            </Routes>
          ) : (
            <Routes>
              <Route
                path={ROUTER_ROUTES.NOT_FOUND}
                element={<NotAvailable />}
              />
            </Routes>
          )}
        </ThemeProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
