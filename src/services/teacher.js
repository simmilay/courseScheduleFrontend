import api from './api'

export const getTeachers = () => api.get('teachers/')
export const createTeacher = (data) => api.post('teachers/', data)
export const deleteTeacher = (id, data) => api.patch(`teachers/${id}/`, data)