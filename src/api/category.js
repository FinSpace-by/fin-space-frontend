import { instance } from '.';

const CATEGORY_PATH = {
  EXPENSE: 'category/expense',
  INCOME: 'category/income',
};

const SUMMARY_PATH = {
  EXPENSE: '/expenses/total-by-categories',
  INCOME: '/incomes/total-by-categories',
};

export const categoryApi = {
  addExpense: (body) => instance.post('/expenses', body),
  getExpenses: () => instance.get(CATEGORY_PATH.EXPENSE),
  getUserExpenses: () => instance.get(SUMMARY_PATH.EXPENSE),
  addCustomExpense: (body) => instance.post(CATEGORY_PATH.EXPENSE, body),

  addIncome: (body) => instance.post('/incomes', body),
  getIncomes: () => instance.get(CATEGORY_PATH.INCOME),
  getUserIncomes: () => instance.get(SUMMARY_PATH.INCOME),
  addCustomIncome: (body) => instance.post(CATEGORY_PATH.INCOME, body),
};
