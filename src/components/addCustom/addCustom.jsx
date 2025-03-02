import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Typography } from '@mui/material'
import { expensesApi, incomeApi } from '@api'
import AddButtonWrapper from '@components/addButtonWrapper/AddButtonWrapper'
import { ICONS_MAP } from '@api/icons'

import './sass/index.scss'

function AddCustom() {
  const navigate = useNavigate()
  const location = useLocation()

  const [categoryName, setCategoryName] = useState('')

  const handleArrow = () => {
    navigate(-1)
  }

  const handleCategoryChange = (e) => {
    setCategoryName(e.target.value)
  }

  const handleAdd = async () => {
    if (!categoryName.trim()) return

    const body = {
      iconUrl: ICONS_MAP['custom'],
      name: categoryName,
    }

    try {
      if (location.state?.from === 'add-expenses-manual') {
        await expensesApi.addCustom(body)
      } else if (location.state?.from === 'add-income-manual') {
        await incomeApi.addCustom(body)
      } else {
        return
      }
      navigate(-1)
    } catch (error) {}
  }

  return (
    <div className='analitic__tabs__container'>
      <div className='analitic__tabs__header'>
        <Typography variant='h5' align='center' mb={3} fontSize={20}>
          Добавить категорию
        </Typography>
        <button className='arrow' onClick={handleArrow}></button>
      </div>
      <div className='analitic__tabContent'>
        <div className='analitic__tabContent__header'>
          <Typography variant='h5' fontSize={17}>
            Название категории
          </Typography>
        </div>
        <div className='analitic__inputWrapper'>
          <input
            type='text'
            placeholder='Введите название категории'
            value={categoryName}
            onChange={handleCategoryChange}
          />
        </div>
      </div>
      <AddButtonWrapper onClick={handleAdd} />
    </div>
  )
}

export default AddCustom
