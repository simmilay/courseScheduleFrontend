import api from './api'

export const getRooms = (currentPage) => api.get('rooms/', {
     params: {
          page: currentPage
     }
})
export const createRooms = (data) => api.post('rooms/', data)
export const deleteRooms = (id, data) => api.patch(`rooms/${id}/`, data)
export const getLabRooms = () => api.get('/rooms/?room_type=lab')
export const updateRoom = (id, data) => api.put(`rooms/${id}/`, data)