import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '@constants';

function MobileMenuNav({}) {
  return (
    <nav className="mobile-menu__nav">
      <ul className="mobile-menu__nav__menu-list">
        <li className="mobile-menu__nav__item">
          <NavLink
            to={ROUTES.CARDS.PATH}
            className="mobile-menu__link mobile-menu__link--cards"
          />
        </li>
        <li className="mobile-menu__nav__item">
          <NavLink
            to={ROUTES.ANALITIC.PATH}
            className="mobile-menu__link mobile-menu__link--analitic"
          />
        </li>
        <li className="mobile-menu__nav__item">
          <NavLink
            to={ROUTES.FAMILY.PATH}
            className="mobile-menu__link mobile-menu__link--family"
          />
        </li>
        <li className="mobile-menu__nav__item">
          <NavLink
            to={ROUTES.FAMILY.PATH}
            className="mobile-menu__link mobile-menu__link--profile"
          />
        </li>
      </ul>
    </nav>
  );
}

export default MobileMenuNav;
