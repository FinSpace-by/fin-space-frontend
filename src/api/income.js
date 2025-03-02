import { instance } from '.'

const INCOMES_PATH = '/incomes'

export const incomeApi = {
  getIncomes: () => instance.get(`category/income`),
  addIncome: (body) => instance.post(`${INCOMES_PATH}`, body),
  getUserIncomes: () => instance.get(`${INCOMES_PATH}/total-by-categories`),
  addCustom: (body) => instance.post(`category/income`, body),
}
