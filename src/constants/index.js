import food from '@assets/icons/food.svg'
import clothes from '@assets/icons/clothes.svg'
import entertainments from '@assets/icons/entertainments.svg'
import transport from '@assets/icons/transport.svg'
import health from '@assets/icons/health.svg'
import utility from '@assets/icons/utility.svg'
import loan from '@assets/icons/loan.svg'
import education from '@assets/icons/education.svg'
import salary from '@assets/icons/Salary.svg'
import avans from '@assets/icons/Avans.svg'
import debt from '@assets/icons/Debt.svg'
import extra_income from '@assets/icons/Extra_income.svg'
import investment from '@assets/icons/Investment.svg'
import premiya from '@assets/icons/Premiya.svg'
import custom from '@assets/icons/custom.svg'
import scanner from '@assets/icons/scanner.svg'
import grafik_icon from '@assets/imgs/grafik_icon.svg'
import edit from '@assets/imgs/edit_icon.png'
import expenses from '@assets/imgs/expenses_icon.png'
import expenses_active from '@assets/imgs/expenses_active_icon.png'
import incomes from '@assets/imgs/incomes_icon.png'
import incomes_active from '@assets/imgs/incomes_active_icon.png'
import calendar from '@assets/imgs/calendar_icon.png'
import calendar1 from '@assets/imgs/calendar_icon1.png'
import pie_chart from '@assets/imgs/pie_chart_icon.png'
import mainBill from '@assets/icons/main_bill.svg'
import editButton from '@assets/icons/edit_button.svg'
import feedback_icon from '@assets/imgs/feedback_icon.png'

export const ROUTER_ROUTES = {
  NOT_FOUND: '*',
  ROOT: '/',
  MOBILE_MENU: '',
  CARDS: 'cards',
  REGISTRATION: 'registration',
  ANALITIC: 'analitic',
  PROFILE: 'profile',
  INCOME: 'income',
  MANUAL: 'manual',
  SCANNER: 'scanner',
  SCANNER_RESULTS: 'scanner-results',
  ADD_EXPENSES_MANUAL: 'add-expenses-manual',
  ADD_INCOME_MANUAL: 'add-income-manual',
  ADD_CUSTOM: 'add-custom',
  BILLS: `bills`,
  CONFIRM_LOGIN: 'confirm-login',
}

export const ROUTES = {
  ROOT: { TITLE: 'Главная', PATH: '/' },
  REGISTRATION: { TITLE: 'Регистрация', PATH: '/registration' },
  CARDS: { TITLE: 'Карты', PATH: '/cards' },
  ANALITIC: { TITLE: 'Аналитика', PATH: '/analitic' },
  INCOME: { TITLE: 'Доход', PATH: '/income' },
  PROFILE: { TITLE: 'Профиль', PATH: '/profile' },
  NOT_FOUND: { TITLE: '404', PATH: '*' },
  MANUAL: { TITLE: 'Добавить вручную', PATH: '/manual' },
  SCANNER: { TITLE: 'Сканировать', PATH: '/scanner' },
  SCANNER_RESULTS: { TITLE: 'Результаты сканирования', PATH: '/scanner-results' },
  ADD_EXPENSES_MANUAL: { TITLE: 'Добавить расход', PATH: '/add-expenses-manual' },
  ADD_INCOME_MANUAL: { TITLE: 'Добавить доход', PATH: '/add-income-manual' },
  ADD_CUSTOM: { TITLE: 'Добавить вручную', PATH: '/add-custom' },
  BILLS: { TITLE: 'Счета', PATH: '/bills' },
  CONFIRM_LOGIN: { TITLE: 'Подтвержение входа', PATH: '/confirm-login' },
}

export const ICONS_MAP = {
  food,
  clothes,
  entertainments,
  transport,
  health,
  utility,
  loan,
  education,
  salary,
  avans,
  debt,
  extra_income,
  investment,
  premiya,
  custom,
  scanner,
  grafik_icon,
  edit,
  expenses,
  expenses_active,
  incomes,
  incomes_active,
  calendar,
  calendar1,
  pie_chart,
  mainBill,
  editButton,
  feedback_icon,
}

export const LOCATION_STATES = {
  ADD_EXPENSES_MANUAL: 'add-expenses-manual',
  ADD_INCOME_MANUAL: 'add-income-manual',
}

export const REDIRECT_TYPES = {
  MANUAL: 'manual',
  SCANNER: 'scanner',
}

export const HTTP_STATUSES = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
}

export const SCAN_TYPES = {
  RECEIPT: 'receipt',
  QR: 'qr',
}

export const AMOUNT_REGEX = /^[0-9]+([.,][0-9]{1,2})?$/
