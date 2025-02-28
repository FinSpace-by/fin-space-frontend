import { instance } from '.'

export const userApi = {
  getProfile: () => instance.get(`/user/profile`).then((response) => response.data),
}
