import { useState } from 'react'
import { getUserBookings } from '../api'
import { format } from 'date-fns'

export default function MyBookings() {
  const [email, setEmail] = useState('')
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    setError('')

    try {
      const response = await getUserBookings(email)
      setBookings(response.data)
    } catch (err) {
      setError('Failed to fetch bookings. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const formatTime = async (utcDate, callback) => {
    const { utcToZonedTime } = await import('date-fns-tz')
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const zonedDate = utcToZonedTime(utcDate, userTimeZone)
    callback(format(zonedDate, 'MMM dd, yyyy h:mm a'))
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Enter Your Email</label>
          <div className="flex">
            <input
              type="email"
              required
              className="flex-grow px-3 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-r hover:bg-indigo-700"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
      </form>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {bookings.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 divide-y">
            {bookings.map(booking => (
              <AsyncBookingCard key={booking.id} booking={booking} formatTime={formatTime} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          {email ? 'No bookings found for this email' : 'Enter your email to view bookings'}
        </div>
      )}
    </div>
  )
}

function AsyncBookingCard({ booking, formatTime }) {
  const [startStr, setStartStr] = useState('')
  const [endStr, setEndStr] = useState('')

  useState(() => {
    formatTime(booking.start, setStartStr)
    formatTime(booking.end, setEndStr)
  }, [])

  return (
    <div className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-indigo-600">{booking.event_title}</h2>
          <p className="text-gray-600 mt-1">
            {startStr && endStr ? `${startStr} - ${endStr}` : 'Loading...'}
          </p>
        </div>
        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
          Confirmed
        </div>
      </div>
      <div className="mt-4">
        <p><span className="font-medium">Name:</span> {booking.user_name}</p>
        <p><span className="font-medium">Email:</span> {booking.user_email}</p>
      </div>
    </div>
  )
}
