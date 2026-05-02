import { useNavigate } from 'react-router-dom'

function SearchBar() {
  const navigate = useNavigate()

  const handleSearch = () => {
    navigate('/hotels')
  }

  return (
    <div className="bg-white rounded-2xl p-5 w-full max-w-3xl flex items-end gap-3 shadow-2xl">

      {/* Destino */}
      <div className="flex-2 flex-1">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-2">Destino</p>
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <svg className="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <input
            type="text"
            placeholder="¿A dónde vas?"
            className="w-full text-sm text-slate-700 placeholder-slate-300 outline-none bg-transparent"
          />
        </div>
      </div>

      <div className="w-px h-9 bg-slate-200 mb-2 shrink-0" />

      {/* Check-in */}
      <div className="flex-1">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-2">Llegada</p>
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <svg className="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <input
            type="text"
            placeholder="dd/mm/aaaa"
            onFocus={e => e.target.type = 'date'}
            onBlur={e => { if (!e.target.value) e.target.type = 'text' }}
            className="w-full text-sm text-slate-700 placeholder-slate-300 outline-none bg-transparent"
          />
        </div>
      </div>

      <div className="w-px h-9 bg-slate-200 mb-2 shrink-0" />

      {/* Check-out */}
      <div className="flex-1">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-2">Salida</p>
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <svg className="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <input
            type="text"
            placeholder="dd/mm/aaaa"
            onFocus={e => e.target.type = 'date'}
            onBlur={e => { if (!e.target.value) e.target.type = 'text' }}
            className="w-full text-sm text-slate-700 placeholder-slate-300 outline-none bg-transparent"
          />
        </div>
      </div>

      <div className="w-px h-9 bg-slate-200 mb-2 shrink-0" />

      {/* Huéspedes */}
      <div className="flex-1 min-w-[120px]">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-2">Huéspedes</p>
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <svg className="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <select className="w-full text-sm text-slate-700 outline-none bg-transparent">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <option key={n} value={n}>{n} {n === 1 ? 'huésped' : 'huéspedes'}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Botón */}
      <button 
        onClick={handleSearch}
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-3 rounded-xl transition-colors shrink-0">
        Buscar
      </button>

    </div>
  )
}

export default SearchBar