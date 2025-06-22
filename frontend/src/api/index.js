import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
})

export const createEvent = (data) => API.post('/events/', data)
export const getEvents = () => API.get('/events/')
export const getEvent = (id) => API.get(`/events/${id}`)
export const bookSlot = (eventId, timeSlotId, data) => 
  API.post(`/events/${eventId}/bookings?time_slot_id=${timeSlotId}`, data)
export const getUserBookings = (email) => API.get(`/users/${email}/bookings`)