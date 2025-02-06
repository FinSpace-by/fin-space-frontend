import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ROUTES } from '@constants';

function MobileMenuNav() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('');

  useEffect(() => {
    // Устанавливаем активный элемент в зависимости от текущего маршрута
    const currentPath = location.pathname;
    if (currentPath === ROUTES.CARDS.PATH) {
      setActiveItem('cards');
    } else if (currentPath === ROUTES.ANALITIC.PATH) {
      setActiveItem('analitic');
    } else if (currentPath === ROUTES.FAMILY.PATH) {
      setActiveItem('family');
    } else if (currentPath === ROUTES.PROFILE.PATH) {
      setActiveItem('profile');
    }
  }, [location]);

  const handleIconClick = (item) => {
    setActiveItem(item);
  };

  return (
    <nav className="mobile-menu__nav">
      <ul className="mobile-menu__nav__menu-list">
        <li className="mobile-menu__nav__item">
          <NavLink
            to={ROUTES.CARDS.PATH}
            className="mobile-menu__link mobile-menu__link--cards"
            onClick={() => handleIconClick('cards')}
            style={{ color: activeItem === 'cards' ? '#7268e5' : '#999999' }}
          >
            Карты
          </NavLink>
        </li>
        <li className="mobile-menu__nav__item">
          <NavLink
            to={ROUTES.ANALITIC.PATH}
            className="mobile-menu__link mobile-menu__link--analitic"
            onClick={() => handleIconClick('analitic')}
            style={{ color: activeItem === 'analitic' ? '#7268e5' : '#999999' }}
          >
            Аналитика
          </NavLink>
        </li>
        <li className="mobile-menu__nav__item">
          <div className="icon-container"></div>
        </li>
        <li className="mobile-menu__nav__item">
          <NavLink
            to={ROUTES.FAMILY.PATH}
            className="mobile-menu__link mobile-menu__link--family"
            onClick={() => handleIconClick('family')}
            style={{ color: activeItem === 'family' ? '#7268e5' : '#999999' }}
          >
            Семья
          </NavLink>
        </li>
        <li className="mobile-menu__nav__item">
          <NavLink
            to={ROUTES.PROFILE.PATH}
            className="mobile-menu__link mobile-menu__link--profile"
            onClick={() => handleIconClick('profile')}
            style={{ color: activeItem === 'profile' ? '#7268e5' : '#999999' }}
          >
            Профиль
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MobileMenuNav;
