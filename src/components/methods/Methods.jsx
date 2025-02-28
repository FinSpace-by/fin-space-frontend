import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ROUTES } from '@constants'
import clsx from 'clsx'
import './sass/index.scss'

const IS_MODAL_DISABLED_PATHS = [ROUTES.ADD_INCOME_MANUAL.PATH, ROUTES.ADD_EXPENSES_MANUAL.PATH]

const Methods = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const shouldCloseModal = IS_MODAL_DISABLED_PATHS.includes(location.pathname)

  const handleRedirect = () => {
    navigate(ROUTES.MANUAL.PATH)
    onClose()
  }

  if (shouldCloseModal) return null

  return (
    <div className={clsx('modal', { open: isOpen })}>
      <div className='modal__content'>
        <button className='modal__close' onClick={onClose}></button>
        <div className='grid'>
          <div className='card' onClick={handleRedirect}>
            <div className='card__icon' />
            <p className='card__title'>Вручную</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Methods
