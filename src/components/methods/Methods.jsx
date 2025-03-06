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

  const handleRedirect = (event) => {
    if (event.target.closest('.card__icon__manual')) {
      navigate(ROUTES.MANUAL.PATH)
    } else if (event.target.closest('.card__icon__scanner')) {
      navigate(ROUTES.SCANNER.PATH)
    }
    onClose()
  }

  if (shouldCloseModal) return null

  return (
    <div className={clsx('modal', { open: isOpen })}>
      <div className='modal__content'>
        <button className='modal__close' onClick={onClose}></button>
        <div className='grid' onClick={handleRedirect}>
          <div className='card'>
            <div className='card__icon__manual' />
            <p className='card__title'>Вручную</p>
          </div>
          <div className='card'>
            <div className='card__icon__scanner' />
            <p className='card__title'>Сканировать</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Methods
