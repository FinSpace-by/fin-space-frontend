import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import MobileMenuNav from './MobileMenuNav.jsx'
import Header from './Header.jsx'
import { ROUTES } from '@constants'

import './sass/index.scss'

function MobileMenu() {
  const location = useLocation()

  const getPageTitle = () => {
    switch (location.pathname) {
      case ROUTES.CARDS.PATH:
        return ROUTES.CARDS.TITLE
      case ROUTES.ANALITIC.PATH:
        return ROUTES.ANALITIC.TITLE
      case ROUTES.INCOME.PATH:
        return ROUTES.INCOME.TITLE
      default:
        return 'Белкарт'
    }
  }

  return (
    <>
      <div id='header' className='mobile-menu__header'>
        <Header pageTitle={getPageTitle()} />
      </div>
      <div id='mobile-menu' className='mobile-menu__menu'>
        <MobileMenuNav />
      </div>
      <div id='content' className='mobile-menu__content'>
        <Outlet />
      </div>
    </>
  )
}

export default MobileMenu
