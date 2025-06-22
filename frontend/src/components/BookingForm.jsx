import { useState } from 'react'
import { bookSlot } from '../api'

export default function BookingForm({ eventId, slotId, onCancel }) {
  const [formData, setFormData] = useState({ 
    user_name: '', 
    user_email: '' 
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    
    try {
      await bookSlot(eventId, slotId, formData)
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        onCancel()
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.detail || 'Booking failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
        <p>Booking successful! Redirecting back...</p>
      </div>
    )
  }

  return (
    <div className="border rounded-lg p-6 bg-white">
      <h3 className="text-xl font-semibold mb-4">Book Your Time Slot</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.user_name}
            onChange={(e) => setFormData({...formData, user_name: e.target.value})}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.user_email}
            onChange={(e) => setFormData({...formData, user_email: e.target.value})}
          />
        </div>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-indigo-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Booking...' : 'Confirm Booking'}
          </button>
        </div>
      </form>
    </div>
  )
}