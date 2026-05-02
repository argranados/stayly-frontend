function Navbar({ transparent = false }) {
  return (
    <nav className={`flex items-center justify-between px-8 py-4 ${transparent ? 'absolute top-0 left-0 right-0 z-10' : 'bg-white border-b border-slate-200'}`}>
      <span className={`text-xl font-medium tracking-tight ${transparent ? 'text-white' : 'text-slate-800'}`}>
        stayly
      </span>
      <div className="flex items-center gap-6">
        <span className={`text-sm cursor-pointer ${transparent ? 'text-white/80 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
          Explorar
        </span>
        <span className={`text-sm cursor-pointer ${transparent ? 'text-white/80 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
          Mis reservas
        </span>
        <button className={`text-sm font-medium px-4 py-2 rounded-full transition-colors ${transparent ? 'bg-white text-slate-800 hover:bg-slate-100' : 'border border-slate-300 text-slate-700 hover:bg-slate-50'}`}>
          Iniciar sesión
        </button>
      </div>
    </nav>
  )
}

export default Navbar