import { defineStore } from 'pinia'
import api from '../services/api'
import { login } from '../services/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    user: null,
    isAuthenticated: !!localStorage.getItem('accessToken'),
  }),
  getters: {
    currentUser(state) {
      if (!state.user) return null
      return state.user.id || (state.user.user && state.user.user.id)
    },
  },
  actions: {
    async loginSuccess(data) {
      const response = await login(data)
      
      this.accessToken = response.data.access
      this.refreshToken = response.data.refresh
      this.isAuthenticated = true
      localStorage.setItem('accessToken', this.accessToken)
      localStorage.setItem('refreshToken', this.refreshToken)
    },
  
    async fetchUser() {
      if (!this.accessToken) {
        return
      }
      try {
        const response = await api.get('school/')
        this.user = response.data
      } catch (error) {
        console.error(error)
      }
    },
    logout() {
      this.accessToken = null
      this.refreshToken = null
      this.isAuthenticated = false
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    },
  },
})
