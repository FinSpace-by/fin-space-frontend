import { instance } from '.'

const AUTH_PATH = '/auth'

export const authApi = {
  register: (body) => instance.post(`${AUTH_PATH}/register`, body),
  setLogin: (body) => instance.post(`${AUTH_PATH}/login`, body),
  setLogout: () => instance.post(`${AUTH_PATH}/logout`),
}
