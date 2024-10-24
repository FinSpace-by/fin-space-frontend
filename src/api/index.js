import axios from 'axios';

export * from './auth';
export * from './user';

export const instance = axios.create({
  baseURL: 'https://hedgehog-whole-noticeably.ngrok-free.app',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'ngrok-skip-browser-warning': 'true',
  },
  withCredentials: true,
});
