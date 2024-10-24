import React from 'react';
import logo from '@assets/imgs/logo.png';

import './sass/index.scss';
import { Typography } from '@mui/material';

function Header({ pageTitle }) {
  return (
    <>
      <Typography variant="header">{pageTitle}</Typography>

      <img src={logo} className="mobile-menu__header__img" />
    </>
  );
}

export default Header;
