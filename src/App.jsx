import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute, AdminRoute } from './components/layout/ProtectedRoute'
import LandingPage from './pages/public/LandingPage'
import HotelsPage from './pages/public/HotelsPage'
import HotelDetailPage from './pages/public/HotelDetailPage'
import BookingPage from './pages/booking/BookingPage'
import BookingConfirmationPage from './pages/booking/BookingConfirmationPage'
import MyBookingsPage from './pages/user/MyBookingsPage'
import MyBookingDetailPage from './pages/user/MyBookingDetailPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import HotelsAdminPage from './pages/admin/HotelsAdminPage'
import HotelFormPage from './pages/admin/HotelFormPage'
import RoomsAdminPage from './pages/admin/RoomsAdminPage'
import RoomFormPage from './pages/admin/RoomFormPage'
import BookingsAdminPage from './pages/admin/BookingsAdminPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/hotels/:id" element={<HotelDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Rutas protegidas - usuario autenticado */}
          <Route path="/booking/:roomId" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
          <Route path="/booking/confirmation" element={<ProtectedRoute><BookingConfirmationPage /></ProtectedRoute>} />
          <Route path="/my-bookings" element={<ProtectedRoute><MyBookingsPage /></ProtectedRoute>} />
          <Route path="/my-bookings/:id" element={<ProtectedRoute><MyBookingDetailPage /></ProtectedRoute>} />

          {/* Rutas protegidas - solo admin */}
          <Route path="/admin" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
          <Route path="/admin/hotels" element={<AdminRoute><HotelsAdminPage /></AdminRoute>} />
          <Route path="/admin/hotels/new" element={<AdminRoute><HotelFormPage /></AdminRoute>} />
          <Route path="/admin/hotels/:id/edit" element={<AdminRoute><HotelFormPage /></AdminRoute>} />
          <Route path="/admin/hotels/:id/rooms" element={<AdminRoute><RoomsAdminPage /></AdminRoute>} />
          <Route path="/admin/hotels/:id/rooms/new" element={<AdminRoute><RoomFormPage /></AdminRoute>} />
          <Route path="/admin/hotels/:id/rooms/:roomId/edit" element={<AdminRoute><RoomFormPage /></AdminRoute>} />
          <Route path="/admin/bookings" element={<AdminRoute><BookingsAdminPage /></AdminRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App