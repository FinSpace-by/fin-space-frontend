import axios from 'axios'
import { REACT_APP_API } from '@config'
import { ROUTES } from '@constants'

export * from './auth'
export * from './user'
export * from './category'
export * from './scanner'
export * from './accounts'

const decodeJWT = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch {
    return null
  }
}

const isTokenExpired = (token) => {
  const decoded = decodeJWT(token)
  return decoded?.exp && decoded.exp * 1000 < Date.now()
}

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
      if (isTokenExpired(token)) {
        handleUnauthorized()
        return Promise.reject(new Error('Session expired'))
      }
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if ([401, 403].includes(error.response?.status)) {
      handleUnauthorized()
    }
    return Promise.reject(error)
  }
)
