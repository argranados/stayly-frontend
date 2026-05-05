import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from '../../components/layout/AdminSidebar'
import { hotelService } from '../../services/hotelService'

function HotelsAdminPage() {
  const navigate = useNavigate()
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const data = await hotelService.getAll()
        setHotels(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchHotels()
  }, [])

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex-1 bg-slate-50 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-xl font-medium text-slate-800 mb-1">Hoteles</h1>
            <p className="text-sm text-slate-400">
              {loading ? 'Cargando...' : `${hotels.length} hoteles registrados`}
            </p>
          </div>
          <button
            onClick={() => navigate('/admin/hotels/new')}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors"
          >
            + Agregar hotel
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                {['Nombre', 'Ciudad', 'País', 'Estrellas', 'Acciones'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hotels.map(h => (
                <tr key={h.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 text-sm font-medium text-slate-800">{h.name}</td>
                  <td className="px-5 py-4 text-sm text-slate-400">{h.city}</td>
                  <td className="px-5 py-4 text-sm text-slate-400">{h.country}</td>
                  <td className="px-5 py-4 text-sm text-amber-400">{'★'.repeat(h.stars)}</td>
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

          {!loading && hotels.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <p className="text-sm">No hay hoteles registrados</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HotelsAdminPage