import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
import { ROUTES } from '@constants'
import { categoryApi } from '@api'
import { ICONS_MAP } from '@constants'
import { LOCATION_STATES } from '@constants'
import BackButton from '@components/backButton/BackButton'
import AddButtonWrapper from '@components/addButtonWrapper/AddButtonWrapper'
import AccountDropdown from '@components/accountDropdown/AccountDropdown'
import add_custom from '@assets/icons/add_custom.svg'
import Loader from '@components/Loader'

import './sass/index.scss'

function AddExpensesManual() {
  const navigate = useNavigate()

  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [amount, setAmount] = useState('')
  const amountInputRef = useRef(null)
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryApi.getExpenses()
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
      navigate(ROUTES.ADD_CUSTOM.PATH, { state: { from: LOCATION_STATES.ADD_EXPENSES_MANUAL } })
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
  }

  const handleAdd = async () => {
    if (!selectedCategory || !amount || !selectedAccount) return

    try {
      const body = {
        amount: Number(amount),
        categoryId: selectedCategory.categoryId,
        accountId: selectedAccount.id,
      }

      await categoryApi.addExpense(body)

      setAmount('')
      setSelectedCategory(null)
      setSelectedAccount(null)
      setIsAccountDropdownOpen(false)
    } catch (error) {}
  }

  return (
    <div className='analitic__tabs__container'>
      <Loader isLoading={isLoading} />
      <div className='analitic__tabs__header'>
        <Typography variant='h5' align='center' mb={3} fontSize={20}>
          Добавить расход
        </Typography>
        <BackButton />
      </div>
      <div className='analitic__tabContent'>
        <div className='analitic__tabContent__header'>
          <Typography variant='h5' fontSize={17}>
            Сумма
          </Typography>
        </div>
        <div className='analitic__inputWrapper'>
          <input
            type='text'
            placeholder='0'
            value={amount}
            onChange={handleAmountChange}
            ref={amountInputRef}
          />
          <span className='currency'>BYN</span>
        </div>
        <AccountDropdown selectedAccount={selectedAccount} onAccountSelect={setSelectedAccount} />
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
    </div>
  )
}

export default AddExpensesManual
