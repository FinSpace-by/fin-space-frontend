import { instance } from '.'

export const authApi = {
  register: (body) => instance.post(`/api/auth/register`, body),
  setLogin: (body) =>
    instance.post(`/api/auth/login?username=${body.username}&password=${body.password}`),
  setLogout: () => instance.post(`/api/auth/logout`),
}
