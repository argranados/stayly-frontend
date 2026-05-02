import { useParams, useNavigate } from 'react-router-dom'
import AdminSidebar from '../../components/layout/AdminSidebar'

const HOTELES = {
  1: { name: 'Grand Fiesta Americana', city: 'Ciudad de México' },
  2: { name: 'Camino Real Polanco', city: 'Ciudad de México' },
  3: { name: 'Hilton Mexico City', city: 'Ciudad de México' },
  4: { name: 'Hyatt Ziva', city: 'Cancún' },
}

function RoomFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const hotel = HOTELES[id]

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex-1 bg-slate-50 p-8">

        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(`/admin/hotels/${id}/rooms`)}
            className="text-sm text-slate-400 hover:text-slate-600 mb-4 flex items-center gap-1"
          >
            ← Habitaciones
          </button>
          <h1 className="text-xl font-medium text-slate-800 mb-1">Agregar habitación</h1>
          {hotel && (
            <p className="text-sm text-slate-400">{hotel.name} · {hotel.city}</p>
          )}
        </div>

        <div className="max-w-2xl">
          <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col gap-5">

            {/* Tipo */}
            <div>
              <p className="text-xs text-slate-400 mb-1.5">Tipo de habitación</p>
              <select className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400 transition-colors bg-white">
                {['Individual', 'Doble', 'Suite', 'Suite Junior', 'Suite Master', 'Deluxe'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Precio y capacidad */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-400 mb-1.5">Precio por noche (MXN)</p>
                <input
                  type="number"
                  placeholder="2800"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 placeholder-slate-300 outline-none focus:border-blue-400 transition-colors"
                />
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1.5">Capacidad máxima</p>
                <select className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400 transition-colors bg-white">
                  {[1, 2, 3, 4].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'persona' : 'personas'}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Camas */}
            <div>
              <p className="text-xs text-slate-400 mb-1.5">Descripción de camas</p>
              <input
                type="text"
                placeholder="1 cama king, 2 camas queen..."
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 placeholder-slate-300 outline-none focus:border-blue-400 transition-colors"
              />
            </div>

            {/* Disponibilidad */}
            <div>
              <p className="text-xs text-slate-400 mb-1.5">Disponibilidad</p>
              <select className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400 transition-colors bg-white">
                <option value="true">Disponible</option>
                <option value="false">No disponible</option>
              </select>
            </div>

            {/* Botones */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => navigate(`/admin/hotels/${id}/rooms`)}
                className="flex-1 border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium py-2.5 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => navigate(`/admin/hotels/${id}/rooms`)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
              >
                Agregar habitación
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomFormPage