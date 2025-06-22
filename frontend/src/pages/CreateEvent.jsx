import { useState } from 'react'
import { createEvent } from '../api'
import { useNavigate } from 'react-router-dom'

export default function CreateEvent() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    time_slots: [{ start: '', end: '', max_bookings: 1 }]
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    
    try {
      // Convert to UTC
      const eventData = {
        ...formData,
        time_slots: formData.time_slots.map(slot => ({
          ...slot,
          start: new Date(slot.start).toISOString(),
          end: new Date(slot.end).toISOString()
        }))
      }
      
      const response = await createEvent(eventData)
      navigate(`/event/${response.data.id}`)
    } catch (err) {
      setError('Failed to create event. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const addTimeSlot = () => {
    setFormData({
      ...formData,
      time_slots: [...formData.time_slots, { start: '', end: '', max_bookings: 1 }]
    })
  }

  const removeTimeSlot = (index) => {
    const newSlots = [...formData.time_slots]
    newSlots.splice(index, 1)
    setFormData({
      ...formData,
      time_slots: newSlots
    })
  }

  const updateTimeSlot = (index, field, value) => {
    const newSlots = [...formData.time_slots]
    newSlots[index][field] = value
    setFormData({
      ...formData,
      time_slots: newSlots
    })
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create New Event</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Event Title</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            rows="3"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Time Slots</h2>
            <button
              type="button"
              onClick={addTimeSlot}
              className="px-3 py-1 bg-green-600 text-white rounded text-sm"
            >
              Add Slot
            </button>
          </div>
          
          {formData.time_slots.map((slot, index) => (
            <div key={index} className="border rounded-lg p-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">Start Time</label>
                  <input
                    type="datetime-local"
                    required
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={slot.start}
                    onChange={(e) => updateTimeSlot(index, 'start', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">End Time</label>
                  <input
                    type="datetime-local"
                    required
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={slot.end}
                    onChange={(e) => updateTimeSlot(index, 'end', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Max Bookings</label>
                <input
                  type="number"
                  min="1"
                  className="w-32 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={slot.max_bookings}
                  onChange={(e) => updateTimeSlot(index, 'max_bookings', parseInt(e.target.value))}
                />
              </div>
              
              <button
                type="button"
                onClick={() => removeTimeSlot(index)}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm"
              >
                Remove Slot
              </button>
            </div>
          ))}
        </div>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-indigo-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating Event...' : 'Create Event'}
        </button>
      </form>
    </div>
  )
}