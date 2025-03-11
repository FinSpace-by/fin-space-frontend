import { ROUTES } from '@constants'

export const ACTIVE_ITEMS = {
  CARDS: 'cards',
  ANALITIC: 'analitic',
  PROFILE: 'profile',
  INCOME: 'income',
}

export const menuItems = [
  { path: ROUTES.ANALITIC.PATH, label: '', key: 'analitic' },
  { path: ROUTES.CARDS.PATH, label: 'Главная', key: 'cards' },
  { path: ROUTES.NOT_FOUND.PATH, label: 'Счета', key: 'income' },
  { path: ROUTES.NOT_FOUND.PATH, label: 'Профиль', key: 'profile' },
]
