import { useNavigate } from 'react-router-dom'

function HotelCard({ hotel }) {
  const navigate = useNavigate()
  return (
    <div className="bg-white rounded-xl border border-slate-200 flex overflow-hidden hover:shadow-md transition-shadow cursor-pointer">

      {/* Imagen */}
      <div className="w-52 shrink-0 bg-gradient-to-br from-slate-700 to-blue-900 flex items-end p-3">
        <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">
          {hotel.roomType}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-1">
            <p className="text-sm font-medium text-slate-800">{hotel.name}</p>
            <p className="text-base font-medium text-slate-800">
              {hotel.priceFrom ? `$${hotel.priceFrom.toLocaleString()}` : 'Ver precios'}
              <span className="text-xs text-slate-400 font-normal"> / noche</span>
            </p>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-amber-400 text-xs">{'★'.repeat(hotel.stars)}</span>
            <span className="text-xs text-slate-400">{hotel.zone}</span>
          </div>
          <p className="text-xs text-slate-400">{hotel.availableRooms} habitaciones disponibles</p>
        </div>
        <div className="flex justify-end mt-3">
          <button 
            onClick={() => navigate(`/hotels/${hotel.id}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-5 py-2 rounded-lg transition-colors">
            Ver habitaciones
          </button>
        </div>
      </div>

    </div>
  )
}

export default HotelCard