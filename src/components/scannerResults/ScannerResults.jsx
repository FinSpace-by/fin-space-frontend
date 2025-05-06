import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { categoryApi, accountsApi } from '@api'
import clsx from 'clsx'
import { Typography, MenuItem, Select, FormControl } from '@mui/material'
import { ICONS_MAP } from '@constants'
import BackButton from '@components/backButton/BackButton'
import AddButtonWrapper from '@components/addButtonWrapper/AddButtonWrapper'
import AccountDropdown from '@components/accountDropdown/AccountDropdown'
import SuccessLoader from '@components/successLoader/SuccessLoader'
import { ROUTES } from '@constants'

import './sass/scanner_results.scss'

function ScannerResults() {
  const location = useLocation()
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [amountError, setAmountError] = useState(null)
  const [nameError, setNameError] = useState(null)
  const [accountError, setAccountError] = useState(null)
  const [categoryError, setCategoryError] = useState(null)

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

  const config = {
    isTutorial: location.state?.isTutorial,
    initialItems: location.state?.isTutorial
      ? [{ product: 'Бананы', price: '12.12', category: '' }]
      : location.state?.items?.map((item) => ({
          product: item.product,
          price: item.price,
          category: item.category || '',
        })) || [],
  }
  const [items, setItems] = useState(config.initialItems)

  const handleCategoryChange = (index, newCategory) => {
    setItems((prevItems) =>
      prevItems.map((item, i) => (i === index ? { ...item, category: newCategory } : item))
    )
    if (categoryError) setCategoryError(null)
  }

  const validateItems = () => {
    let isValid = true

    if (!selectedAccount) {
      setAccountError('Выберите счёт')
      isValid = false
    }

    items.forEach((item) => {
      const selectedCategory = categories.find((c) => c.title === item.category)
      if (!item.product) {
        setNameError(`Введите название`)
        isValid = false
      }

      if (!item.price) {
        setAmountError(`Введите сумму расходов`)
        isValid = false
      }

      if (!selectedCategory) {
        setCategoryError(`Выберите категорию`)
        isValid = false
      }
    })

    return isValid
  }

  const handleSubmit = async () => {
    setAmountError(null)
    setNameError(null)
    setAccountError(null)
    setCategoryError(null)

    if (!validateItems()) {
      return
    }

    if (config.isTutorial) {
      navigate(ROUTES.CARDS.PATH)
      return
    }

    const body = items.map((item) => {
      const selectedCategory = categories.find((c) => c.title === item.category)
      return {
        amount: item.price,
        categoryId: selectedCategory?.categoryId || null,
        accountId: selectedAccount?.id,
      }
    })

    try {
      await categoryApi.addExpenses(body)
      setIsSuccess(true)
      setTimeout(() => {
        navigate(ROUTES.CARDS.PATH)
      }, 1500)
    } catch (error) {}
  }

  const handleProductChange = (index, newValue) => {
    setItems((prevItems) =>
      prevItems.map((item, i) => (i === index ? { ...item, product: newValue } : item))
    )
    if (nameError) {
      setNameError(null)
    }
  }

  const handlePriceChange = (index, newValue) => {
    if (/^\d*\.?\d*$/.test(newValue)) {
      setItems((prevItems) =>
        prevItems.map((item, i) => (i === index ? { ...item, price: newValue } : item))
      )
      if (amountError) {
        setAmountError(null)
      }
    }
  }

  const handleAccountSelect = (account) => {
    setSelectedAccount(account)
    if (accountError) setAccountError(null)
  }

  return (
    <div className='analitic__tabs__container'>
      <SuccessLoader isSuccess={isSuccess} />
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
          <AccountDropdown
            selectedAccount={selectedAccount}
            onAccountSelect={handleAccountSelect}
            error={accountError}
          />

          {items.map((item, index) => (
            <div key={index} className='analitic__tabContent__block'>
              <div className='analitic__tabContent__header'>
                <Typography variant='h5' mt={2} fontSize={17}>
                  Название
                </Typography>
              </div>
              <div className={clsx('analitic__inputWrapper', { error: nameError })}>
                <input
                  type='text'
                  value={item.product}
                  onChange={(e) => handleProductChange(index, e.target.value)}
                />
              </div>
              {nameError && index === 0 && (
                <Typography variant='body2' className='error-message'>
                  {nameError}
                </Typography>
              )}

              <div className='analitic__tabContent__header'>
                <Typography variant='h5' mt={2} fontSize={17}>
                  Сумма
                </Typography>
              </div>
              <div className={clsx('analitic__inputWrapper', { error: amountError })}>
                <input
                  type='text'
                  value={item.price}
                  onChange={(e) => handlePriceChange(index, e.target.value)}
                />
                <span className='currency'>BYN</span>
              </div>
              {amountError && index === 0 && (
                <Typography variant='body2' className='error-message'>
                  {amountError}
                </Typography>
              )}

              <div className='analitic__tabContent__header'>
                <Typography variant='h5' mt={2} fontSize={17}>
                  Категория
                </Typography>
              </div>
              <div className={clsx('analitic__inputWrapper', { error: categoryError })}>
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
              {categoryError && (
                <Typography variant='body2' className='error-message'>
                  {categoryError}
                </Typography>
              )}
            </div>
          ))}
        </div>
      )}

      <AddButtonWrapper onClick={handleSubmit} />
    </div>
  )
}

export default ScannerResults
