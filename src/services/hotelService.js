import api from './api'

export const hotelService = {

  getAll: async () => {
    const response = await api.get('/hotels')
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`/hotels/${id}`)
    return response.data
  },

  create: async (hotel) => {
    const response = await api.post('/hotels', hotel)
    return response.data
  },

  update: async (id, hotel) => {
    const response = await api.put(`/hotels/${id}`, hotel)
    return response.data
  },

  delete: async (id) => {
    await api.delete(`/hotels/${id}`)
  }

}