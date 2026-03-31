import api from './api'

export const getRequirements = () => api.get('requirements/')
export const  createRequirements = (data) => api.post('requirements/', data)
export const deleteRequirements = (id, data)=> api.patch(`requirements/${id}/`, data)
