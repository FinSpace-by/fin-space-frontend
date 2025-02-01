import axios from 'axios';
import { REACT_APP_API } from 'config';

export * from './auth';
export * from './user';

export const instance = axios.create({
  baseURL: REACT_APP_API,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});