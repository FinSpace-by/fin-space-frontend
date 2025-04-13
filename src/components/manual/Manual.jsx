import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Tabs, Tab, TextField, Button } from '@mui/material'
import { ROUTES } from '@constants'
import BackButton from '@components/backButton/BackButton'
import add_expenses from '@assets/icons/add_expenses.svg'
import add_income from '@assets/icons/add_income.svg'

import './sass/index.scss'

const CATEGORIES = [
  {
    icon: add_expenses,
    title: 'Добавить расход',
    key: 'expenses',
  },
  {
    icon: add_income,
    title: 'Добавить доход',
    key: 'income',
  },
]

function Manual() {
  const navigate = useNavigate()

  const handleChoise = (key) => {
    if (key === 'expenses') {
      navigate(ROUTES.ADD_EXPENSES_MANUAL.PATH)
    } else if (key === 'income') {
      navigate(ROUTES.ADD_INCOME_MANUAL.PATH)
    }
  }

  return (
    <div className='analitic__tabs__container'>
      <div className='analitic__tabs__header'>
        <Typography variant='h5' align='center' mb={3} fontSize={20}>
          Добавить вручную
        </Typography>
        <BackButton />
      </div>
      <div className='analitic__tabContent'>
        <div className='analitic__tabContent__header'>
          <Typography variant='h5' fontSize={17}>
            Выберите тип
          </Typography>
        </div>
        {CATEGORIES.map((category, index) => (
          <div
            key={index}
            className='analitic__tab__category'
            onClick={() => handleChoise(category.key)}
          >
            <div className='category-header'>
              <Typography variant='category' className='category-icon'>
                <img src={category.icon} alt='icon' />
              </Typography>
              <Typography variant='category' className='category-title'>
                {category.title}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Manual
