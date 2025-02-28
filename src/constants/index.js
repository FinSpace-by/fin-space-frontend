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
};

export const ROUTES = {
  ROOT: { TITLE: 'Главная', PATH: '/' },
  REGISTRATION: { TITLE: 'Регистрация', PATH: '/registration' },
  CARDS: { TITLE: 'Карты', PATH: '/cards' },
  ANALITIC: { TITLE: 'Аналитика', PATH: '/analitic' },
  INCOME: {TITLE: 'Доход', PATH: '/income'},
  PROFILE: { TITLE: 'Профиль', PATH: '/profile' },
  NOT_FOUND: { TITLE: '404', PATH: '*' },
  MANUAL: { TITLE: 'Добавить вручную', PATH: '/manual' },
  ADD_EXPENSES_MANUAL: { TITLE: 'Добавить расход', PATH: '/add-expenses-manual'},
  ADD_INCOME_MANUAL: { TITLE: 'Добавить доход', PATH: '/add-income-manual'},
  ADD_CUSTOM: { TITLE: 'Добавить вручную', PATH: '/add-custom'},
};
