import { ROUTES } from '@constants';


export const ACTIVE_ITEMS = {
  CARDS: 'cards',
  ANALITIC: 'analitic',
  FAMILY: 'family',
  PROFILE: 'profile',
};

export const menuItems = [
  { path: ROUTES.CARDS.PATH, label: 'Карты', key: 'cards' },
  { path: ROUTES.ANALITIC.PATH, label: 'Аналитика', key: 'analitic' },
  { className: 'icon-container', isIcon: true }, // Пункт для иконки
  { path: ROUTES.FAMILY.PATH, label: 'Семья', key: 'family' },
  { path: ROUTES.PROFILE.PATH, label: 'Профиль', key: 'profile' },
];