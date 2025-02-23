import { ROUTES } from '@constants';


export const ACTIVE_ITEMS = {
  CARDS: 'cards',
  ANALITIC: 'analitic',
  PROFILE: 'profile',
};

export const menuItems = [
  { path: ROUTES.CARDS.PATH, label: 'Карты', key: 'cards' },
  { path: ROUTES.ANALITIC.PATH, label: 'Аналитика', key: 'analitic' },
  { path: ROUTES.PROFILE.PATH, label: 'Профиль', key: 'profile' },
];