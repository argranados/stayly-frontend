import { useNavigate } from 'react-router-dom'
import AdminSidebar from '../../components/layout/AdminSidebar'

const METRICS = [
  { label: 'Hoteles', value: '12', sub: 'registrados' },
  { label: 'Habitaciones', value: '148', sub: 'en total' },
  { label: 'Reservas', value: '34', sub: 'este mes' },
  { label: 'Disponibles', value: '89', sub: 'habitaciones' },
]

const HOTELES = [
  { id: 1, name: 'Grand Fiesta Americana', city: 'Ciudad de México', stars: 5, rooms: 4 },
  { id: 2, name: 'Camino Real Polanco', city: 'Ciudad de México', stars: 5, rooms: 2 },
  { id: 3, name: 'Hilton Mexico City', city: 'Ciudad de México', stars: 4, rooms: 8 },
  { id: 4, name: 'Hyatt Ziva', city: 'Cancún', stars: 5, rooms: 6 },
]

function AdminDashboardPage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex-1 bg-slate-50 p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl font-medium text-slate-800 mb-1">Dashboard</h1>
          <p className="text-sm text-slate-400">Bienvenido al panel de administración de Stayly</p>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {METRICS.map(m => (
            <div key={m.label} className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">{m.label}</p>
              <p className="text-3xl font-medium text-slate-800 mb-1">{m.value}</p>
              <p className="text-xs text-slate-400">{m.sub}</p>
            </div>
          ))}
        </div>

        {/* Tabla */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 flex justify-between items-center">
            <p className="text-sm font-medium text-slate-800">Hoteles registrados</p>
            <button
              onClick={() => navigate('/admin/hotels/new')}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors"
            >
              + Agregar hotel
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                {['Nombre', 'Ciudad', 'Estrellas', 'Habitaciones', 'Acciones'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HOTELES.map(h => (
                <tr key={h.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 text-sm font-medium text-slate-800">{h.name}</td>
                  <td className="px-5 py-4 text-sm text-slate-400">{h.city}</td>
                  <td className="px-5 py-4 text-sm text-amber-400">{'★'.repeat(h.stars)}</td>
                  <td className="px-5 py-4 text-sm text-slate-400">{h.rooms} habitaciones</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-4">
                      <button
                        onClick={() => navigate(`/admin/hotels/${h.id}/edit`)}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => navigate(`/admin/hotels/${h.id}/rooms`)}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Habitaciones
                      </button>
                    </div>
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

export default AdminDashboardPage