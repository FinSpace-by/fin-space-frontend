import { instance } from '.'

const ACCOUNTS_PATH = '/accounts'

export const accountsApi = {
  getAccounts: () => instance.get(ACCOUNTS_PATH).then((res) => res.data),
  createAccount: (body) => instance.post(ACCOUNTS_PATH, body),
  changeAccount: (id, body) => instance.put(`${ACCOUNTS_PATH}/${id}`, body),
  deleteAccount: (id, body) => instance.delete(`${ACCOUNTS_PATH}/${id}`, body),
}
