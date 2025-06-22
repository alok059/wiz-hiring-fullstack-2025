import { Link } from 'react-router-dom'
import { FaCalendarPlus } from 'react-icons/fa'

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex items-center">
          <FaCalendarPlus className="mr-2" />
          Calendly Clone
        </Link>
        <div className="flex space-x-4">
          <Link to="/create-event" className="hover:bg-indigo-700 px-3 py-2 rounded">
            Create Event
          </Link>
          <Link to="/my-bookings" className="hover:bg-indigo-700 px-3 py-2 rounded">
            My Bookings
          </Link>
        </div>
      </div>
    </nav>
  )
}