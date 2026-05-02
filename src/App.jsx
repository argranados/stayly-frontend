import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/public/LandingPage'
import HotelsPage from './pages/public/HotelsPage'
import HotelDetailPage from './pages/public/HotelDetailPage'
import BookingPage from './pages/booking/BookingPage'
import BookingConfirmationPage from './pages/booking/BookingConfirmationPage'
import MyBookingsPage from './pages/user/MyBookingsPage'
import MyBookingDetailPage from './pages/user/MyBookingDetailPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/hotels/:id" element={<HotelDetailPage />} />
        <Route path="/booking/:roomId" element={<BookingPage />} />
        <Route path="/booking/confirmation" element={<BookingConfirmationPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
        <Route path="/my-bookings/:id" element={<MyBookingDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App