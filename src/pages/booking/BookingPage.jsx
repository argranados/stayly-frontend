import { useState, useEffect } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import { roomService } from '../../services/roomService'
import { bookingService } from '../../services/bookingService'

const TEMP_USER_ID = '00000000-0000-0000-0000-000000000001'

function BookingPage() {
  const { roomId } = useParams()
  const [searchParams] = useSearchParams()
  const hotelId = searchParams.get('hotelId')
  const navigate = useNavigate()

  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    checkIn: '',
    checkOut: '',
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    specialRequests: '',
  })

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const data = await roomService.getById(hotelId, roomId)
        setRoom(data)
      } catch (err) {
        console.error(err)
        setError('No se pudo cargar la habitación')
      } finally {
        setLoading(false)
      }
    }
    if (hotelId && roomId) fetchRoom()
  }, [hotelId, roomId])

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const calculateNights = () => {
    if (!form.checkIn || !form.checkOut) return 0
    const diff = new Date(form.checkOut) - new Date(form.checkIn)
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)))
  }

  const nights = calculateNights()
  const total = room ? Number(room.pricePerNight) * nights : 0

  const handleSubmit = async () => {
    if (!form.checkIn || !form.checkOut) {
      alert('Por favor selecciona las fechas de llegada y salida')
      return
    }
    if (nights <= 0) {
      alert('La fecha de salida debe ser posterior a la de llegada')
      return
    }

    setSaving(true)
    try {
      const booking = await bookingService.create({
        userId: TEMP_USER_ID,
        hotelId,
        roomId,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
      })
      navigate(`/booking/confirmation?bookingId=${booking.id}&total=${total}`)
    } catch (err) {
      console.error(err)
      alert('Error al crear la reserva. Intenta de nuevo.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex items-center justify-center py-32 text-slate-400">
          <p className="text-sm">Cargando habitación...</p>
        </div>
      </div>
    )
  }

  if (error || !room) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32 text-slate-400">
          <p className="text-lg mb-2">Habitación no encontrada</p>
          <button onClick={() => navigate(-1)} className="text-sm text-blue-600 hover:underline">
            Regresar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-slate-400 hover:text-slate-600 mb-6 flex items-center gap-1"
        >
          ← Regresar
        </button>

        <h1 className="text-xl font-medium text-slate-800 mb-6">Confirma tu reserva</h1>

        <div className="flex gap-6">

          {/* Formulario */}
          <div className="flex-1 flex flex-col gap-4">

            {/* Datos del huésped */}
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="text-sm font-medium text-slate-800 mb-4">Datos del huésped</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-400 mb-1.5">Nombre completo</p>
                  <input
                    type="text"
                    value={form.guestName}
                    onChange={e => handleChange('guestName', e.target.value)}
                    placeholder="Alfonso García"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 placeholder-slate-300 outline-none focus:border-blue-400 transition-colors"
                  />
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1.5">Correo electrónico</p>
                  <input
                    type="email"
                    value={form.guestEmail}
                    onChange={e => handleChange('guestEmail', e.target.value)}
                    placeholder="alfonso@email.com"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 placeholder-slate-300 outline-none focus:border-blue-400 transition-colors"
                  />
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1.5">Teléfono</p>
                  <input
                    type="text"
                    value={form.guestPhone}
                    onChange={e => handleChange('guestPhone', e.target.value)}
                    placeholder="+52 477 000 0000"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 placeholder-slate-300 outline-none focus:border-blue-400 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Fechas */}
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="text-sm font-medium text-slate-800 mb-4">Fechas de estancia</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-400 mb-1.5">Llegada</p>
                  <input
                    type="date"
                    value={form.checkIn}
                    onChange={e => handleChange('checkIn', e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400 transition-colors"
                  />
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1.5">Salida</p>
                  <input
                    type="date"
                    value={form.checkOut}
                    onChange={e => handleChange('checkOut', e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Solicitudes especiales */}
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="text-sm font-medium text-slate-800 mb-4">Solicitudes especiales</p>
              <textarea
                value={form.specialRequests}
                onChange={e => handleChange('specialRequests', e.target.value)}
                placeholder="Llegada tardía, cama extra, preferencias de piso..."
                rows={3}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 placeholder-slate-300 outline-none focus:border-blue-400 transition-colors resize-none"
              />
            </div>

          </div>

          {/* Resumen */}
          <div className="w-60 shrink-0">
            <div className="bg-white border border-slate-200 rounded-xl p-5 sticky top-6">
              <p className="text-sm font-medium text-slate-800 mb-4">Resumen</p>

              <div className="bg-gradient-to-br from-slate-700 to-blue-900 rounded-lg h-24 mb-4" />

              <p className="text-sm font-medium text-slate-800 mb-1">{room.type}</p>
              <p className="text-xs text-slate-400 mb-4">Habitación {room.roomNumber}</p>

              <div className="flex flex-col gap-2 mb-4 text-xs text-slate-500">
                <div className="flex justify-between">
                  <span>Precio / noche</span>
                  <span className="font-medium text-slate-700">${Number(room.pricePerNight).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Noches</span>
                  <span className="font-medium text-slate-700">{nights || '—'}</span>
                </div>
                {nights > 0 && (
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-slate-700">${total.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-100 pt-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-800">Total</span>
                  <span className="text-lg font-medium text-slate-800">
                    {nights > 0 ? `$${total.toLocaleString()}` : '—'}
                  </span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={saving}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium py-3 rounded-xl transition-colors"
              >
                {saving ? 'Procesando...' : 'Confirmar reserva'}
              </button>

              <p className="text-xs text-slate-400 text-center mt-3">Sin cargos adicionales</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default BookingPage