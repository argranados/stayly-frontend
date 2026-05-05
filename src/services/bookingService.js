import api from './api'

const BOOKING_URL = 'http://localhost:8082/api/v1'

export const bookingService = {

  create: async (booking) => {
    const response = await fetch(`${BOOKING_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking)
    })
    if (!response.ok) throw new Error(`Error ${response.status}`)
    return response.json()
  },

  getById: async (id) => {
    const response = await fetch(`${BOOKING_URL}/bookings/${id}`)
    if (!response.ok) throw new Error(`Error ${response.status}`)
    return response.json()
  },

  getByUserId: async (userId) => {
    const response = await fetch(`${BOOKING_URL}/bookings?userId=${userId}`)
    if (!response.ok) throw new Error(`Error ${response.status}`)
    return response.json()
  },

  cancel: async (id) => {
    const response = await fetch(`${BOOKING_URL}/bookings/${id}/cancel`, {
      method: 'PATCH'
    })
    if (!response.ok) throw new Error(`Error ${response.status}`)
    return response.json()
  }

}