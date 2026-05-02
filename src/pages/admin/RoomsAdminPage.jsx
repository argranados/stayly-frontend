import { useParams, useNavigate } from 'react-router-dom'
import AdminSidebar from '../../components/layout/AdminSidebar'

const HOTELES = {
  1: { name: 'Grand Fiesta Americana', city: 'Ciudad de México' },
  2: { name: 'Camino Real Polanco', city: 'Ciudad de México' },
  3: { name: 'Hilton Mexico City', city: 'Ciudad de México' },
  4: { name: 'Hyatt Ziva', city: 'Cancún' },
}

const ROOMS = {
  1: [
    { id: 101, type: 'Suite Junior', price: 2800, capacity: 2, beds: '1 cama king', available: true },
    { id: 102, type: 'Suite Master', price: 3500, capacity: 3, beds: '1 cama king + sofá cama', available: true },
    { id: 103, type: 'Habitación Deluxe', price: 2200, capacity: 2, beds: '2 camas queen', available: true },
    { id: 104, type: 'Habitación Estándar', price: 1800, capacity: 2, beds: '1 cama matrimonial', available: false },
  ],
  2: [
    { id: 201, type: 'Habitación Deluxe', price: 2200, capacity: 2, beds: '1 cama king', available: true },
    { id: 202, type: 'Suite', price: 3200, capacity: 3, beds: '1 cama king + sala', available: true },
  ],
}

function RoomsAdminPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const hotel = HOTELES[id]
  const rooms = ROOMS[id] ?? []

  if (!hotel) {
    return (
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex-1 bg-slate-50 flex items-center justify-center text-slate-400">
          <p>Hotel no encontrado</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex-1 bg-slate-50 p-8">

        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin')}
            className="text-sm text-slate-400 hover:text-slate-600 mb-4 flex items-center gap-1"
          >
            ← Dashboard
          </button>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-medium text-slate-800 mb-1">Habitaciones</h1>
              <p className="text-sm text-slate-400">{hotel.name} · {hotel.city}</p>
            </div>
            <button
              onClick={() => navigate(`/admin/hotels/${id}/rooms/new`)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors"
            >
              + Agregar habitación
            </button>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                {['Tipo', 'Camas', 'Capacidad', 'Precio / noche', 'Estado', 'Acciones'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rooms.map(room => (
                <tr key={room.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 text-sm font-medium text-slate-800">{room.type}</td>
                  <td className="px-5 py-4 text-sm text-slate-400">{room.beds}</td>
                  <td className="px-5 py-4 text-sm text-slate-400">{room.capacity} personas</td>
                  <td className="px-5 py-4 text-sm text-slate-700">${room.price.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${room.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-500'}`}>
                      {room.available ? 'Disponible' : 'No disponible'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-4">
                      <button className="text-xs text-blue-600 hover:underline">
                        Editar
                      </button>
                      <button className="text-xs text-red-400 hover:underline">
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {rooms.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <p className="text-sm">No hay habitaciones registradas</p>
              <button
                onClick={() => navigate(`/admin/hotels/${id}/rooms/new`)}
                className="text-xs text-blue-600 hover:underline mt-2"
              >
                Agregar la primera habitación
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default RoomsAdminPage