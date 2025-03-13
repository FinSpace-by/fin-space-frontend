import React, { useState, useEffect } from 'react'
import { Typography, IconButton } from '@mui/material'
import clsx from 'clsx'
import EditIcon from '@assets/imgs/edit_icon.png'
import ExpensesIcon from '@assets/imgs/expenses_icon.png'
import ExpensesActiveIcon from '@assets/imgs/expenses_active_icon.png'
import IncomesIcon from '@assets/imgs/incomes_icon.png'
import IncomesActiveIcon from '@assets/imgs/incomes_active_icon.png'
import CalendarIcon from '@assets/imgs/calendar_icon.png'
import PieChartIcon from '@assets/imgs/pie_chart_icon.png'
import PieChart from '@components/pieChart/PieChart'
import { categoryApi, userApi } from '@api'
import { ICONS_MAP } from '@constants'

import './sass/index.scss'

const dates = {
  Пн: '06.12.2025',
  Вт: '07.12.2025',
  Ср: '08.12.2025',
  Чт: '09.12.2025',
  Пт: '10.12.2025',
  Сб: '11.12.2025',
  Вс: '12.12.2025',
}

const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

function Cards() {
  const [selectedDay, setSelectedDay] = useState('Вс')
  const [selectedDate, setSelectedDate] = useState(dates['Вс'])
  const [isEditingBalance, setIsEditingBalance] = useState(false)
  const [balance, setBalance] = useState(0)
  const [userExpenses, setUserExpenses] = useState(0)
  const [userIncomes, setUserIncomes] = useState(0)
  const [Ecategories, setECategories] = useState([])
  const [Icategories, setICategories] = useState([])
  const [showExpenses, setShowExpenses] = useState(true)
  const [showIncomes, setShowIncomes] = useState(false)
  const [currentType, setCurrentType] = useState([])
  const [currentAmount, setCurrentAmount] = useState(0)
  const [isPieChartVisible, setIsPieChartVisible] = useState(false)

  useEffect(() => {
    const fetchUserBalance = async () => {
      try {
        const response = await userApi.getUserBalance()
        setBalance(response.data.toFixed(2))
      } catch (error) {}
    }

    const fetchUserExpenses = async () => {
      try {
        const response = await categoryApi.getUserExpenses()
        const totalExpenses = response.data.reduce((acc, expense) => acc + expense.totalIncome, 0)
        setUserExpenses(totalExpenses.toFixed(2))
      } catch (error) {}
    }

    const fetchUserIncomes = async () => {
      try {
        const response = await categoryApi.getUserIncomes()
        const totalIncomes = response.data.reduce((acc, income) => acc + income.totalIncome, 0)
        setUserIncomes(totalIncomes.toFixed(2))
      } catch (error) {}
    }

    const fetchECategories = async () => {
      try {
        const response = await categoryApi.getUserExpenses()
        const fetchedCategories = response.data.map(
          ({ categoryName, categoryIconUrl, totalIncome }) => ({
            title: categoryName,
            icon: ICONS_MAP[categoryIconUrl] || ICONS_MAP['custom'],
            amount: totalIncome.toFixed(2),
          })
        )
        setECategories(fetchedCategories)
      } catch (error) {}
    }

    const fetchICategories = async () => {
      try {
        const response = await categoryApi.getUserIncomes()
        const fetchedCategories = response.data.map(
          ({ categoryName, categoryIconUrl, totalIncome }) => ({
            title: categoryName,
            icon: ICONS_MAP[categoryIconUrl] || ICONS_MAP['custom'],
            amount: totalIncome.toFixed(2),
          })
        )
        setICategories(fetchedCategories)
      } catch (error) {}
    }

    fetchUserBalance()
    fetchUserExpenses()
    fetchUserIncomes()
    fetchECategories()
    fetchICategories()
  }, [])

  useEffect(() => {
    if (showExpenses) {
      setCurrentType(Ecategories)
      setCurrentAmount(userExpenses)
    } else if (showIncomes) {
      setCurrentType(Icategories)
      setCurrentAmount(userIncomes)
    }
  }, [showExpenses, showIncomes, Ecategories, Icategories])

  const handlePieChartClick = () => {
    setIsPieChartVisible(!isPieChartVisible)
  }

  const handleDayClick = (day) => {
    setSelectedDay(day)
    setSelectedDate(dates[day])
  }

  const handleBalanceChange = (event) => {
    const value = event.target.value
    if (/^\d*\.?\d*$/.test(value)) {
      setBalance(value)
    }
  }

  const handleEditClick = () => {
    setIsEditingBalance(!isEditingBalance)
  }

  const handleBlur = () => {
    const numericValue = parseFloat(balance)
    if (!isNaN(numericValue)) {
      updateBalance(numericValue)
    } else {
      setBalance(0)
    }
    setIsEditingBalance(false)
  }

  const updateBalance = async (newBalance) => {
    try {
      await userApi.updateBalance({ balance: newBalance })
    } catch (error) {}
  }

  const handleShowExpenses = () => {
    if (!showExpenses) {
      setShowExpenses(true)
      setShowIncomes(false)
    }
  }

  const handleShowIncomes = () => {
    if (!showIncomes) {
      setShowIncomes(true)
      setShowExpenses(false)
    }
  }

  return (
    <div className='cards__container'>
      <div className='header-container'>
        <div className='balance'>
          <div className='balance-text-edit-button'>
            <Typography variant='body1' className='balance-label'>
              Общий баланс
            </Typography>
            {!isEditingBalance && (
              <IconButton onClick={handleEditClick} className='edit-link'>
                <img src={EditIcon} className='edit-icon' alt='Edit' />
              </IconButton>
            )}
          </div>
          {isEditingBalance ? (
            <input
              type='text'
              value={balance}
              onChange={handleBalanceChange}
              onBlur={handleBlur}
              autoFocus
              step='0.01'
              className='balance-edit-entry'
            />
          ) : (
            <Typography variant='h4' className='balance-amount' onClick={handleEditClick}>
              {balance} BYN
            </Typography>
          )}
        </div>
      </div>
      <div className='expenses-income-sum'>
        <IconButton
          onClick={handleShowExpenses}
          className={`expenses-income-sum1 ${showExpenses ? 'active' : ''}`}
        >
          <img
            src={showExpenses ? ExpensesActiveIcon : ExpensesIcon}
            className='expenses-incomes-icon'
            alt='Expenses'
          />
          <Typography className={`expenses-button-text ${showExpenses ? 'active' : ''}`}>
            {userExpenses}
          </Typography>
          <Typography className={`expenses-button-text opacity ${showExpenses ? 'active' : ''}`}>
            BYN
          </Typography>
        </IconButton>
        <IconButton
          onClick={handleShowIncomes}
          className={`expenses-income-sum2 ${showIncomes ? 'active' : ''}`}
        >
          <img
            src={showIncomes ? IncomesActiveIcon : IncomesIcon}
            className='expenses-incomes-icon'
            alt='Incomes'
          />
          <Typography className={`incomes-button-text ${showIncomes ? 'active' : ''}`}>
            {userIncomes}
          </Typography>
          <Typography className={`incomes-button-text opacity ${showIncomes ? 'active' : ''}`}>
            BYN
          </Typography>
        </IconButton>
      </div>
      <div className='graphic-name-container'>
        <Typography className='page-title1'>Аналитика</Typography>
        <IconButton className='graphic-date-selector'>
          {selectedDate}
          <img src={CalendarIcon} className='calender-icon' alt='Calendar' />
        </IconButton>
      </div>

      {!isPieChartVisible && (
        <div className='analitic-graphic'>
          <div className='chart-type-container'>
            <IconButton className='pie-chart-icon' onClick={handlePieChartClick}>
              <img src={PieChartIcon} className='pie-chart-icon' alt='Pie Chart' />
            </IconButton>
          </div>

          {daysOfWeek.map((day) => (
            <div
              key={day}
              className={clsx('day-column', { active: selectedDay === day })}
              style={{ height: '10px' }}
              onClick={() => handleDayClick(day)}
            >
              {day}
            </div>
          ))}
        </div>
      )}

      {isPieChartVisible && (
        <div className='analitic-graphic'>
          <div className='chart-type-container'>
            <IconButton className='pie-chart-icon' onClick={handlePieChartClick}>
              <img src={ICONS_MAP['grafik_icon']} className='pie-chart-icon' alt='Pie Chart' />
            </IconButton>
          </div>
          <div className='chart-container'>
            <PieChart categories={currentType} amount={currentAmount} />
          </div>
        </div>
      )}

      {showExpenses && (
        <div className='categories-container'>
          <Typography variant='h5' align='center' mb={3} fontSize={20}>
            Расходы
          </Typography>
          <div className='categories-list'>
            {Ecategories.map((category, index) => (
              <div key={index} className='category-item'>
                <div className='category-header'>
                  <img src={category.icon} alt='icon' className='category-icon' />
                  <Typography variant='category' className='category-title'>
                    {category.title}
                  </Typography>
                </div>
                <div className='category-details'>
                  <span className='price-text'>BYN</span>
                  <Typography variant='category' className='price'>
                    {category.amount}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showIncomes && (
        <div className='categories-container'>
          <Typography variant='h5' align='center' mb={3} fontSize={20}>
            Доходы
          </Typography>
          <div className='categories-list'>
            {Icategories.map((category, index) => (
              <div key={index} className='category-item'>
                <div className='category-header'>
                  <img src={category.icon} alt='icon' className='category-icon' />
                  <Typography variant='category' className='category-title'>
                    {category.title}
                  </Typography>
                </div>
                <div className='category-details'>
                  <span className='price-text'>BYN</span>
                  <Typography variant='category' className='price'>
                    {category.amount}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Cards
