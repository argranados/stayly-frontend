import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from '../../components/layout/Navbar'
import { roomService } from '../../services/roomService'

function BookingPage() {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        // El roomService.getById necesita hotelId y roomId
        // Como no tenemos el hotelId aquí, usamos la URL del browser
        const hotelId = document.referrer.split('/hotels/')[1]?.split('/')[0]
        const data = await roomService.getById(hotelId, roomId)
        setRoom(data)
      } catch (err) {
        console.error(err)
        setError('No se pudo cargar la habitación')
      } finally {
        setLoading(false)
      }
    }
    fetchRoom()
  }, [roomId])

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

  const nights = 4
  const total = Number(room.pricePerNight) * nights

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

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="text-sm font-medium text-slate-800 mb-4">Datos del huésped</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Nombre', placeholder: 'Alfonso' },
                  { label: 'Apellido', placeholder: 'García' },
                  { label: 'Correo electrónico', placeholder: 'alfonso@email.com' },
                  { label: 'Teléfono', placeholder: '+52 477 000 0000' },
                ].map(field => (
                  <div key={field.label}>
                    <p className="text-xs text-slate-400 mb-1.5">{field.label}</p>
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 placeholder-slate-300 outline-none focus:border-blue-400 transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="text-sm font-medium text-slate-800 mb-4">Fechas de estancia</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Llegada' },
                  { label: 'Salida' },
                ].map(field => (
                  <div key={field.label}>
                    <p className="text-xs text-slate-400 mb-1.5">{field.label}</p>
                    <input
                      type="date"
                      className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400 transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="text-sm font-medium text-slate-800 mb-4">Solicitudes especiales</p>
              <textarea
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
                  <span>Noches</span>
                  <span className="font-medium text-slate-700">{nights}</span>
                </div>
                <div className="flex justify-between">
                  <span>${Number(room.pricePerNight).toLocaleString()} x {nights} noches</span>
                  <span className="font-medium text-slate-700">${total.toLocaleString()}</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-800">Total</span>
                  <span className="text-lg font-medium text-slate-800">${total.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/booking/confirmation')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-3 rounded-xl transition-colors"
              >
                Confirmar reserva
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