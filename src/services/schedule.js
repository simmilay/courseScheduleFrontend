import api from './api'

export const getSchedule = () => api.get('schedule/')
export const createSchedule = (data) => api.post('schedule/', data)
export const deleteSchedule = (id, data) => api.patch(`schedule/${id}/`, data)
