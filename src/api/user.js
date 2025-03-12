import { instance } from '.'

const USERS_PATH = {
  BALANCE: '/users/balance',
}

export const userApi = {
  getProfile: () => instance.get(`/user/profile`).then((response) => response.data),

  updateBalance: (body) => instance.patch(USERS_PATH.BALANCE, body),
  getUserBalance: () => instance.get(USERS_PATH.BALANCE),
}
