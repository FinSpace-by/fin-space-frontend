import { instance } from '.'

const EXPENSE_PATH = '/expenses'

export const expensesApi = {
  getExpenses: () => instance.get(`category/expense`),
  addExpense: (body) => instance.post(`${EXPENSE_PATH}`, body),
  getUserExpenses: () => instance.get(`${EXPENSE_PATH}/total-by-categories`),
  addCustom: (body) => instance.post(`category/expense`, body),
}
