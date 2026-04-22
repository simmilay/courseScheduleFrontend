import api from './api'

export const getClassroom = (currentPage) => api.get('classrooms/', {
     params: {
          page: currentPage
     }
})
export const createClassroom = (data) => api.post('classrooms/', data)
export const deleteClassroom = (id, data) => api.patch(`classrooms/${id}/`, data)
export const updateClassroom = (id, data) => api.put(`classrooms/${id}/`, data)
