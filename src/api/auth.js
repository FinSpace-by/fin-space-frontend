import { instance } from '.'

export const authApi = {
  register: (body) => instance.post(`/api/auth/register`, body),
  setLogin: (body) =>
    instance.post(`/api/auth/login`, body),
  setLogout: () => instance.post(`/api/auth/logout`),
}
