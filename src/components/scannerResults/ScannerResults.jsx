import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { categoryApi } from '@api'
import {
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from '@mui/material'
import { ICONS_MAP } from '@constants'
import BackButton from '@components/backButton/BackButton'
import AddButtonWrapper from '@components/addButtonWrapper/AddButtonWrapper'

import './sass/scanner_results.scss'

function ScannerResults() {
  const location = useLocation()
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [items, setItems] = useState(
    location.state?.items.map((item) => ({ ...item, category: '' })) || []
  )
  const [openSnackbar, setOpenSnackbar] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryApi.getExpenses()
        const fetchedCategories = response.data.map(({ name, iconUrl, id }) => ({
          title: name,
          icon: ICONS_MAP[iconUrl] || ICONS_MAP['custom'],
          categoryId: id,
        }))
        setCategories(fetchedCategories)
      } catch (error) {}
    }
    fetchCategories()
  }, [])

  const handleCategoryChange = (index, newCategory) => {
    setItems((prevItems) =>
      prevItems.map((item, i) => (i === index ? { ...item, category: newCategory } : item))
    )
  }

  const handleSubmit = async () => {
    const allCategoriesSelected = items.every((item) => item.category)

    if (!allCategoriesSelected) {
      setOpenSnackbar(true)
      return
    }

    const body = items.map((item) => {
      const selectedCategory = categories.find((c) => c.title === item.category)
      return {
        amount: item.price,
        categoryId: selectedCategory?.categoryId || null,
      }
    })

    try {
      await categoryApi.addExpenses(body)
      navigate('/cards')
    } catch (error) {}
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
        <Typography variant='body1' align='center' className='no-products-message'>
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
                    displayEmpty
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 250,
                          overflowY: 'auto',
                        },
                      },
                    }}
                    renderValue={(selected) => {
                      const selectedCategory = categories.find(
                        (category) => category.title === selected
                      )
                      return selectedCategory ? (
                        <div className='category-select'>
                          <img src={selectedCategory.icon} alt={selectedCategory.title} />
                          {selectedCategory.title}
                        </div>
                      ) : (
                        'Выберите категорию'
                      )
                    }}
                  >
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <MenuItem key={category.categoryId} value={category.title}>
                          <div
                            className='category-menu-item'
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <img
                              src={category.icon}
                              alt={category.title}
                              style={{ width: 24, height: 24, marginRight: 8 }}
                            />
                            <span>{category.title}</span>
                          </div>
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>Нет доступных категорий</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddButtonWrapper onClick={handleSubmit} />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity='warning' onClose={() => setOpenSnackbar(false)}>
          Пожалуйста, выберите категорию для всех товаров!
        </Alert>
      </Snackbar>
    </div>
  )
}

export default ScannerResults
