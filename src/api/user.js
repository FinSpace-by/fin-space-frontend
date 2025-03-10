import { instance } from '.'

export const userApi = {
  getProfile: () => instance.get(`/user/profile`).then((response) => response.data),

  updateBalance: (body) => instance.patch('/users/balance', body),
  getUserBalance: () => instance.get('/users/balance'),
}
