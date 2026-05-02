function HotelFilters({ filters, onChange }) {
  return (
    <div className="w-60 shrink-0 flex flex-col gap-3">

      {/* Precio */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <p className="text-sm font-medium text-slate-800 mb-4">Precio por noche</p>
        <div className="flex justify-between mb-2">
          <span className="text-xs text-slate-400">$500</span>
          <span className="text-xs text-slate-400">$8,000</span>
        </div>
        <input
          type="range"
          min={500}
          max={8000}
          step={100}
          value={filters.maxPrice}
          onChange={e => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-blue-600"
        />
        <p className="text-xs text-slate-400 text-center mt-2">
          Hasta ${filters.maxPrice.toLocaleString()} / noche
        </p>
      </div>

      {/* Estrellas */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <p className="text-sm font-medium text-slate-800 mb-3">Categoría</p>
        {[5, 4, 3, 2].map(n => (
          <label key={n} className="flex items-center gap-2 mb-3 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.stars.includes(n)}
              onChange={() => {
                const next = filters.stars.includes(n)
                  ? filters.stars.filter(s => s !== n)
                  : [...filters.stars, n]
                onChange({ ...filters, stars: next })
              }}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-amber-400 text-xs">{'★'.repeat(n)}</span>
            <span className="text-xs text-slate-500">{n} estrellas</span>
          </label>
        ))}
      </div>

      {/* Tipo de habitación */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <p className="text-sm font-medium text-slate-800 mb-3">Tipo de habitación</p>
        {['Individual', 'Doble', 'Suite', 'Deluxe'].map(type => (
          <label key={type} className="flex items-center gap-2 mb-3 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.roomTypes.includes(type)}
              onChange={() => {
                const next = filters.roomTypes.includes(type)
                  ? filters.roomTypes.filter(t => t !== type)
                  : [...filters.roomTypes, type]
                onChange({ ...filters, roomTypes: next })
              }}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-sm text-slate-700">{type}</span>
          </label>
        ))}
      </div>

    </div>
  )
}

export default HotelFilters