import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ROUTES } from '@constants';

function MobileMenuNav() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('');

  const ACTIVE_ITEMS = {
    CARDS: 'cards',
    ANALITIC: 'analitic',
    FAMILY: 'family',
    PROFILE: 'profile',
  };
  
  useEffect(() => {
    const currentPath = location.pathname;
  
    switch (currentPath) {
      case ROUTES.CARDS.PATH:
        setActiveItem(ACTIVE_ITEMS.CARDS);
        break;
      case ROUTES.ANALITIC.PATH:
        setActiveItem(ACTIVE_ITEMS.ANALITIC);
        break;
      case ROUTES.FAMILY.PATH:
        setActiveItem(ACTIVE_ITEMS.FAMILY);
        break;
      case ROUTES.PROFILE.PATH:
        setActiveItem(ACTIVE_ITEMS.PROFILE);
        break;
      //default:
        //setActiveItem(null);
    }
  }, [location]);

  const handleIconClick = (item) => {
    setActiveItem(item);
  };

  const menuItems = [
  { path: ROUTES.CARDS.PATH, label: 'Карты', key: 'cards' },
  { path: ROUTES.ANALITIC.PATH, label: 'Аналитика', key: 'analitic' },
  { className: 'icon-container', isIcon: true }, // Пункт для иконки
  { path: ROUTES.FAMILY.PATH, label: 'Семья', key: 'family' },
  { path: ROUTES.PROFILE.PATH, label: 'Профиль', key: 'profile' },
  ];

  return (
    <nav className="mobile-menu__nav">
      <ul className="mobile-menu__nav__menu-list">
        {menuItems.map(({ path, label, key, className, isIcon }) => (
          <li className="mobile-menu__nav__item" key={key || className}>
            {isIcon ? (
              <div className={className}></div>
            ) : (
              <NavLink
                to={path}
                className={`mobile-menu__link mobile-menu__link--${key}`}
                onClick={() => handleIconClick(key)}
                style={{ color: activeItem === key ? '#7268e5' : '#999999' }}
              >
                {label}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );  
}

export default MobileMenuNav;
