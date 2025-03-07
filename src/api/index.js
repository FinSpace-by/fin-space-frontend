import axios from 'axios'
import { REACT_APP_API } from '@config'

export * from './auth'
export * from './user'
export * from './category'
export * from './scanner'

export const instance = axios.create({
  baseURL: REACT_APP_API + `/api`,
  withCredentials: true,
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token && !config.url.includes('/auth/login')) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)
