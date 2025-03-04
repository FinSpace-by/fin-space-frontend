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
  ADD_EXPENSES_MANUAL: 'add-expenses-manual',
  ADD_INCOME_MANUAL: 'add-income-manual',
  ADD_CUSTOM: 'add-custom',
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
  ADD_EXPENSES_MANUAL: { TITLE: 'Добавить расход', PATH: '/add-expenses-manual' },
  ADD_INCOME_MANUAL: { TITLE: 'Добавить доход', PATH: '/add-income-manual' },
  ADD_CUSTOM: { TITLE: 'Добавить вручную', PATH: '/add-custom' },
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
}

export const LOCATION_STATES = {
  ADD_EXPENSES_MANUAL: 'add-expenses-manual',
  ADD_INCOME_MANUAL: 'add-income-manual',
};

