import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getEvents } from '../api'

export default function Home() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents()
        setEvents(response.data)
      } catch (err) {
        setError('Failed to load events')
      } finally {
        setLoading(false)
      }
    }
    
    fetchEvents()
  }, [])

  if (loading) return <div className="text-center py-8">Loading events...</div>
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Available Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{event.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
              <Link 
                to={`/event/${event.id}`} 
                className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}