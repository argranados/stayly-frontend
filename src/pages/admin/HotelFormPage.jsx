import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AdminSidebar from '../../components/layout/AdminSidebar'
import { hotelService } from '../../services/hotelService'

function HotelFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    name: '',
    city: '',
    country: 'México',
    address: '',
    stars: 3,
  })

  useEffect(() => {
    if (isEdit) {
      const fetchHotel = async () => {
        setLoading(true)
        try {
          const data = await hotelService.getById(id)
          setForm({
            name: data.name,
            city: data.city,
            country: data.country,
            address: data.address,
            stars: data.stars,
          })
        } catch (err) {
          console.error(err)
        } finally {
          setLoading(false)
        }
      }
      fetchHotel()
    }
  }, [id])

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setSaving(true)
    try {
      if (isEdit) {
        await hotelService.update(id, form)
      } else {
        await hotelService.create(form)
      }
      navigate('/admin/hotels')
    } catch (err) {
      console.error(err)
      alert('Error al guardar el hotel')
    } finally {
      setSaving(false)
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
          <h1 className="text-xl font-medium text-slate-800">
            {isEdit ? 'Editar hotel' : 'Agregar hotel'}
          </h1>
        </div>

        <div className="max-w-2xl">
          <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col gap-5">

            <div>
              <p className="text-xs text-slate-400 mb-1.5">Nombre del hotel</p>
              <input
                type="text"
                value={form.name}
                onChange={e => handleChange('name', e.target.value)}
                placeholder="Grand Fiesta Americana"
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 placeholder-slate-300 outline-none focus:border-blue-400 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-400 mb-1.5">Ciudad</p>
                <input
                  type="text"
                  value={form.city}
                  onChange={e => handleChange('city', e.target.value)}
                  placeholder="Ciudad de México"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 placeholder-slate-300 outline-none focus:border-blue-400 transition-colors"
                />
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1.5">País</p>
                <input
                  type="text"
                  value={form.country}
                  onChange={e => handleChange('country', e.target.value)}
                  placeholder="México"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 placeholder-slate-300 outline-none focus:border-blue-400 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-400 mb-1.5">Dirección</p>
                <input
                  type="text"
                  value={form.address}
                  onChange={e => handleChange('address', e.target.value)}
                  placeholder="Av. Paseo de la Reforma 80"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 placeholder-slate-300 outline-none focus:border-blue-400 transition-colors"
                />
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1.5">Categoría</p>
                <select
                  value={form.stars}
                  onChange={e => handleChange('stars', Number(e.target.value))}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400 transition-colors bg-white"
                >
                  {[1, 2, 3, 4, 5].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'estrella' : 'estrellas'}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => navigate('/admin/hotels')}
                className="flex-1 border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium py-2.5 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
              >
                {saving ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Agregar hotel'}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelFormPage