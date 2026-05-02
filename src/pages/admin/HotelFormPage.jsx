import { useParams, useNavigate } from 'react-router-dom'
import AdminSidebar from '../../components/layout/AdminSidebar'

const HOTELES = {
  1: { name: 'Grand Fiesta Americana', city: 'Ciudad de México', address: 'Av. Paseo de la Reforma 80, Polanco', stars: 5, description: 'Hotel de lujo ubicado en el corazón de Polanco.' },
  2: { name: 'Camino Real Polanco', city: 'Ciudad de México', address: 'Av. Mariano Escobedo 700, Polanco', stars: 5, description: 'Icónico hotel de diseño arquitectónico único en Polanco.' },
  3: { name: 'Hilton Mexico City', city: 'Ciudad de México', address: 'Av. Paseo de la Reforma 195, Centro', stars: 4, description: 'Hotel moderno en el corazón de la ciudad.' },
  4: { name: 'Hyatt Ziva', city: 'Cancún', address: 'Blvd. Kukulcan Km 5, Cancún', stars: 5, description: 'Resort todo incluido frente al mar Caribe.' },
}

function HotelFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id
  const hotel = isEdit ? HOTELES[id] : null

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
          <h1 className="text-xl font-medium text-slate-800">
            {isEdit ? 'Editar hotel' : 'Agregar hotel'}
          </h1>
        </div>

        <div className="max-w-2xl">
          <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col gap-5">

            {/* Nombre */}
            <div>
              <p className="text-xs text-slate-400 mb-1.5">Nombre del hotel</p>
              <input
                type="text"
                defaultValue={hotel?.name}
                placeholder="Grand Fiesta Americana"
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 placeholder-slate-300 outline-none focus:border-blue-400 transition-colors"
              />
            </div>

            {/* Ciudad y estrellas */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-400 mb-1.5">Ciudad</p>
                <input
                  type="text"
                  defaultValue={hotel?.city}
                  placeholder="Ciudad de México"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 placeholder-slate-300 outline-none focus:border-blue-400 transition-colors"
                />
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1.5">Categoría</p>
                <select
                  defaultValue={hotel?.stars ?? 3}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400 transition-colors bg-white"
                >
                  {[1, 2, 3, 4, 5].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'estrella' : 'estrellas'}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dirección */}
            <div>
              <p className="text-xs text-slate-400 mb-1.5">Dirección</p>
              <input
                type="text"
                defaultValue={hotel?.address}
                placeholder="Av. Paseo de la Reforma 80, Polanco"
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 placeholder-slate-300 outline-none focus:border-blue-400 transition-colors"
              />
            </div>

            {/* Descripción */}
            <div>
              <p className="text-xs text-slate-400 mb-1.5">Descripción</p>
              <textarea
                defaultValue={hotel?.description}
                placeholder="Describe el hotel..."
                rows={4}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 placeholder-slate-300 outline-none focus:border-blue-400 transition-colors resize-none"
              />
            </div>

            {/* Botones */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => navigate('/admin')}
                className="flex-1 border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium py-2.5 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => navigate('/admin')}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
              >
                {isEdit ? 'Guardar cambios' : 'Agregar hotel'}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelFormPage