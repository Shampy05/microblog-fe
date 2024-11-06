import axios from 'axios'
import type { App } from 'vue'
import { useAuthStore } from '@/stores/auth'

const api = axios.create({
  baseURL: 'http://localhost:5001',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore()
      await authStore.logout()
      window.location.href = '/login'
    }

    return Promise.reject(error)
  },
)

export default {
  install: (app: App) => {
    app.config.globalProperties.$axios = api
  },
}

export { api }
