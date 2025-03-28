import { instance } from '.'

export const accountsApi = {
  getAccounts: () => instance.get(`/accounts`).then((res) => res.data),
}
