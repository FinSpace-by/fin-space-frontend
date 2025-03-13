import { instance } from '.'

const USERS_PATH = '/users/balance'

export const userApi = {
  getProfile: () => instance.get(`/user/profile`).then((response) => response.data),

  updateBalance: (body) => instance.patch(USERS_PATH, body),
  getUserBalance: () => instance.get(USERS_PATH),
}
