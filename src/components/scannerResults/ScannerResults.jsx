import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material'
import BackButton from '@components/backButton/BackButton'
import AddButtonWrapper from '@components/addButtonWrapper/AddButtonWrapper'

import './sass/scanner_results.scss'

const CATEGORIES_LIST = ['Еда', 'Одежда', 'Транспорт', 'Развлечения', 'Прочее']

function ScannerResults() {
  const navigate = useNavigate()
  const location = useLocation()

  const [items, setItems] = useState(
    location.state?.items.map((item) => ({ ...item, category: '' })) || []
  )

  const handleCategoryChange = (index, newCategory) => {
    setItems((prevItems) =>
      prevItems.map((item, i) => (i === index ? { ...item, category: newCategory } : item))
    )
  }

  return (
    <div className='analitic__tabs__container'>
      <div className='analitic__tabs__header'>
        <Typography variant='h5' align='center' mb={3} fontSize={20}>
          Результаты сканирования
        </Typography>
        <BackButton />
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
                <input type='text' value={item.price} />
                <span className='currency'>BYN</span>
              </div>

              <div className='analitic__tabContent__header'>
                <Typography variant='h5' mt={2} fontSize={17}>
                  Категория
                </Typography>
              </div>
              <div className='analitic__inputWrapper'>
                <FormControl fullWidth>
                  <Select
                    value={item.category}
                    onChange={(e) => handleCategoryChange(index, e.target.value)}
                  >
                    {CATEGORIES_LIST.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddButtonWrapper onClick={() => console.log(items)} />
    </div>
  )
}

export default ScannerResults
