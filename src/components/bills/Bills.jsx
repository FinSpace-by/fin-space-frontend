import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Button } from '@mui/material'
import BackButton from '@components/backButton/BackButton'
import { ICONS_MAP } from '@constants'
import { billsApi } from '@api'

import './sass/index.scss'

function Bills() {
  const navigate = useNavigate()
  const [bills, setBills] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await billsApi.getBills()
        setBills(response.data)
      } catch (err) {
        setError(err.message)
      }
    }

    fetchBills()
  }, [])

  const handleAddBill = () => {
    // Логика добавления нового счёта
  }

  return (
    <div className='bill__container'>
      <div className='bill__header'>
        <Typography variant='h5' align='center' mb={3} fontSize={20}>
          Счета
        </Typography>
        <BackButton />
      </div>

      <div className='bill__content-wrapper'>
        {bills.map((bill) => (
          <div className='bill__content' key={bill.id}>
            <div className='bill__item'>
              <div className='bill__top-row'>
                <Typography variant='caption' className='bill__currency-label'>
                  {bill.currency.name}
                </Typography>
                <img
                  src={ICONS_MAP.editButton}
                  alt='Редактировать'
                  className='bill__edit-icon'
                  onClick={() => navigate(`/edit-bill/${bill.id}`)}
                />
              </div>
              <div className='bill__content-row'>
                <img src={ICONS_MAP.mainBill} alt={bill.name} className='bill__icon' />
                <Typography variant='body1' className='bill__title'>
                  {bill.name}
                </Typography>
                <Typography variant='body1' className='bill__amount'>
                  {bill.balance.toFixed(1)} {bill.currency.name}
                </Typography>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='bill__add-button-container'>
        <Button variant='contained' className='bill__add-button' onClick={handleAddBill}>
          + Добавить счёт
        </Button>
      </div>
    </div>
  )
}

export default Bills
