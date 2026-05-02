import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'

const BOOKINGS = {
  'STY-2026-00142': {
    id: 'STY-2026-00142',
    hotel: 'Grand Fiesta Americana',
    room: 'Suite Junior',
    address: 'Av. Paseo de la Reforma 80, Polanco',
    checkIn: '10 jun 2026',
    checkOut: '14 jun 2026',
    nights: 4,
    guests: 2,
    pricePerNight: 2800,
    total: 11200,
    status: 'confirmed',
    beds: '1 cama king',
  },
  'STY-2026-00089': {
    id: 'STY-2026-00089',
    hotel: 'Camino Real Polanco',
    room: 'Suite',
    address: 'Av. Mariano Escobedo 700, Polanco',
    checkIn: '20 may 2026',
    checkOut: '22 may 2026',
    nights: 2,
    guests: 2,
    pricePerNight: 3200,
    total: 6400,
    status: 'completed',
    beds: '1 cama king + sala',
  },
  'STY-2026-00061': {
    id: 'STY-2026-00061',
    hotel: 'Hilton Mexico City Reforma',
    room: 'Habitación Doble',
    address: 'Av. Paseo de la Reforma 195, Centro',
    checkIn: '01 abr 2026',
    checkOut: '03 abr 2026',
    nights: 2,
    guests: 2,
    pricePerNight: 1800,
    total: 3600,
    status: 'cancelled',
    beds: '2 camas queen',
  },
}

const STATUS = {
  confirmed: { label: 'Confirmada', class: 'bg-green-100 text-green-700' },
  completed: { label: 'Completada', class: 'bg-slate-100 text-slate-500' },
  cancelled: { label: 'Cancelada', class: 'bg-red-100 text-red-500' },
}

function MyBookingDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const booking = BOOKINGS[id]

  if (!booking) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32 text-slate-400">
          <p className="text-lg mb-2">Reserva no encontrada</p>
          <button onClick={() => navigate('/my-bookings')} className="text-sm text-blue-600 hover:underline">
            Ver mis reservas
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-8 py-8">
        <button
          onClick={() => navigate('/my-bookings')}
          className="text-sm text-slate-400 hover:text-slate-600 mb-6 flex items-center gap-1"
        >
          ← Mis reservas
        </button>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-medium text-slate-800">Reserva {booking.id}</h1>
          <span className={`text-xs px-3 py-1 rounded-full ${STATUS[booking.status].class}`}>
            {STATUS[booking.status].label}
          </span>
        </div>

        {/* Hotel */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-4">
          <div className="h-36 bg-gradient-to-br from-slate-700 to-blue-900" />
          <div className="p-5">
            <p className="text-sm font-medium text-slate-800 mb-1">{booking.hotel}</p>
            <p className="text-xs text-slate-400 mb-1">{booking.room} · {booking.beds}</p>
            <p className="text-xs text-slate-400">{booking.address}</p>
          </div>
        </div>

        {/* Detalle */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 mb-4">
          <p className="text-sm font-medium text-slate-800 mb-4">Detalle de la estancia</p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Check-in', value: booking.checkIn },
              { label: 'Check-out', value: booking.checkOut },
              { label: 'Noches', value: booking.nights },
              { label: 'Huéspedes', value: `${booking.guests} huéspedes` },
            ].map(item => (
              <div key={item.label}>
                <p className="text-xs text-slate-400 mb-1">{item.label}</p>
                <p className="text-sm font-medium text-slate-700">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6">
          <p className="text-sm font-medium text-slate-800 mb-4">Resumen de pago</p>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">${booking.pricePerNight.toLocaleString()} x {booking.nights} noches</span>
              <span className="text-slate-700">${booking.total.toLocaleString()}</span>
            </div>
            <div className="border-t border-slate-100 pt-2 flex justify-between font-medium">
              <span className="text-slate-800">Total</span>
              <span className="text-slate-800">${booking.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Acciones */}
        {booking.status === 'confirmed' && (
          <button className="w-full border border-red-200 text-red-400 hover:bg-red-50 text-sm font-medium py-3 rounded-xl transition-colors">
            Cancelar reserva
          </button>
        )}
      </div>
    </div>
  )
}

export default MyBookingDetailPage