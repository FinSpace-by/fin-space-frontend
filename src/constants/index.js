export const ROUTER_ROUTES = {
  NOT_FOUND: '*',
  ROOT: '/',
  MOBILE_MENU: '',
  CARDS: 'cards',
  REGISTRATION: 'register',
};

export const ROUTES = {
  ROOT: { TITLE: 'Главная', PATH: '/' },
  NOT_FOUND: { TITLE: '404', PATH: '*' },
  CARDS: { TITLE: 'Мои карты', PATH: '/cards' },
  FAMILY: { TITLE: 'Семья', PATH: '/family' },
  CLIENTS: { TITLE: 'Управление клиентами', PATH: '/clients' },
  TASKS: { TITLE: 'Управление задачами', PATH: '/tasks' },
  CLIENT_INFO: {
    TITLE: 'Информация о клиенте',
    PATH: (clientID) => `/clients/${clientID}`,
  },
  TASK_INFO: {
    TITLE: 'Информация о задаче',
    PATH: (taskID) => `/tasks/${taskID}`,
  },
};

export const TABLE_LOCALE = {
  triggerDesc: 'Нажмите, чтобы сортировать по убыванию',
  triggerAsc: 'Нажмите, чтобы сортировать по возрастанию',
  cancelSort: 'Нажмите, чтобы отменить сортировку',
  filterReset: 'Отменить',
  filterConfirm: 'Ок',
};

export const MODAL_TYPE = {
  ADD: 'add',
  EDIT: 'edit',
};
