import axios from 'axios'
import { REACT_APP_API } from '@config'

export * from './auth'
export * from './user'
export * from './category'

export const instance = axios.create({
  baseURL: REACT_APP_API + `/api`,
  withCredentials: true,
})
