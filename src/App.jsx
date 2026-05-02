import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/public/LandingPage'
import HotelsPage from './pages/public/HotelsPage'
import HotelDetailPage from './pages/public/HotelDetailPage'
import BookingPage from './pages/booking/BookingPage'
import BookingConfirmationPage from './pages/booking/BookingConfirmationPage'
import MyBookingsPage from './pages/user/MyBookingsPage'
import MyBookingDetailPage from './pages/user/MyBookingDetailPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import HotelFormPage from './pages/admin/HotelFormPage'
import RoomsAdminPage from './pages/admin/RoomsAdminPage'
import RoomFormPage from './pages/admin/RoomFormPage'
import BookingsAdminPage from './pages/admin/BookingsAdminPage'
import HotelsAdminPage from './pages/admin/HotelsAdminPage'

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
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/hotels" element={<HotelsAdminPage />} />
        <Route path="/admin/hotels/new" element={<HotelFormPage />} />
        <Route path="/admin/hotels/:id/edit" element={<HotelFormPage />} />
        <Route path="/admin/hotels/:id/rooms" element={<RoomsAdminPage />} />
        <Route path="/admin/hotels/:id/rooms/new" element={<RoomFormPage />} />
        <Route path="/admin/bookings" element={<BookingsAdminPage />} />        
      </Routes>
    </BrowserRouter>
  )
}

export default App