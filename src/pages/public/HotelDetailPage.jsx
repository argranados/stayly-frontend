import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import RoomCard from '../../components/room/RoomCard'
import { hotelService } from '../../services/hotelService'
import { roomService } from '../../services/roomService'

function HotelDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [hotel, setHotel] = useState(null)
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
        console.error('Error completo:', err)
        console.error('Response:', err.response?.data)
        setError('No se pudo cargar el hotel')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex items-center justify-center py-32 text-slate-400">
          <p className="text-sm">Cargando hotel...</p>
        </div>
      </div>
    )
  }

  if (error || !hotel) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32 text-slate-400">
          <p className="text-lg mb-2">Hotel no encontrado</p>
          <button onClick={() => navigate('/hotels')} className="text-sm text-blue-600 hover:underline">
            Regresar a resultados
          </button>
        </div>
      </div>
    )
  }

  const minPrice = rooms.length > 0 ? Math.min(...rooms.map(r => Number(r.pricePerNight))) : null

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-700 to-blue-900 h-48 flex items-end px-8 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-amber-400 text-sm">{'★'.repeat(hotel.stars)}</span>
            <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">
              {hotel.city}, {hotel.country}
            </span>
          </div>
          <h1 className="text-2xl font-medium text-white mb-1">{hotel.name}</h1>
          <p className="text-sm text-white/60">{hotel.address}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-8 flex gap-6">

        {/* Contenido principal */}
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-800 mb-4">
            Habitaciones disponibles
            {rooms.length > 0 && (
              <span className="text-slate-400 font-normal ml-2">({rooms.length})</span>
            )}
          </p>

          {rooms.length > 0 ? (
            <div className="flex flex-col gap-3">
              {rooms.map(room => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-slate-400">
              <p className="text-sm">No hay habitaciones disponibles</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-52 shrink-0">
          <div className="bg-white border border-slate-200 rounded-xl p-5 sticky top-6">
            <p className="text-sm font-medium text-slate-800 mb-4">Tu búsqueda</p>
            <div className="flex flex-col gap-3 mb-4">
              {[
                { label: 'Llegada', value: '10 jun 2026' },
                { label: 'Salida', value: '14 jun 2026' },
                { label: 'Huéspedes', value: '2 huéspedes' },
                { label: 'Noches', value: '4 noches' },
              ].map(item => (
                <div key={item.label}>
                  <p className="text-xs text-slate-400 mb-0.5">{item.label}</p>
                  <p className="text-sm font-medium text-slate-700">{item.value}</p>
                </div>
              ))}
            </div>
            {minPrice && (
              <div className="border-t border-slate-100 pt-3">
                <p className="text-xs text-slate-400 mb-1">Precio desde</p>
                <p className="text-xl font-medium text-slate-800">
                  ${minPrice.toLocaleString()}
                  <span className="text-xs text-slate-400 font-normal"> / noche</span>
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default HotelDetailPage