import { useNavigate, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/admin' },
  { label: 'Hoteles', path: '/admin/hotels' },
//   { label: 'Habitaciones', path: '/admin/hotels' },
  { label: 'Reservas', path: '/admin/bookings' },
]

function AdminSidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="w-48 shrink-0 bg-slate-900 min-h-screen flex flex-col">

      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/10">
        <p className="text-lg font-medium text-white mb-1">stayly</p>
        <p className="text-xs text-white/40">Panel Admin</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4">
        {NAV_ITEMS.map(item => {
          const active = location.pathname === item.path
          return (
            <div
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`px-3 py-2.5 rounded-lg mb-1 cursor-pointer transition-colors ${
                active ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white/80 hover:bg-white/5'
              }`}
            >
              <p className="text-sm">{item.label}</p>
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div
        onClick={() => navigate('/')}
        className="px-5 py-4 border-t border-white/10 cursor-pointer"
      >
        <p className="text-xs text-white/30 hover:text-white/50 transition-colors">← Salir al sitio</p>
      </div>

    </div>
  )
}

export default AdminSidebar