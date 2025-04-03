import { ROUTES } from '@constants'

export const ACTIVE_ITEMS = {
  CARDS: 'cards',
  ANALITIC: 'analitic',
  PROFILE: 'profile',
  INCOME: 'income',
  BILLS: 'biils',
}

export const menuItems = [
  { path: ROUTES.ANALITIC.PATH, label: '', key: 'analitic' },
  { path: ROUTES.CARDS.PATH, label: 'Главная', key: 'cards' },
  { path: ROUTES.BILLS.PATH, label: 'Счета', key: 'bills' },
  { path: ROUTES.NOT_FOUND.PATH, label: 'Профиль', key: 'profile' },

]
