import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'

function BookingConfirmationPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-lg mx-auto px-8 py-16 text-center">

        {/* Ícono de éxito */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-medium text-slate-800 mb-2">¡Reserva confirmada!</h1>
        <p className="text-sm text-slate-400 mb-8">
          Te enviamos los detalles a tu correo electrónico.
        </p>

        {/* Detalle de la reserva */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 text-left mb-6">
          <p className="text-sm font-medium text-slate-800 mb-4">Detalle de tu reserva</p>
          <div className="flex flex-col gap-3">
            {[
              { label: 'Número de reserva', value: '#STY-2026-00142' },
              { label: 'Hotel', value: 'Grand Fiesta Americana' },
              { label: 'Habitación', value: 'Suite Junior' },
              { label: 'Check-in', value: '10 jun 2026' },
              { label: 'Check-out', value: '14 jun 2026' },
              { label: 'Huéspedes', value: '2 huéspedes' },
              { label: 'Total', value: '$11,200' },
            ].map(item => (
              <div key={item.label} className="flex justify-between text-sm">
                <span className="text-slate-400">{item.label}</span>
                <span className="font-medium text-slate-700">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate('/my-bookings')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-3 rounded-xl transition-colors"
          >
            Ver mis reservas
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium py-3 rounded-xl transition-colors"
          >
            Volver al inicio
          </button>
        </div>

      </div>
    </div>
  )
}

export default BookingConfirmationPage