import { instance } from '.'

const BILLS_PATH = '/accounts'

export const billsApi = {
  getBills: () => instance.get(`${BILLS_PATH}`),
}
