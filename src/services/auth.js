import api from './api'

export const register = async (data) => {
  return await api.post('school/', data)
}
export const login = (data) => api.post('school/login/', data)
