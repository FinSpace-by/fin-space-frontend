import { instance } from '.';

const EXPENSE_PATH = '/expenses';

export const expensesApi = {
  getExpenses: () =>
    instance.get(`${EXPENSE_PATH}/total-by-categories`, {
      headers: {
        'Cookie': 'jwt=eyJhbGciOiJIUzM4NCJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwiaWQiOiIzOGEzNGFhZi00OWZiLTQzOTYtOGM5MS0xMTc0YjQ5MzI3MTUiLCJzdWIiOiIrMzc1MjkzMjIxMzM3IiwiaWF0IjoxNzQwNzY0OTUzLCJleHAiOjE3NDA3Njg1NTN9.q2-ZqHgFKvAcuK5FyCB6Axk5QUZmeqNHErhe60Ed2OhET0WZhOQ8uinKvgG1VbvY',
      },
      withCredentials: true,
    }),
};
