import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
import clsx from 'clsx'
import { ROUTES } from '@constants'
import { categoryApi } from '@api'
import { ICONS_MAP, AMOUNT_REGEX } from '@constants'
import { LOCATION_STATES } from '@constants'
import AddButtonWrapper from '@components/addButtonWrapper/AddButtonWrapper'
import BackButton from '@components/backButton/BackButton'
import AccountDropdown from '@components/accountDropdown/AccountDropdown'
import add_custom from '@assets/icons/add_custom.svg'
import Loader from '@components/Loader'
import SuccessLoader from '@components/successLoader/SuccessLoader'

import './sass/index.scss'

function AddExpensesManual() {
  const navigate = useNavigate()

  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [amount, setAmount] = useState('')
  const amountInputRef = useRef(null)
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [amountError, setAmountError] = useState(null)
  const [accountError, setAccountError] = useState(null)
  const [showCategoryAlert, setShowCategoryAlert] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryApi.getIncomes()
        const fetchedCategories = response.data.map(({ name, iconUrl, id }) => ({
          title: name,
          icon: ICONS_MAP[iconUrl] || ICONS_MAP['custom'],
          categoryId: id,
        }))
        setCategories([
          { icon: add_custom, title: 'Добавить категорию', categoryId: '1' },
          ...fetchedCategories,
        ])
      } catch (error) {
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleCategoryClick = (category) => {
    if (category.title === 'Добавить категорию') {
      navigate(ROUTES.ADD_CUSTOM.PATH, { state: { from: LOCATION_STATES.ADD_INCOME_MANUAL } })
    }
    setSelectedCategory(category)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => {
      if (amountInputRef.current) {
        amountInputRef.current.focus()
      }
    }, 300)
  }

  const handleAmountChange = (e) => {
    setAmount(e.target.value)
    if (amountError) {
      setAmountError(null)
    }
  }

  const handleAccountSelect = (account) => {
    setSelectedAccount(account)
    if (accountError) {
      setAccountError(null)
    }
  }

  const handleAdd = async () => {
    if (!amount) {
      setAmountError('Введите сумму доходов')
      if (amountInputRef.current) {
        amountInputRef.current.focus()
      }
      return
    }

    if (!AMOUNT_REGEX.test(amount)) {
      setAmountError('Введите корректную сумму')
      if (amountInputRef.current) {
        amountInputRef.current.focus()
      }
      return
    }

    if (!selectedAccount) {
      setAccountError('Выберите счёт')
      return
    }

    if (!selectedCategory) {
      setShowCategoryAlert(true)
      setTimeout(() => setShowCategoryAlert(false), 3000)
      return
    }

    setIsSuccess(false)

    try {
      const body = {
        amount: amount,
        categoryId: selectedCategory.categoryId,
        accountId: selectedAccount.id,
      }

      await categoryApi.addIncome(body)
      setIsSuccess(true)

      setAmount('')
      setSelectedCategory(null)
      setSelectedAccount(null)
      setIsAccountDropdownOpen(false)
    } catch (error) {}
  }

  return (
    <div className='analitic__tabs__container'>
      <Loader isLoading={isLoading} />
      <SuccessLoader isSuccess={isSuccess} />
      <div className='analitic__tabs__header'>
        <Typography variant='h5' align='center' mb={3} fontSize={20}>
          Добавить доход
        </Typography>
        <BackButton />
      </div>
      <div className='analitic__tabContent'>
        <div className='analitic__tabContent__header'>
          <Typography variant='h5' fontSize={17}>
            Сумма
          </Typography>
        </div>
        <div className={clsx('analitic__inputWrapper', { error: amountError })}>
          <input
            type='text'
            placeholder='0'
            value={amount}
            onChange={handleAmountChange}
            ref={amountInputRef}
          />
          <span className='currency'>BYN</span>
        </div>
        {amountError && (
          <Typography variant='body2' className='error-message'>
            {amountError}
          </Typography>
        )}
        <AccountDropdown
          selectedAccount={selectedAccount}
          onAccountSelect={handleAccountSelect}
          error={accountError}
        />
        <div className='analitic__tabContent__header'>
          <Typography variant='h5' mt={2} fontSize={17}>
            Категория
          </Typography>
        </div>
        {categories.map((category, index) => (
          <div
            key={index}
            className='analitic__tab__category'
            onClick={() => handleCategoryClick(category)}
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
      <AddButtonWrapper onClick={handleAdd} />
      {showCategoryAlert && (
        <div className='alert-container'>
          <div className='category-alert'>Выберите категорию</div>
        </div>
      )}
    </div>
  )
}

export default AddExpensesManual
