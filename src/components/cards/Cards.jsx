import React, { useState, useEffect } from 'react'
import { Typography, IconButton, Snackbar, Alert } from '@mui/material'
import clsx from 'clsx'
import PieChart from '@components/pieChart/PieChart'
import { categoryApi, userApi } from '@api'
import { ICONS_MAP } from '@constants'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/ru'
import dayjs from 'dayjs'

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
  const [eCategories, setECategories] = useState([])
  const [iCategories, setICategories] = useState([])
  const [showExpenses, setShowExpenses] = useState(true)
  const [showIncomes, setShowIncomes] = useState(false)
  const [currentType, setCurrentType] = useState([])
  const [currentAmount, setCurrentAmount] = useState(0)
  const [isPieChartVisible, setIsPieChartVisible] = useState(false)
  const today = dayjs()
  const yesterday = dayjs().subtract(1, 'day')
  const [startDate, setStartDate] = useState(yesterday)
  const [endDate, setEndDate] = useState(today)

  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  useEffect(() => {
    const fetchUserBalance = async () => {
      try {
        const response = await userApi.getUserBalance()
        setBalance(response.data)
      } catch (error) {}
    }

    const fetchECategories = async () => {
      try {
        const response = await categoryApi.getUserExpenses()
        const totalExpenses = response.data.reduce((acc, expense) => acc + expense.totalIncome, 0)
        const fetchedCategories = response.data.map(
          ({ categoryName, categoryIconUrl, totalIncome }) => ({
            title: categoryName,
            icon: ICONS_MAP[categoryIconUrl] || ICONS_MAP['custom'],
            amount: totalIncome,
          })
        )
        setECategories(fetchedCategories)
        setUserExpenses(totalExpenses)
      } catch (error) {}
    }

    const fetchICategories = async () => {
      try {
        const response = await categoryApi.getUserIncomes()
        const totalIncomes = response.data.reduce((acc, income) => acc + income.totalIncome, 0)
        const fetchedCategories = response.data.map(
          ({ categoryName, categoryIconUrl, totalIncome }) => ({
            title: categoryName,
            icon: ICONS_MAP[categoryIconUrl] || ICONS_MAP['custom'],
            amount: totalIncome,
          })
        )
        setICategories(fetchedCategories)
        setUserIncomes(totalIncomes)
      } catch (error) {}
    }

    fetchUserBalance()
    fetchECategories()
    fetchICategories()
  }, [])

  useEffect(() => {
    if (startDate && endDate && startDate.isAfter(endDate)) {
      setSnackbarMessage('Начальная дата не может быть позже конечной.')
      setOpenSnackbar(true)
      return
    }

    if ((startDate && endDate && startDate.isBefore(endDate)) || startDate.isSame(endDate)) {
      const formattedStartDate = startDate.format('YYYY-MM-DD')
      const formattedEndDate = endDate.format('YYYY-MM-DD')

      const fetchExpensesByDate = async () => {
        try {
          const response = await categoryApi.getExpensesByDate(formattedStartDate, formattedEndDate)

          const expensesData = response.data.reduce((acc, { date, incomes }) => {
            incomes.forEach(({ categoryName, totalIncome }) => {
              if (acc[categoryName]) {
                acc[categoryName] += totalIncome
              } else {
                acc[categoryName] = totalIncome
              }
            })
            return acc
          }, {})

          const chartDataExpenses = Object.entries(expensesData).map(
            ([categoryName, totalIncome]) => ({
              title: categoryName,
              amount: totalIncome,
              icon: ICONS_MAP['custom'],
            })
          )

          setCurrentType(chartDataExpenses)
          setCurrentAmount(chartDataExpenses.reduce((acc, { amount }) => acc + amount, 0))
        } catch (error) {
          console.error('Error fetching expenses by date:', error)
        }
      }

      const fetchIncomesByDate = async () => {
        try {
          const response = await categoryApi.getIncomesByDate(formattedStartDate, formattedEndDate)

          const expensesData = response.data.reduce((acc, { date, incomes }) => {
            incomes.forEach(({ categoryName, totalIncome }) => {
              if (acc[categoryName]) {
                acc[categoryName] += totalIncome
              } else {
                acc[categoryName] = totalIncome
              }
            })
            return acc
          }, {})

          const chartDataIncomes = Object.entries(expensesData).map(
            ([categoryName, totalIncome]) => ({
              title: categoryName,
              amount: totalIncome,
              icon: ICONS_MAP['custom'],
            })
          )

          setCurrentType(chartDataIncomes)
          setCurrentAmount(chartDataIncomes.reduce((acc, { amount }) => acc + amount, 0))
        } catch (error) {
          console.error('Error fetching incomes by date:', error)
        }
      }
      if (showExpenses) {
        fetchExpensesByDate()
      } else if (showIncomes) {
        fetchIncomesByDate()
      }
    }
  }, [showExpenses, showIncomes, startDate, endDate])

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
      setBalance(numericValue)
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
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity='error' sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <div className='header-container'>
        <div className='balance'>
          <div className='balance-text-edit-button'>
            <Typography variant='body1' className='balance-label'>
              Общий баланс
            </Typography>
            {!isEditingBalance && (
              <IconButton onClick={handleEditClick} className='edit-link'>
                <img src={ICONS_MAP['edit']} className='edit-icon' alt='Edit' />
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
              {balance.toFixed(2)} BYN
            </Typography>
          )}
        </div>
      </div>
      <div className='expenses-income-sum'>
        <IconButton
          onClick={handleShowExpenses}
          className={clsx('expenses-income-sum1', { active: showExpenses })}
        >
          <img
            src={showExpenses ? ICONS_MAP['expenses_active'] : ICONS_MAP['expenses']}
            className='expenses-incomes-icon'
            alt='Expenses'
          />
          <Typography className={clsx('expenses-button-text', { active: showExpenses })}>
            {userExpenses.toFixed(2)}
          </Typography>
          <Typography className={clsx('expenses-button-text', 'opacity', { active: showExpenses })}>
            BYN
          </Typography>
        </IconButton>
        <IconButton
          onClick={handleShowIncomes}
          className={clsx('expenses-income-sum2', { active: showIncomes })}
        >
          <img
            src={showIncomes ? ICONS_MAP['incomes_active'] : ICONS_MAP['incomes']}
            className='expenses-incomes-icon'
            alt='Incomes'
          />
          <Typography className={clsx('incomes-button-text', { active: showIncomes })}>
            {userIncomes.toFixed(2)}
          </Typography>
          <Typography className={clsx('incomes-button-text', 'opacity', { active: showIncomes })}>
            BYN
          </Typography>
        </IconButton>
      </div>

      <div className='page-header-container'>
        <Typography className='page-title1'>Аналитика</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru'>
          <div className='date-picker-container'>
            <DatePicker
              className='MuiDatePicker-root'
              disableFuture
              defaultValue={yesterday}
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
            />
            <span>-</span>
            <DatePicker
              className='MuiDatePicker-root'
              disableFuture
              defaultValue={today}
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
            />
          </div>
        </LocalizationProvider>
      </div>

      {!isPieChartVisible && (
        <div className='analitic-graphic'>
          <div className='chart-type-container'>
            <IconButton className='pie-chart-icon' onClick={handlePieChartClick}>
              <img src={ICONS_MAP['pie_chart']} className='pie-chart-icon' alt='Pie Chart' />
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
            {eCategories.map(({ title, icon, amount }, index) => (
              <div key={index} className='category-item'>
                <div className='category-header'>
                  <img src={icon} alt='icon' className='category-icon' />
                  <Typography variant='category' className='category-title'>
                    {title}
                  </Typography>
                </div>
                <div className='category-details'>
                  <span className='price-text'>BYN</span>
                  <Typography variant='category' className='price'>
                    {amount.toFixed(2)}
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
            {iCategories.map(({ title, icon, amount }, index) => (
              <div key={index} className='category-item'>
                <div className='category-header'>
                  <img src={icon} alt='icon' className='category-icon' />
                  <Typography variant='category' className='category-title'>
                    {title}
                  </Typography>
                </div>
                <div className='category-details'>
                  <span className='price-text'>BYN</span>
                  <Typography variant='category' className='price'>
                    {amount.toFixed(2)}
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
