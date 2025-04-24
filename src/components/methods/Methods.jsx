import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { REDIRECT_TYPES, ROUTES, SCAN_TYPES } from '@constants'
import clsx from 'clsx'

import './sass/index.scss'

const IS_MODAL_DISABLED_PATHS = [ROUTES.ADD_INCOME_MANUAL.PATH, ROUTES.ADD_EXPENSES_MANUAL.PATH]

const Methods = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const shouldCloseModal = IS_MODAL_DISABLED_PATHS.includes(location.pathname)

  const handleRedirect = (type) => {
    if (type === REDIRECT_TYPES.MANUAL) {
      navigate(ROUTES.MANUAL.PATH)
    } else if (type === REDIRECT_TYPES.SCANNER) {
      navigate(ROUTES.SCANNER.PATH, { state: { scanType: SCAN_TYPES.RECEIPT } })
    } else if (type === REDIRECT_TYPES.QR) {
      navigate(ROUTES.SCANNER.PATH, { state: { scanType: SCAN_TYPES.QR } })
    }
    onClose()
  }

  if (shouldCloseModal) return null

  return (
    <div className={clsx('modal', { open: isOpen })}>
      <div className='modal__content'>
        <button className='modal__close' onClick={onClose}></button>
        <div className='grid'>
          <div className='card' onClick={() => handleRedirect(REDIRECT_TYPES.MANUAL)}>
            <div className='card__icon__manual' />
            <p className='card__title'>Вручную</p>
          </div>
          <div className='card' onClick={() => handleRedirect(REDIRECT_TYPES.SCANNER)}>
            <div className='card__icon__scanner' />
            <p className='card__title'>Физический чек</p>
          </div>
          <div className='card' onClick={() => handleRedirect(REDIRECT_TYPES.QR)}>
            <div className='card__icon__qr' />
            <p className='card__title'>QR код</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Methods
