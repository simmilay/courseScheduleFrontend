import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
})

const PUBLIC_ENDPOINTS = ['school/login/', 'school/', 'token/refresh/']

api.interceptors.request.use((config) => {
  const isPublic = PUBLIC_ENDPOINTS.some((url) => config.url?.includes(url) && config.method !== 'get')
  const token = localStorage.getItem('accessToken')
  if (token && !isPublic) {
    config.headers.set('Authorization', `Bearer ${token}`)
  }
  return config
})

// Bunu ekle
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true

      const refresh = localStorage.getItem('refreshToken')

      try {
        const res = await axios.post('http://127.0.0.1:8000/api/token/refresh/', { refresh })
        localStorage.setItem('accessToken', res.data.access)
        original.headers['Authorization'] = `Bearer ${res.data.access}`
        return api(original)
      } catch {
        // Refresh da geçersizse login'e at
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  },
)

export default api
