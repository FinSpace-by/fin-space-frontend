import React from 'react';
import { Outlet } from 'react-router-dom';
import MobileMenuNav from './MobileMenuNav.jsx';
import Header from './Header.jsx';
import { ROUTES } from '@constants';

import './sass/index.scss';

function MobileMenu() {
  return (
    <>
      <div id="header" className="mobile-menu__header">
        <Header />
      </div>
      <div id="mobile-menu" className="mobile-menu__menu">
        <MobileMenuNav />
      </div>
      <div id="content" className="mobile-menu__content">
        <Outlet />
      </div>
    </>
  );
}

export default MobileMenu;
