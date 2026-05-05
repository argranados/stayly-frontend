import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      setError('Por favor llena todos los campos')
      return
    }
    setLoading(true)
    setError(null)
    try {
      await login(form.email, form.password)
      navigate('/')
    } catch (err) {
      console.error(err)
      setError('Correo o contraseña incorrectos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        <div className="text-center mb-8">
          <h1 className="text-2xl font-medium text-slate-800 mb-1">stayly</h1>
          <p className="text-sm text-slate-400">Inicia sesión en tu cuenta</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-4">

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-500 text-xs px-3 py-2 rounded-lg">
              {error}
            </div>
          )}

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
              placeholder="••••••••"
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 placeholder-slate-300 outline-none focus:border-blue-400 transition-colors"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium py-3 rounded-xl transition-colors mt-2"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>

          <p className="text-xs text-slate-400 text-center">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              Regístrate
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default LoginPage