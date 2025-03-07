import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Typography } from '@mui/material'
import { ROUTES } from '@constants'
import AddButtonWrapper from '@components/addButtonWrapper/AddButtonWrapper'

import './sass/scanner_results.scss'

function ScannerResults() {
  const navigate = useNavigate()
  const location = useLocation()

  const [items, setItems] = useState(location.state?.items || [])

  const handleArrow = () => {
    navigate(-1)
  }

  const handleAdd = async () => {}

  return (
    <div className='analitic__tabs__container'>
      <div className='analitic__tabs__header'>
        <Typography variant='h5' align='center' mb={3} fontSize={20}>
          Результаты сканирования
        </Typography>
        <button className='arrow' onClick={handleArrow}></button>
      </div>

      {items.length === 0 ? (
        <Typography variant='body1' align='center'>
          Нет продуктов для отображения
        </Typography>
      ) : (
        <div className='analitic__tabContent'>
          {items.map((item, index) => (
            <div key={index} className='analitic__tabContent__block'>
              <div className='analitic__tabContent__header'>
                <Typography variant='h5' mt={2} fontSize={17}>
                  Название
                </Typography>
              </div>
              <div className='analitic__inputWrapper'>
                <input type='text' value={item.product} readOnly />
              </div>

              <div className='analitic__tabContent__header'>
                <Typography variant='h5' mt={2} fontSize={17}>
                  Сумма
                </Typography>
              </div>
              <div className='analitic__inputWrapper'>
                <input type='text' value={item.price} readOnly />
                <span className='currency'>BYN</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddButtonWrapper onClick={handleAdd} />
    </div>
  )
}

export default ScannerResults
