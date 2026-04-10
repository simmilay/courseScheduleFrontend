import api from './api'

export const getCourse = () => api.get('courses/')

export const createCourse = (data) => api.post('courses/', data)

export const deleteCourse = (id, data) => api.patch(`courses/${id}/`, data)

export const getTeacherCourses = (id) => api.get(`teachers/${id}/courses/`)

export const updateCourse = (id, data) => api.put(`courses/${id}/`, data)