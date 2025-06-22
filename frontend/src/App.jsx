import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import EventDetail from './pages/EventDetail'
import CreateEvent from './pages/CreateEvent'
import MyBookings from './pages/MyBookings'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
      </div>
    </div>
  )
}

export default App