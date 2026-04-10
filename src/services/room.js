import api from './api'

export const getRooms = () => api.get('rooms/')
export const createRooms = (data) => api.post('rooms/', data)
export const deleteRooms = (id, data) => api.patch(`rooms/${id}/`, data)
export const getLabRooms = () => api.get('/rooms/?room_type=lab')