import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getEvent } from '../api'
import TimeSlotPicker from '../components/TimeSlotPicker'
import BookingForm from '../components/BookingForm'

export default function EventDetail() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await getEvent(id)
        setEvent(response.data)
      } catch (err) {
        setError('Failed to load event details')
      } finally {
        setLoading(false)
      }
    }
    
    fetchEvent()
  }, [id])

  if (loading) return <div className="text-center py-8">Loading event...</div>
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
      <p className="text-gray-600 mb-6">{event.description}</p>
      
      <h2 className="text-2xl font-semibold mb-4">Available Time Slots</h2>
      
      {!selectedSlot ? (
        <TimeSlotPicker 
          slots={event.time_slots} 
          onSelect={setSelectedSlot} 
        />
      ) : (
        <BookingForm 
          eventId={id}
          slotId={selectedSlot}
          onCancel={() => setSelectedSlot(null)}
        />
      )}
    </div>
  )
}