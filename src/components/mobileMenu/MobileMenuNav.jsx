import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ROUTES } from '@constants'
import { ACTIVE_ITEMS, menuItems } from './MobileMenuNav.const.js'
import Methods from '../methods/Methods.jsx'
import AppTutorial from '@components/appTutorial/AppTutorial'
import clsx from 'clsx'

function MobileMenuNav() {
  const location = useLocation()
  const [activeItem, setActiveItem] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const currentPath = location.pathname

    switch (currentPath) {
      case ROUTES.CARDS.PATH:
        setActiveItem(ACTIVE_ITEMS.CARDS)
        break
      case ROUTES.ANALITIC.PATH:
        setActiveItem(ACTIVE_ITEMS.ANALITIC)
        break
      case ROUTES.INCOME.PATH:
        setActiveItem(ACTIVE_ITEMS.INCOME)
        break
      case ROUTES.PROFILE.PATH:
        setActiveItem(ACTIVE_ITEMS.PROFILE)
        break
    }
  }, [location])

  const handleCardsClick = (e) => {
    e.preventDefault()
    setActiveItem(ACTIVE_ITEMS.CARDS)
    setIsModalOpen(true)
  }

  const handleIconClick = (item) => {
    setActiveItem(item)
  }

  const handleMenuItemClick = (key, e) => {
    if (key === 'analitic') {
      handleCardsClick(e)
    } else {
      handleIconClick(key)
    }
  }

  const isScannerPage = location.pathname === ROUTES.SCANNER.PATH

  return (
    <nav className='mobile-menu__nav'>
      <ul className='mobile-menu__nav__menu-list'>
        {menuItems.map(({ path, label, key, className, isIcon }) => (
          <li className='mobile-menu__nav__item' key={key || className}>
            {isIcon ? (
              <div className={className}></div>
            ) : (
              <NavLink
                to={path}
                className={clsx('mobile-menu__link', `mobile-menu__link--${key}`, {
                  'mobile-menu__link--active': activeItem === key,
                })}
                onClick={(e) => handleMenuItemClick(key, e)}
              >
                {label}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
      <AppTutorial onOpenModal={() => setIsModalOpen(true)} />
      {!isScannerPage && <Methods isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </nav>
  )
}

export default MobileMenuNav
