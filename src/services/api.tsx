import axios from 'axios'
import { getToken } from './auth'

const api: any = axios.create({
  baseURL: 'https://kitsu.io/api/edge',
})

// Add a request interceptor
api.interceptors.request.use(
  function (config: any) {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error: any) {
    return Promise.reject(error)
  },
)

// Add a response interceptor
api.interceptors.response.use(
  function (response: any) {
    return response
  },
  function (error: any) {
    return Promise.reject(error)
  },
)

export default api
