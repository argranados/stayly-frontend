import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AdminSidebar from '../../components/layout/AdminSidebar'
import { hotelService } from '../../services/hotelService'
import { roomService } from '../../services/roomService'

function RoomsAdminPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [hotel, setHotel] = useState(null)
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hotelData, roomsData] = await Promise.all([
          hotelService.getById(id),
          roomService.getByHotel(id)
        ])
        setHotel(hotelData)
        setRooms(roomsData)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  const handleDelete = async (roomId) => {
    if (!confirm('¿Eliminar esta habitación?')) return
    try {
      await roomService.delete(id, roomId)
      setRooms(prev => prev.filter(r => r.id !== roomId))
    } catch (err) {
      console.error(err)
      alert('Error al eliminar la habitación')
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex-1 bg-slate-50 flex items-center justify-center text-slate-400">
          <p className="text-sm">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex-1 bg-slate-50 p-8">
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin/hotels')}
            className="text-sm text-slate-400 hover:text-slate-600 mb-4 flex items-center gap-1"
          >
            ← Hoteles
          </button>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-medium text-slate-800 mb-1">Habitaciones</h1>
              {hotel && (
                <p className="text-sm text-slate-400">{hotel.name} · {hotel.city}</p>
              )}
            </div>
            <button
              onClick={() => navigate(`/admin/hotels/${id}/rooms/new`)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors"
            >
              + Agregar habitación
            </button>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                {['Número', 'Tipo', 'Capacidad', 'Precio / noche', 'Estado', 'Acciones'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rooms.map(room => (
                <tr key={room.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 text-sm font-medium text-slate-800">{room.roomNumber}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{room.type}</td>
                  <td className="px-5 py-4 text-sm text-slate-400">{room.capacity} personas</td>
                  <td className="px-5 py-4 text-sm text-slate-700">${Number(room.pricePerNight).toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${room.status === 'AVAILABLE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-500'}`}>
                      {room.status === 'AVAILABLE' ? 'Disponible' : 'No disponible'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-4">
                      <button
                        onClick={() => navigate(`/admin/hotels/${id}/rooms/${room.id}/edit`)}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(room.id)}
                        className="text-xs text-red-400 hover:underline"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!loading && rooms.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <p className="text-sm mb-2">No hay habitaciones registradas</p>
              <button
                onClick={() => navigate(`/admin/hotels/${id}/rooms/new`)}
                className="text-xs text-blue-600 hover:underline"
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