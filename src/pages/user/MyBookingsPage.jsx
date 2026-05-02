import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'

const BOOKINGS = [
  {
    id: 'STY-2026-00142',
    hotel: 'Grand Fiesta Americana',
    room: 'Suite Junior',
    checkIn: '10 jun 2026',
    checkOut: '14 jun 2026',
    nights: 4,
    total: 11200,
    status: 'confirmed',
  },
  {
    id: 'STY-2026-00089',
    hotel: 'Camino Real Polanco',
    room: 'Suite',
    checkIn: '20 may 2026',
    checkOut: '22 may 2026',
    nights: 2,
    total: 6400,
    status: 'completed',
  },
  {
    id: 'STY-2026-00061',
    hotel: 'Hilton Mexico City Reforma',
    room: 'Habitación Doble',
    checkIn: '01 abr 2026',
    checkOut: '03 abr 2026',
    nights: 2,
    total: 3600,
    status: 'cancelled',
  },
]

const STATUS = {
  confirmed: { label: 'Confirmada', class: 'bg-green-100 text-green-700' },
  completed: { label: 'Completada', class: 'bg-slate-100 text-slate-500' },
  cancelled: { label: 'Cancelada', class: 'bg-red-100 text-red-500' },
}

function MyBookingsPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-8 py-8">
        <h1 className="text-xl font-medium text-slate-800 mb-6">Mis reservas</h1>

        <div className="flex flex-col gap-4">
          {BOOKINGS.map(b => (
            <div
              key={b.id}
              onClick={() => navigate(`/my-bookings/${b.id}`)}
              className="bg-white border border-slate-200 rounded-xl flex overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            >
              {/* Imagen */}
              <div className="w-36 shrink-0 bg-gradient-to-br from-slate-700 to-blue-900" />

              {/* Info */}
              <div className="flex-1 p-5 flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-slate-800">{b.hotel}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS[b.status].class}`}>
                      {STATUS[b.status].label}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-1">{b.room}</p>
                  <p className="text-xs text-slate-400">
                    {b.checkIn} — {b.checkOut} · {b.nights} noches
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-base font-medium text-slate-800 mb-1">
                    ${b.total.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-400">{b.id}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyBookingsPage