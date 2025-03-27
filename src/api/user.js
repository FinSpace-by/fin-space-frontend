import { instance } from '.'

const USERS_PATH = '/users'

export const userApi = {
  getProfile: () => instance.get(`/user/profile`).then((response) => response.data),

  updateBalance: (body) => instance.patch(`${USERS_PATH}/balance`, body),
  getUserBalance: () => instance.get(`${USERS_PATH}/balance`),
}
