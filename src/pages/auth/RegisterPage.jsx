import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function RegisterPage() {
  const navigate = useNavigate()
  const { register, confirmEmail } = useAuth()
  const [step, setStep] = useState('register')
  const [form, setForm] = useState({ name: '', email: '', password: '', code: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      setError('Por favor llena todos los campos')
      return
    }
    setLoading(true)
    setError(null)
    try {
      await register(form.email, form.password, form.name)
      setStep('confirm')
    } catch (err) {
      console.error(err)
      setError(err.message || 'Error al crear la cuenta')
    } finally {
      setLoading(false)
    }
  }

  const handleConfirm = async () => {
    if (!form.code) {
      setError('Por favor ingresa el código de verificación')
      return
    }
    setLoading(true)
    setError(null)
    try {
      await confirmEmail(form.email, form.code)
      navigate('/login')
    } catch (err) {
      console.error(err)
      setError('Código incorrecto, intenta de nuevo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        <div className="text-center mb-8">
          <h1 className="text-2xl font-medium text-slate-800 mb-1">stayly</h1>
          <p className="text-sm text-slate-400">
            {step === 'register' ? 'Crea tu cuenta' : 'Verifica tu correo'}
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-4">

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-500 text-xs px-3 py-2 rounded-lg">
              {error}
            </div>
          )}

          {step === 'register' ? (
            <>
              <div>
                <p className="text-xs text-slate-400 mb-1.5">Nombre completo</p>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => handleChange('name', e.target.value)}
                  placeholder="Alfonso García"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 placeholder-slate-300 outline-none focus:border-blue-400 transition-colors"
                />
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1.5">Correo electrónico</p>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => handleChange('email', e.target.value)}
                  placeholder="alfonso@email.com"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 placeholder-slate-300 outline-none focus:border-blue-400 transition-colors"
                />
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1.5">Contraseña</p>
                <input
                  type="password"
                  value={form.password}
                  onChange={e => handleChange('password', e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 placeholder-slate-300 outline-none focus:border-blue-400 transition-colors"
                />
              </div>
              <button
                onClick={handleRegister}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium py-3 rounded-xl transition-colors mt-2"
              >
                {loading ? 'Creando cuenta...' : 'Crear cuenta'}
              </button>
              <p className="text-xs text-slate-400 text-center">
                ¿Ya tienes cuenta?{' '}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Inicia sesión
                </Link>
              </p>
            </>
          ) : (
            <>
              <div className="text-center py-2">
                <p className="text-sm text-slate-600">Enviamos un código de verificación a</p>
                <p className="text-sm font-medium text-slate-800 mt-1">{form.email}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1.5">Código de verificación</p>
                <input
                  type="text"
                  value={form.code}
                  onChange={e => handleChange('code', e.target.value)}
                  placeholder="123456"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 placeholder-slate-300 outline-none focus:border-blue-400 transition-colors text-center tracking-widest"
                />
              </div>
              <button
                onClick={handleConfirm}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium py-3 rounded-xl transition-colors"
              >
                {loading ? 'Verificando...' : 'Verificar cuenta'}
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  )
}

export default RegisterPage