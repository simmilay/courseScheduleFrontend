import api from './api'

export const getCourse = (currentPage) =>
  api.get('school-courses/', {
    params: {
      page: currentPage,
    },
  })

export const getAllCourse = () => api.get('school-courses/lookup/')
export const getDefaultCoursesLookup = () => api.get('courses/lookup/')
export const createCourse = (data) => api.post('school-courses/', data)
export const deleteCourse = (id, data) => api.patch(`school-courses/${id}/`, data)
export const getTeacherCourses = (id) => api.get(`teachers/${id}/school-courses/`)
export const updateCourse = (id, data) => api.put(`school-courses/${id}/`, data)

export const getDefaultCourses = () => api.get('courses/')
export const createNewCourse = (data) => api.post('courses/', data)
