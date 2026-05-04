import { useState, useEffect } from 'react'
import Navbar from '../../components/layout/Navbar'
import HotelCard from '../../components/hotel/HotelCard'
import HotelFilters from '../../components/hotel/HotelFilters'
import { hotelService } from '../../services/hotelService'

const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recomendados' },
  { value: 'price_asc', label: 'Precio: menor a mayor' },
  { value: 'price_desc', label: 'Precio: mayor a menor' },
  { value: 'stars', label: 'Mejor calificados' },
]

function HotelsPage() {
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    maxPrice: 8000,
    stars: [5, 4, 3, 2],
    roomTypes: ['Individual', 'Doble', 'Suite', 'Deluxe'],
  })
  const [sort, setSort] = useState('recommended')

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const data = await hotelService.getAll()
        setHotels(data)
      } catch (err) {
        setError('No se pudieron cargar los hoteles')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchHotels()
  }, [])

  const filtered = hotels
    .filter(h => (h.priceFrom ?? 0) <= filters.maxPrice)
    .filter(h => filters.stars.includes(h.stars))
    .sort((a, b) => {
      if (sort === 'price_asc') return (a.priceFrom ?? 0) - (b.priceFrom ?? 0)
      if (sort === 'price_desc') return (b.priceFrom ?? 0) - (a.priceFrom ?? 0)
      if (sort === 'stars') return (b.stars ?? 0) - (a.stars ?? 0)
      return 0
    })

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-8 py-8 flex gap-6">
        <HotelFilters filters={filters} onChange={setFilters} />

        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-lg font-medium text-slate-800 mb-1">Hoteles disponibles</h1>
              <p className="text-xs text-slate-400">
                {loading ? 'Cargando...' : `${filtered.length} hoteles encontrados`}
              </p>
            </div>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 outline-none"
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {loading && (
            <div className="text-center py-16 text-slate-400">
              <p className="text-sm">Cargando hoteles...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-16 text-red-400">
              <p className="text-sm">{error}</p>
            </div>
          )}

          {!loading && !error && (
            <div className="flex flex-col gap-4">
              {filtered.length > 0 ? (
                filtered.map(h => <HotelCard key={h.id} hotel={h} />)
              ) : (
                <div className="text-center py-16 text-slate-400">
                  <p className="text-lg mb-2">Sin resultados</p>
                  <p className="text-sm">Intenta ajustar los filtros</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HotelsPage