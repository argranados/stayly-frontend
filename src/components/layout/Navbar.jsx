import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Navbar({ transparent = false }) {
  const navigate = useNavigate()
  const { user, session, logout, isAdmin } = useAuth()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <nav className={`flex items-center justify-between px-8 py-4 ${transparent ? 'absolute top-0 left-0 right-0 z-10' : 'bg-white border-b border-slate-200'}`}>
      <span
        onClick={() => navigate('/')}
        className={`text-xl font-medium tracking-tight cursor-pointer ${transparent ? 'text-white' : 'text-slate-800'}`}
      >
        stayly
      </span>
      <div className="flex items-center gap-6">
        <span
          onClick={() => navigate('/hotels')}
          className={`text-sm cursor-pointer ${transparent ? 'text-white/80 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
        >
          Explorar
        </span>
        {user && (
          <span
            onClick={() => navigate('/my-bookings')}
            className={`text-sm cursor-pointer ${transparent ? 'text-white/80 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Mis reservas
          </span>
        )}
        {user && isAdmin && (
          <span
            onClick={() => navigate('/admin')}
            className={`text-sm cursor-pointer ${transparent ? 'text-white/80 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Admin
          </span>
        )}
        {user ? (
          <div className="flex items-center gap-3">
            <span className={`text-sm ${transparent ? 'text-white/80' : 'text-slate-600'}`}>
              {session?.name ?? session?.email ?? user.username}
            </span>
            <button
              onClick={handleLogout}
              className={`text-sm font-medium px-4 py-2 rounded-full transition-colors ${transparent ? 'bg-white text-slate-800 hover:bg-slate-100' : 'border border-slate-300 text-slate-700 hover:bg-slate-50'}`}
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className={`text-sm font-medium px-4 py-2 rounded-full transition-colors ${transparent ? 'bg-white text-slate-800 hover:bg-slate-100' : 'border border-slate-300 text-slate-700 hover:bg-slate-50'}`}
          >
            Iniciar sesión
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar