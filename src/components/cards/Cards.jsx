import React, { useState, useEffect } from 'react'
import {
  Typography,
  IconButton,
  Snackbar,
  Alert,
  Menu,
  MenuItem,
  Select,
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material'
import clsx from 'clsx'
import PieChart from '@components/pieChart/PieChart'
import BarChart from '@components/barChart/BarChart'
import Loader from '@components/Loader'
import AppTutorial from '@components/appTutorial/AppTutorial'
import { categoryApi, userApi } from '@api'
import { ICONS_MAP } from '@constants'
import 'dayjs/locale/ru'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'

import './sass/index.scss'

const DAYS_OF_WEEK = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const MONTHS = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
const PERIOD_OPTIONS = ['Сегодня', 'Эта неделя', 'Этот месяц', 'Этот год', 'За период']
dayjs.extend(isoWeek)

function Cards() {
  const [balance, setBalance] = useState(0)
  const [userExpenses, setUserExpenses] = useState(0)
  const [userIncomes, setUserIncomes] = useState(0)
  const [eCategories, setECategories] = useState([])
  const [iCategories, setICategories] = useState([])
  const [currentType, setCurrentType] = useState([])
  const [currentAmount, setCurrentAmount] = useState(0)
  const [isPieChartVisible, setIsPieChartVisible] = useState(false)
  const [isBarChartVisible, setIsBarChartVisible] = useState(true)
  const [startDate, setStartDate] = useState(dayjs().day(1))
  const [endDate, setEndDate] = useState(dayjs().day(7))
  const [isLoading, setIsLoading] = useState(true)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [showTutorial, setShowTutorial] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedPeriod, setSelectedPeriod] = useState('Эта неделя')
  const [periodDialogOpen, setPeriodDialogOpen] = useState(false)
  const [startDay, setStartDay] = useState(dayjs().date())
  const [startMonth, setStartMonth] = useState(dayjs().month())
  const [startYear, setStartYear] = useState(dayjs().year())
  const [endDay, setEndDay] = useState(dayjs().date())
  const [endMonth, setEndMonth] = useState(dayjs().month())
  const [endYear, setEndYear] = useState(dayjs().year())
  const [showExpenses, setShowExpenses] = useState(true)
  const [showIncomes, setShowIncomes] = useState(false)

  const years = Array.from({ length: 10 }, (_, i) => dayjs().year() - 5 + i)
  const generateDays = (year, month) => {
    const daysInMonth = dayjs().year(year).month(month).daysInMonth()
    return Array.from({ length: daysInMonth }, (_, i) => i + 1)
  }
  const startDays = generateDays(startYear, startMonth)
  const endDays = generateDays(endYear, endMonth)

  useEffect(() => {
    const fetchUserBalance = async () => {
      try {
        setIsLoading(false)
        const response = await userApi.getUserBalance()
        setBalance(response.data)
      } catch (error) {}
    }

    const fetchECategories = async () => {
      try {
        const response = await categoryApi.getUserExpenses()
        const totalExpenses = response.data.reduce((acc, expense) => acc + expense.totalExpense, 0)
        const fetchedCategories = response.data.map(
          ({ categoryName, categoryIconUrl, totalExpense }) => ({
            title: categoryName,
            icon: ICONS_MAP[categoryIconUrl] || ICONS_MAP['custom'],
            amount: totalExpense,
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

  const groupDataByHours = (data, type) => {
    const result = Array(24)
      .fill(0)
      .map((_, i) => ({ hour: i, amount: 0 }))

    data.forEach(({ date, ...rest }) => {
      const hour = dayjs(date).hour()

      if (type === 'expenses') {
        const total = rest.expenses.reduce((sum, { totalExpense }) => sum + totalExpense, 0)
        result[hour].amount += total
      } else {
        const total = rest.incomes.reduce((sum, { totalIncome }) => sum + totalIncome, 0)
        result[hour].amount += total
      }
    })

    return result.map(({ hour, amount }) => ({
      title: `${hour}:00`,
      amount,
      icon: ICONS_MAP['custom'],
    }))
  }

  const groupDataByWeekDays = (data, type) => {
    const result = Array(7)
      .fill(0)
      .map((_, i) => ({ day: i, amount: 0 }))

    data.forEach(({ date, ...rest }) => {
      const dayOfWeek = (dayjs(date).day() + 6) % 7

      if (type === 'expenses') {
        const total = rest.expenses.reduce((sum, { totalExpense }) => sum + totalExpense, 0)
        result[dayOfWeek].amount += total
      } else {
        const total = rest.incomes.reduce((sum, { totalIncome }) => sum + totalIncome, 0)
        result[dayOfWeek].amount += total
      }
    })

    return result.map(({ day, amount }) => ({
      title: DAYS_OF_WEEK[day],
      amount,
      icon: ICONS_MAP['custom'],
    }))
  }

  const groupDataByMonthDays = (data, type) => {
    const daysInMonth = dayjs(endDate).daysInMonth()
    const result = Array(daysInMonth)
      .fill(0)
      .map((_, i) => ({ day: i + 1, amount: 0 }))

    data.forEach(({ date, ...rest }) => {
      const dayOfMonth = dayjs(date).date() - 1

      if (type === 'expenses') {
        const total = rest.expenses.reduce((sum, { totalExpense }) => sum + totalExpense, 0)
        result[dayOfMonth].amount += total
      } else {
        const total = rest.incomes.reduce((sum, { totalIncome }) => sum + totalIncome, 0)
        result[dayOfMonth].amount += total
      }
    })

    return result.map(({ day, amount }) => ({
      title: `${day}`,
      amount,
      icon: ICONS_MAP['custom'],
    }))
  }

  const groupDataByYearMonths = (data, type) => {
    const result = Array(12)
      .fill(0)
      .map((_, i) => ({ month: i, amount: 0 }))

    data.forEach(({ date, ...rest }) => {
      const month = dayjs(date).month()

      if (type === 'expenses') {
        const total = rest.expenses.reduce((sum, { totalExpense }) => sum + totalExpense, 0)
        result[month].amount += total
      } else {
        const total = rest.incomes.reduce((sum, { totalIncome }) => sum + totalIncome, 0)
        result[month].amount += total
      }
    })

    return result.map(({ month, amount }) => ({
      title: MONTHS[month],
      amount,
      icon: ICONS_MAP['custom'],
    }))
  }

  useEffect(() => {
    if (startDate && endDate && startDate.isAfter(endDate)) {
      setSnackbarMessage('Начальная дата не может быть позже конечной.')
      setOpenSnackbar(true)
      return
    }

    if ((startDate && endDate && startDate.isBefore(endDate)) || startDate.isSame(endDate)) {
      const formattedStartDate = startDate.format('YYYY-MM-DD')
      const formattedEndDate = endDate.format('YYYY-MM-DD')

      const fetchData = async () => {
        try {
          if (isPieChartVisible) {
            if (showExpenses) {
              const response = await categoryApi.getExpensesByDate(
                formattedStartDate,
                formattedEndDate
              )

              const expensesData = response.data.reduce((acc, { date, expenses }) => {
                expenses.forEach(({ categoryName, totalExpense, categoryIconUrl }) => {
                  if (acc[categoryName]) {
                    acc[categoryName].amount += totalExpense
                  } else {
                    acc[categoryName] = {
                      amount: totalExpense,
                      icon: categoryIconUrl,
                    }
                  }
                })
                return acc
              }, {})

              const chartData = Object.entries(expensesData).map(
                ([categoryName, { amount, icon }]) => ({
                  title: categoryName,
                  amount,
                  icon: ICONS_MAP[icon] || ICONS_MAP['custom'],
                })
              )

              setCurrentType(chartData)
              setCurrentAmount(chartData.reduce((acc, { amount }) => acc + amount, 0))
            } else if (showIncomes) {
              const response = await categoryApi.getIncomesByDate(
                formattedStartDate,
                formattedEndDate
              )

              const incomesData = response.data.reduce((acc, { date, incomes }) => {
                incomes.forEach(({ categoryName, totalIncome, categoryIconUrl }) => {
                  if (acc[categoryName]) {
                    acc[categoryName].amount += totalIncome
                  } else {
                    acc[categoryName] = {
                      amount: totalIncome,
                      icon: categoryIconUrl,
                    }
                  }
                })
                return acc
              }, {})

              const chartData = Object.entries(incomesData).map(
                ([categoryName, { amount, icon }]) => ({
                  title: categoryName,
                  amount,
                  icon: ICONS_MAP[icon] || ICONS_MAP['custom'],
                })
              )

              setCurrentType(chartData)
              setCurrentAmount(chartData.reduce((acc, { amount }) => acc + amount, 0))
            }
          } else if (isBarChartVisible) {
            if (selectedPeriod === 'Сегодня') {
              if (showExpenses) {
                const response = await categoryApi.getExpensesByDate(
                  formattedStartDate,
                  formattedEndDate
                )
                const chartData = groupDataByHours(response.data, 'expenses')
                setCurrentType(chartData)
                setCurrentAmount(chartData.reduce((acc, { amount }) => acc + amount, 0))
              } else if (showIncomes) {
                const response = await categoryApi.getIncomesByDate(
                  formattedStartDate,
                  formattedEndDate
                )
                const chartData = groupDataByHours(response.data, 'incomes')
                setCurrentType(chartData)
                setCurrentAmount(chartData.reduce((acc, { amount }) => acc + amount, 0))
              }
            } else if (selectedPeriod === 'Эта неделя') {
              if (showExpenses) {
                const response = await categoryApi.getExpensesByDate(
                  formattedStartDate,
                  formattedEndDate
                )
                const chartData = groupDataByWeekDays(response.data, 'expenses')
                setCurrentType(chartData)
                setCurrentAmount(chartData.reduce((acc, { amount }) => acc + amount, 0))
              } else if (showIncomes) {
                const response = await categoryApi.getIncomesByDate(
                  formattedStartDate,
                  formattedEndDate
                )
                const chartData = groupDataByWeekDays(response.data, 'incomes')
                setCurrentType(chartData)
                setCurrentAmount(chartData.reduce((acc, { amount }) => acc + amount, 0))
              }
            } else if (selectedPeriod === 'Этот месяц') {
              if (showExpenses) {
                const response = await categoryApi.getExpensesByDate(
                  formattedStartDate,
                  formattedEndDate
                )
                const chartData = groupDataByMonthDays(response.data, 'expenses')
                setCurrentType(chartData)
                setCurrentAmount(chartData.reduce((acc, { amount }) => acc + amount, 0))
              } else if (showIncomes) {
                const response = await categoryApi.getIncomesByDate(
                  formattedStartDate,
                  formattedEndDate
                )
                const chartData = groupDataByMonthDays(response.data, 'incomes')
                setCurrentType(chartData)
                setCurrentAmount(chartData.reduce((acc, { amount }) => acc + amount, 0))
              }
            } else if (selectedPeriod === 'Этот год') {
              if (showExpenses) {
                const response = await categoryApi.getExpensesByDate(
                  formattedStartDate,
                  formattedEndDate
                )
                const chartData = groupDataByYearMonths(response.data, 'expenses')
                setCurrentType(chartData)
                setCurrentAmount(chartData.reduce((acc, { amount }) => acc + amount, 0))
              } else if (showIncomes) {
                const response = await categoryApi.getIncomesByDate(
                  formattedStartDate,
                  formattedEndDate
                )
                const chartData = groupDataByYearMonths(response.data, 'incomes')
                setCurrentType(chartData)
                setCurrentAmount(chartData.reduce((acc, { amount }) => acc + amount, 0))
              }
            } else if (selectedPeriod === 'За период') {
              const allDates = []
              let currentDate = dayjs(startDate)
              const endDateObj = dayjs(endDate)

              while (currentDate.isBefore(endDateObj) || currentDate.isSame(endDateObj, 'day')) {
                allDates.push(currentDate.format('YYYY-MM-DD'))
                currentDate = currentDate.add(1, 'day')
              }

              if (showExpenses) {
                const response = await categoryApi.getExpensesByDate(
                  formattedStartDate,
                  formattedEndDate
                )

                const dataByDate = new Map()
                response.data.forEach((dayData) => {
                  dataByDate.set(dayData.date, dayData.expenses)
                })

                const chartData = allDates.flatMap((date) => {
                  const dayjsDate = dayjs(date)
                  const dayOfWeek = DAYS_OF_WEEK[(dayjsDate.day() + 6) % 7]
                  const dayOfMonth = dayjsDate.date()
                  const month = MONTHS[dayjsDate.month()]

                  const expenses = dataByDate.get(date) || []
                  if (expenses.length === 0) {
                    return [
                      {
                        title: `${dayOfMonth} ${month}`,
                        dayOfWeek,
                        amount: 0,
                        icon: ICONS_MAP['custom'],
                        fullDate: date,
                      },
                    ]
                  }
                  return expenses.map((expense) => ({
                    title: `${dayOfMonth} ${month}`,
                    dayOfWeek,
                    amount: expense.totalExpense,
                    icon: ICONS_MAP[expense.categoryIconUrl] || ICONS_MAP['custom'],
                    fullDate: date,
                  }))
                })

                setCurrentType(chartData)
                setCurrentAmount(chartData.reduce((acc, { amount }) => acc + amount, 0))
              }

              if (showIncomes) {
                const response = await categoryApi.getIncomesByDate(
                  formattedStartDate,
                  formattedEndDate
                )

                const dataByDate = new Map()
                response.data.forEach((dayData) => {
                  dataByDate.set(dayData.date, dayData.incomes)
                })

                const chartData = allDates.flatMap((date) => {
                  const dayjsDate = dayjs(date)
                  const dayOfWeek = DAYS_OF_WEEK[(dayjsDate.day() + 6) % 7]
                  const dayOfMonth = dayjsDate.date()
                  const month = MONTHS[dayjsDate.month()]

                  const incomes = dataByDate.get(date) || []
                  if (incomes.length === 0) {
                    return [
                      {
                        title: `${dayOfMonth} ${month}`,
                        dayOfWeek,
                        amount: 0,
                        icon: ICONS_MAP['custom'],
                        fullDate: date,
                      },
                    ]
                  }
                  return incomes.map((income) => ({
                    title: `${dayOfMonth} ${month}`,
                    dayOfWeek,
                    amount: income.totalIncome,
                    icon: ICONS_MAP[income.categoryIconUrl] || ICONS_MAP['custom'],
                    fullDate: date,
                  }))
                })

                setCurrentType(chartData)
                setCurrentAmount(chartData.reduce((acc, { amount }) => acc + amount, 0))
              }
            }
          }
        } catch (error) {}
      }

      fetchData()
    }
  }, [
    showExpenses,
    showIncomes,
    startDate,
    endDate,
    isBarChartVisible,
    isPieChartVisible,
    selectedPeriod,
  ])

  useEffect(() => {
    const savedStartDate = sessionStorage.getItem('startDate')
    const savedEndDate = sessionStorage.getItem('endDate')

    if (savedStartDate && savedEndDate) {
      setStartDate(dayjs(savedStartDate))
      setEndDate(dayjs(savedEndDate))
    }
  }, [])

  useEffect(() => {
    sessionStorage.setItem('startDate', startDate.format('YYYY-MM-DD'))
    sessionStorage.setItem('endDate', endDate.format('YYYY-MM-DD'))
  }, [startDate, endDate])

  useEffect(() => {
    const isNewUser = localStorage.getItem('isNewUser') === 'true'
    setShowTutorial(isNewUser)
  }, [])

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleOpenPeriodDialog = () => {
    handleMenuClose()
    setStartDay(dayjs(startDate).date())
    setStartMonth(dayjs(startDate).month())
    setStartYear(dayjs(startDate).year())
    setEndDay(dayjs(endDate).date())
    setEndMonth(dayjs(endDate).month())
    setEndYear(dayjs(endDate).year())
    setPeriodDialogOpen(true)
  }

  const handleClosePeriodDialog = () => {
    setPeriodDialogOpen(false)
  }

  const handleApplyPeriod = () => {
    setPeriodDialogOpen(false)
    const newStartDate = dayjs().year(startYear).month(startMonth).date(startDay).startOf('day')
    const newEndDate = dayjs().year(endYear).month(endMonth).date(endDay).endOf('day')

    if (newStartDate.isAfter(newEndDate)) {
      setSnackbarMessage('Начальная дата не может быть позже конечной.')
      setOpenSnackbar(true)
      return
    }

    setStartDate(newStartDate)
    setEndDate(newEndDate)
    setSelectedPeriod('За период')
  }

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period)
    handleMenuClose()

    const today = dayjs()
    switch (period) {
      case 'Сегодня':
        setStartDate(today.startOf('day'))
        setEndDate(today.endOf('day'))
        break
      case 'Эта неделя':
        setStartDate(today.startOf('isoWeek'))
        setEndDate(today.endOf('isoWeek'))
        break
      case 'Этот месяц':
        setStartDate(today.startOf('month'))
        setEndDate(today.endOf('month'))
        break
      case 'Этот год':
        setStartDate(today.startOf('year'))
        setEndDate(today.endOf('year'))
        break
      case 'За период':
        handleOpenPeriodDialog()
        break
      default:
        break
    }
  }

  const handleTutorialFinish = () => {
    localStorage.removeItem('isNewUser')
    setShowTutorial(false)
  }

  const handlePieChartClick = () => {
    setIsPieChartVisible(!isPieChartVisible)
    setIsBarChartVisible(!isBarChartVisible)

    if (!isBarChartVisible) {
      const startOfWeek = startDate.startOf('isoWeek')
      setStartDate(startOfWeek)

      const newEndDate = startOfWeek.add(6, 'day')
      setEndDate(newEndDate)
    }
  }

  useEffect(() => {
    const savedShowExpenses = sessionStorage.getItem('showExpenses')
    const savedShowIncomes = sessionStorage.getItem('showIncomes')

    if (savedShowExpenses !== null) {
      setShowExpenses(savedShowExpenses === 'true')
    }
    if (savedShowIncomes !== null) {
      setShowIncomes(savedShowIncomes === 'true')
    }
  }, [])

  useEffect(() => {
    sessionStorage.setItem('showExpenses', showExpenses.toString())
    sessionStorage.setItem('showIncomes', showIncomes.toString())
  }, [showExpenses, showIncomes])

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
      <Loader isLoading={isLoading} />
      <div className='header-container'>
        <div className='balance'>
          <div className='balance-text-edit-button'>
            <Typography variant='body1' className='balance-label'>
              Общий баланс
            </Typography>
          </div>
          <div className='balance-amount'>
            <Typography variant='h4' className='balance-numbers'>
              {typeof balance === 'number' && !isNaN(balance) ? balance.toFixed(2) : '0.00'}
            </Typography>
            <Typography variant='h4' className='balance-currency'>
              BYN
            </Typography>
          </div>
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
            {typeof userExpenses === 'number' && !isNaN(userExpenses)
              ? userExpenses.toFixed(2)
              : '0.00'}
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
            {typeof userIncomes === 'number' && !isNaN(userIncomes)
              ? userIncomes.toFixed(2)
              : '0.00'}
          </Typography>
          <Typography className={clsx('incomes-button-text', 'opacity', { active: showIncomes })}>
            BYN
          </Typography>
        </IconButton>
      </div>

      <div className='page-header-container'>
        <Typography className='page-title1'>Аналитика</Typography>
        <IconButton className='calendar-icon' onClick={handleMenuClick}>
          <img src={ICONS_MAP['calendar1']} className='calendar_icon' alt='Calendar' />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          className='calendar-menu'
        >
          {PERIOD_OPTIONS.map((option) => (
            <MenuItem
              key={option}
              onClick={() => {
                handlePeriodChange(option)
              }}
              className='calendar-menu'
            >
              {option}
            </MenuItem>
          ))}
        </Menu>

        <Dialog
          open={periodDialogOpen}
          onClose={handleClosePeriodDialog}
          className='period-dialog'
          disableEnforceFocus={true}
          disableAutoFocus={true}
          PaperProps={{
            'aria-modal': 'true',
            role: 'dialog',
          }}
        >
          <DialogContent>
            <Box className='period-section'>
              <Typography variant='subtitle1' className='period-title'>
                Начальная дата
              </Typography>
              <Box className='period-selectors'>
                <Select value={startDay} onChange={(e) => setStartDay(e.target.value)} fullWidth>
                  {startDays.map((day) => (
                    <MenuItem key={`start-day-${day}`} value={day}>
                      {day}
                    </MenuItem>
                  ))}
                </Select>
                <Select
                  value={startMonth}
                  onChange={(e) => setStartMonth(e.target.value)}
                  fullWidth
                >
                  {MONTHS.map((month, index) => (
                    <MenuItem key={`start-month-${month}`} value={index}>
                      {month}
                    </MenuItem>
                  ))}
                </Select>
                <Select value={startYear} onChange={(e) => setStartYear(e.target.value)} fullWidth>
                  {years.map((year) => (
                    <MenuItem key={`start-year-${year}`} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>

            <Box className='period-section'>
              <Typography variant='subtitle1' className='period-title'>
                Конечная дата
              </Typography>
              <Box className='period-selectors'>
                <Select value={endDay} onChange={(e) => setEndDay(e.target.value)} fullWidth>
                  {endDays.map((day) => (
                    <MenuItem key={`end-day-${day}`} value={day}>
                      {day}
                    </MenuItem>
                  ))}
                </Select>
                <Select value={endMonth} onChange={(e) => setEndMonth(e.target.value)} fullWidth>
                  {MONTHS.map((month, index) => (
                    <MenuItem key={`end-month-${month}`} value={index}>
                      {month}
                    </MenuItem>
                  ))}
                </Select>
                <Select value={endYear} onChange={(e) => setEndYear(e.target.value)} fullWidth>
                  {years.map((year) => (
                    <MenuItem key={`end-year-${year}`} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions className='dialog-actions'>
            <Button onClick={handleApplyPeriod} color='primary' className='apply-button'>
              Готово
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      {!isPieChartVisible && (
        <div className='analitic-graphic'>
          <div className='chart-type-container'>
            <IconButton className='pie-chart-icon' onClick={handlePieChartClick}>
              <img src={ICONS_MAP['pie_chart']} className='pie-chart-icon' alt='Pie Chart' />
            </IconButton>
          </div>
          <div className='chart-container'>
            <BarChart categories={currentType} isExpenses={showExpenses} />
          </div>
        </div>
      )}

      {isPieChartVisible && (
        <div className='analitic-graphic'>
          <div className='chart-type-container'>
            <IconButton className='pie-chart-icon' onClick={handlePieChartClick}>
              <img src={ICONS_MAP['grafik_icon']} className='pie-chart-icon' alt='Bar Chart' />
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
                    {typeof amount === 'number' && !isNaN(amount) ? amount.toFixed(2) : '0.00'}
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
                    {typeof amount === 'number' && !isNaN(amount) ? amount.toFixed(2) : '0.00'}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* {showTutorial && <AppTutorial isNewUser={true} onFinish={handleTutorialFinish} />} */}
    </div>
  )
}

export default Cards
