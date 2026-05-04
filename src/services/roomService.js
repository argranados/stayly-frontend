import api from './api'

export const roomService = {

  getByHotel: async (hotelId) => {
    const response = await api.get(`/hotels/${hotelId}/rooms`)
    return response.data
  },

  getById: async (hotelId, roomId) => {
    const response = await api.get(`/hotels/${hotelId}/rooms/${roomId}`)
    return response.data
  },

  create: async (hotelId, room) => {
    const response = await api.post(`/hotels/${hotelId}/rooms`, room)
    return response.data
  },

  update: async (hotelId, roomId, room) => {
    const response = await api.put(`/hotels/${hotelId}/rooms/${roomId}`, room)
    return response.data
  },

  delete: async (hotelId, roomId) => {
    await api.delete(`/hotels/${hotelId}/rooms/${roomId}`)
  }

}