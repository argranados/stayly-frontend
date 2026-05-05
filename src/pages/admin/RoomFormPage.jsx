import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AdminSidebar from '../../components/layout/AdminSidebar'
import { roomService } from '../../services/roomService'

function RoomFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    roomNumber: '',
    type: 'SINGLE',
    pricePerNight: '',
    capacity: 1,
    status: 'AVAILABLE',
    amenities: null,
  })

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setSaving(true)
    try {
      await roomService.create(id, {
        ...form,
        pricePerNight: Number(form.pricePerNight),
        capacity: Number(form.capacity),
      })
      navigate(`/admin/hotels/${id}/rooms`)
    } catch (err) {
      console.error(err)
      alert('Error al guardar la habitación')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex-1 bg-slate-50 p-8">
        <div className="mb-8">
          <button
            onClick={() => navigate(`/admin/hotels/${id}/rooms`)}
            className="text-sm text-slate-400 hover:text-slate-600 mb-4 flex items-center gap-1"
          >
            ← Habitaciones
          </button>
          <h1 className="text-xl font-medium text-slate-800">Agregar habitación</h1>
        </div>

        <div className="max-w-2xl">
          <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col gap-5">

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-400 mb-1.5">Número de habitación</p>
                <input
                  type="text"
                  value={form.roomNumber}
                  onChange={e => handleChange('roomNumber', e.target.value)}
                  placeholder="101"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 placeholder-slate-300 outline-none focus:border-blue-400 transition-colors"
                />
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1.5">Tipo de habitación</p>
                <select
                  value={form.type}
                  onChange={e => handleChange('type', e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400 transition-colors bg-white"
                >
                  {['SINGLE', 'DOUBLE', 'SUITE'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-400 mb-1.5">Precio por noche (MXN)</p>
                <input
                  type="number"
                  value={form.pricePerNight}
                  onChange={e => handleChange('pricePerNight', e.target.value)}
                  placeholder="2800"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 placeholder-slate-300 outline-none focus:border-blue-400 transition-colors"
                />
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1.5">Capacidad máxima</p>
                <select
                  value={form.capacity}
                  onChange={e => handleChange('capacity', e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400 transition-colors bg-white"
                >
                  {[1, 2, 3, 4].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'persona' : 'personas'}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <p className="text-xs text-slate-400 mb-1.5">Disponibilidad</p>
              <select
                value={form.status}
                onChange={e => handleChange('status', e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400 transition-colors bg-white"
              >
                <option value="AVAILABLE">Disponible</option>
                <option value="UNAVAILABLE">No disponible</option>
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => navigate(`/admin/hotels/${id}/rooms`)}
                className="flex-1 border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium py-2.5 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
              >
                {saving ? 'Guardando...' : 'Agregar habitación'}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomFormPage