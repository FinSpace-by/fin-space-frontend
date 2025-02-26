import { ROUTES } from '@constants';


export const ACTIVE_ITEMS = {
  CARDS: 'cards',
  ANALITIC: 'analitic',
  PROFILE: 'profile',
};

export const menuItems = [
  { path: ROUTES.CARDS.PATH, label: 'Расходы', key: 'cards' },
  { path: ROUTES.ANALITIC.PATH, label: '', key: 'analitic' },
  { path: ROUTES.PROFILE.PATH, label: 'Доходы', key: 'profile' },
];