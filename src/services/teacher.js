import api from './api'

export const getTeachers = (currentPage) =>
  api.get('teachers/', {
    params: {
      page: currentPage,
    },
  })
export const createTeacher = (data) => api.post('teachers/', data)
export const deleteTeacher = (id, data) => api.patch(`teachers/${id}/`, data)
export const updateTeacher = (id, data) => api.put(`teachers/${id}/`, data)
export const getOffDay = () => api.get('teachers/off-day-choices/')
