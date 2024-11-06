import { defineStore } from 'pinia'
import axios from 'axios'

interface User {
  id?: number
  username: string
  email?: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

const api = axios.create({
  baseURL: 'http://localhost:5001',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
  }),

  getters: {
    // get current user
    currentUser: state => state.user,
    // check if user is authenticated
    userIsAuthenticated: state => state.isAuthenticated,
  },

  actions: {
    async login(username: string, password: string) {
      try {
        const response = await api.post('/login', {
          username,
          password,
        })

        if (response.data.token) {
          this.token = response.data.token
          localStorage.setItem('token', response.data.token)
          this.isAuthenticated = true
          this.user = {
            username: response.data.username,
            ...response.data.user,
          }
          api.defaults.headers.common.Authorization = `Bearer ${this.token}`
          return true
        }

        return false
      } catch (err: any) {
        console.error('Login error: ', err)
        throw err
      }
    },

    async register(username: string, password: string, email: string) {
      try {
        const response = await api.post('/register', {
          username,
          password,
          email,
        })

        if (response.data.success) {
          return await this.login(username, password)
        }
        return false
      } catch (err) {
        console.error('Registration error: ', err)
        throw err
      }
    },

    async logout() {
      try {
        this.token = null
        this.user = null
        this.isAuthenticated = false
        localStorage.removeItem('token')
        delete api.defaults.headers.common.Authorization
      } catch (err) {
        console.log('Logout error: ', err)
        throw err
      }
    },

    async checkAuth() {
      const token = localStorage.getItem('token')
      if (!token) {
        this.isAuthenticated = false
        return false
      }

      try {
        api.defaults.headers.common.Authorization = `Bearer ${token}`

        const response = await api.get('/user/profile')

        if (response.data.user) {
          this.token = token
          this.user = response.data.user
          this.isAuthenticated = true
          return true
        }

        this.logout()
        return false
      } catch (error) {
        console.log('Auth check error: ', error)
        this.logout()
        return false
      }
    },

    async initializeAuth() {
      const token = localStorage.getItem('token')
      if (token) {
        return this.checkAuth()
      }
      return false
    },
  },
})
