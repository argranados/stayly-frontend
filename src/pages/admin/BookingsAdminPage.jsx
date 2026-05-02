import AdminSidebar from '../../components/layout/AdminSidebar'

const BOOKINGS = [
  { id: 'STY-2026-00142', guest: 'Alfonso García', hotel: 'Grand Fiesta Americana', room: 'Suite Junior', checkIn: '10 jun 2026', checkOut: '14 jun 2026', total: 11200, status: 'confirmed' },
  { id: 'STY-2026-00089', guest: 'María López', hotel: 'Camino Real Polanco', room: 'Suite', checkIn: '20 may 2026', checkOut: '22 may 2026', total: 6400, status: 'completed' },
  { id: 'STY-2026-00061', guest: 'Carlos Mendoza', hotel: 'Hilton Mexico City', room: 'Habitación Doble', checkIn: '01 abr 2026', checkOut: '03 abr 2026', total: 3600, status: 'cancelled' },
]

const STATUS = {
  confirmed: { label: 'Confirmada', class: 'bg-green-100 text-green-700' },
  completed: { label: 'Completada', class: 'bg-slate-100 text-slate-500' },
  cancelled: { label: 'Cancelada', class: 'bg-red-100 text-red-500' },
}

function BookingsAdminPage() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex-1 bg-slate-50 p-8">
        <div className="mb-8">
          <h1 className="text-xl font-medium text-slate-800 mb-1">Reservas</h1>
          <p className="text-sm text-slate-400">{BOOKINGS.length} reservas registradas</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                {['ID', 'Huésped', 'Hotel', 'Habitación', 'Check-in', 'Check-out', 'Total', 'Estado'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BOOKINGS.map(b => (
                <tr key={b.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 text-xs text-slate-400">{b.id}</td>
                  <td className="px-5 py-4 text-sm font-medium text-slate-800">{b.guest}</td>
                  <td className="px-5 py-4 text-sm text-slate-400">{b.hotel}</td>
                  <td className="px-5 py-4 text-sm text-slate-400">{b.room}</td>
                  <td className="px-5 py-4 text-sm text-slate-400">{b.checkIn}</td>
                  <td className="px-5 py-4 text-sm text-slate-400">{b.checkOut}</td>
                  <td className="px-5 py-4 text-sm font-medium text-slate-700">${b.total.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${STATUS[b.status].class}`}>
                      {STATUS[b.status].label}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default BookingsAdminPage