import { instance } from '.'

const CATEGORY_PATH = {
  EXPENSE: 'category/expense',
  INCOME: 'category/income',
}

const SUMMARY_PATH = {
  EXPENSE: '/expenses/total-by-categories',
  INCOME: '/incomes/total-by-categories',
}

export const categoryApi = {
  addExpense: (body) => instance.post('/expenses', body),
  addExpenses: (body) => instance.post('/expenses/products', body),
  getExpenses: () => instance.get(CATEGORY_PATH.EXPENSE),
  getUserExpenses: () => instance.get(SUMMARY_PATH.EXPENSE),
  addCustomExpense: (body) => instance.post(CATEGORY_PATH.EXPENSE, body),
  getExpensesByDate: (startDate, endDate) =>
    instance.get('expenses/categorized-by-date', {
      params: {
        startDate,
        endDate,
      },
    }),

  addIncome: (body) => instance.post('/incomes', body),
  getIncomes: () => instance.get(CATEGORY_PATH.INCOME),
  getUserIncomes: () => instance.get(SUMMARY_PATH.INCOME),
  addCustomIncome: (body) => instance.post(CATEGORY_PATH.INCOME, body),
  getIncomesByDate: (startDate, endDate) =>
    instance.get('incomes/categorized-by-date', {
      params: {
        startDate,
        endDate,
      },
    }),
}
