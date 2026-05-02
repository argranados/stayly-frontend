import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import RoomCard from '../../components/room/RoomCard'

const HOTELES = {
  1: {
    id: 1,
    name: 'Grand Fiesta Americana',
    zone: 'Polanco',
    city: 'Ciudad de México',
    address: 'Av. Paseo de la Reforma 80, Polanco',
    stars: 5,
    description: 'Hotel de lujo ubicado en el corazón de Polanco, a pasos de los mejores restaurantes y tiendas de la ciudad. Cuenta con spa, alberca y restaurante gourmet.',
    amenities: ['Spa', 'Alberca', 'Gimnasio', 'Restaurante', 'WiFi', 'Estacionamiento'],
    rooms: [
      { id: 101, type: 'Suite Junior', price: 2800, capacity: 2, beds: '1 cama king', available: true },
      { id: 102, type: 'Suite Master', price: 3500, capacity: 3, beds: '1 cama king + sofá cama', available: true },
      { id: 103, type: 'Habitación Deluxe', price: 2200, capacity: 2, beds: '2 camas queen', available: true },
      { id: 104, type: 'Habitación Estándar', price: 1800, capacity: 2, beds: '1 cama matrimonial', available: false },
    ]
  },
  2: {
    id: 2,
    name: 'Camino Real Polanco',
    zone: 'Polanco',
    city: 'Ciudad de México',
    address: 'Av. Mariano Escobedo 700, Polanco',
    stars: 5,
    description: 'Icónico hotel de diseño arquitectónico único en Polanco. Referente de la hotelería mexicana con más de 50 años de historia.',
    amenities: ['Alberca', 'Gimnasio', 'Restaurante', 'WiFi', 'Bar', 'Estacionamiento'],
    rooms: [
      { id: 201, type: 'Habitación Deluxe', price: 2200, capacity: 2, beds: '1 cama king', available: true },
      { id: 202, type: 'Suite', price: 3200, capacity: 3, beds: '1 cama king + sala', available: true },
    ]
  }
}

function HotelDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const hotel = HOTELES[id]

  if (!hotel) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32 text-slate-400">
          <p className="text-lg mb-2">Hotel no encontrado</p>
          <button
            onClick={() => navigate('/hotels')}
            className="text-sm text-blue-600 hover:underline"
          >
            Regresar a resultados
          </button>
        </div>
      </div>
    )
  }

  const minPrice = Math.min(...hotel.rooms.map(r => r.price))

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-700 to-blue-900 h-48 flex items-end px-8 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-amber-400 text-sm">{'★'.repeat(hotel.stars)}</span>
            <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">
              {hotel.zone}, {hotel.city}
            </span>
          </div>
          <h1 className="text-2xl font-medium text-white mb-1">{hotel.name}</h1>
          <p className="text-sm text-white/60">{hotel.address}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-8 flex gap-6">

        {/* Contenido principal */}
        <div className="flex-1">

          {/* Sobre el hotel */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6">
            <p className="text-sm font-medium text-slate-800 mb-3">Sobre el hotel</p>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">{hotel.description}</p>
            <div className="flex flex-wrap gap-2">
              {hotel.amenities.map(a => (
                <span key={a} className="bg-slate-100 text-slate-500 text-xs px-3 py-1 rounded-full">
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* Habitaciones */}
          <p className="text-sm font-medium text-slate-800 mb-4">Habitaciones disponibles</p>
          <div className="flex flex-col gap-3">
            {hotel.rooms.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>

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
            <div className="border-t border-slate-100 pt-3">
              <p className="text-xs text-slate-400 mb-1">Precio desde</p>
              <p className="text-xl font-medium text-slate-800">
                ${minPrice.toLocaleString()}
                <span className="text-xs text-slate-400 font-normal"> / noche</span>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default HotelDetailPage