import { useNavigate } from 'react-router-dom'

function RoomCard({ room }) {
  const navigate = useNavigate()
  const isAvailable = room.status === 'AVAILABLE'

  return (
    <div className={`bg-white border border-slate-200 rounded-xl flex overflow-hidden ${!isAvailable ? 'opacity-50' : 'hover:shadow-md transition-shadow'}`}>

      {/* Imagen */}
      <div className="w-40 shrink-0 bg-gradient-to-br from-slate-700 to-blue-900" />

      {/* Info */}
      <div className="flex-1 p-5 flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-slate-800 mb-1">{room.type}</p>
          <p className="text-xs text-slate-400 mb-1">Habitación {room.roomNumber} · Hasta {room.capacity} personas</p>
          {!isAvailable && (
            <span className="text-xs text-red-400">No disponible</span>
          )}
        </div>
        <div className="text-right">
          <p className="text-base font-medium text-slate-800 mb-2">
            ${Number(room.pricePerNight).toLocaleString()}
            <span className="text-xs text-slate-400 font-normal"> / noche</span>
          </p>
          {isAvailable ? (
            <button
              onClick={() => navigate(`/booking/${room.id}`)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Reservar
            </button>
          ) : (
            <span className="bg-slate-100 text-slate-400 text-xs px-4 py-2 rounded-lg">
              No disponible
            </span>
          )}
        </div>
      </div>

    </div>
  )
}

export default RoomCard