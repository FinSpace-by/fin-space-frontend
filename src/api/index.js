import axios from 'axios'
import { REACT_APP_API } from '@config'
import { ROUTES, HTTP_STATUSES } from '@constants'

export * from './auth'
export * from './user'
export * from './category'
export * from './scanner'
export * from './accounts'
export * from './verification'

const handleUnauthorized = () => {
  localStorage.removeItem('token')
  window.location.assign(ROUTES.ROOT.PATH)
}

export const instance = axios.create({
  baseURL: REACT_APP_API + '/api',
  withCredentials: true,
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token && !config.url?.includes('/auth/')) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === HTTP_STATUSES.UNAUTHORIZED) {
      handleUnauthorized()
    }
    return Promise.reject(error)
  }
)
