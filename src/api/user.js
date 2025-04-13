import { instance } from '.'

const USERS_PATH = '/users'

export const userApi = {
  getProfile: () => instance.get(`/user/profile`).then((response) => response.data),

  getUserBalance: () => instance.get(`${USERS_PATH}/balance`),
}
