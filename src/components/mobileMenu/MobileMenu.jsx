import React from 'react';
import { Outlet } from 'react-router-dom';
import MobileMenuNav from './MobileMenuNav.jsx';
import { ROUTES } from '@constants';

import './sass/index.scss';

function MobileMenu() {
  return (
    <>
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
