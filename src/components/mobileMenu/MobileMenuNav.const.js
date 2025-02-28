import { ROUTES } from '@constants'

export const ACTIVE_ITEMS = {
  CARDS: 'cards',
  ANALITIC: 'analitic',
  PROFILE: 'profile',
  INCOME: 'income',
}

export const menuItems = [
  { path: ROUTES.ANALITIC.PATH, label: 'Расходы', key: 'analitic' },
  { path: ROUTES.CARDS.PATH, label: '', key: 'cards' },
  { path: ROUTES.INCOME.PATH, label: 'Доходы', key: 'income' },
]
