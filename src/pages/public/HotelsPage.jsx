import { useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import HotelCard from '../../components/hotel/HotelCard'
import HotelFilters from '../../components/hotel/HotelFilters'

const HOTELES = [
  { id: 1, name: 'Grand Fiesta Americana', zone: 'Polanco', stars: 5, priceFrom: 2800, availableRooms: 3, roomType: 'Suite' },
  { id: 2, name: 'Camino Real Polanco', zone: 'Polanco', stars: 5, priceFrom: 2200, availableRooms: 5, roomType: 'Deluxe' },
  { id: 3, name: 'Hilton Mexico City Reforma', zone: 'Centro', stars: 4, priceFrom: 1800, availableRooms: 8, roomType: 'Doble' },
  { id: 4, name: 'NH Collection Mexico City', zone: 'Roma Norte', stars: 4, priceFrom: 1400, availableRooms: 12, roomType: 'Individual' },
  { id: 5, name: 'Hotel Geneve', zone: 'Zona Rosa', stars: 3, priceFrom: 900, availableRooms: 6, roomType: 'Doble' },
  { id: 6, name: 'City Express Plus', zone: 'Santa Fe', stars: 3, priceFrom: 750, availableRooms: 15, roomType: 'Individual' },
]

const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recomendados' },
  { value: 'price_asc', label: 'Precio: menor a mayor' },
  { value: 'price_desc', label: 'Precio: mayor a menor' },
  { value: 'stars', label: 'Mejor calificados' },
]

function HotelsPage() {
  const [filters, setFilters] = useState({
    maxPrice: 8000,
    stars: [5, 4, 3, 2],
    roomTypes: ['Individual', 'Doble', 'Suite', 'Deluxe'],
  })
  const [sort, setSort] = useState('recommended')

  const filtered = HOTELES
    .filter(h => h.priceFrom <= filters.maxPrice)
    .filter(h => filters.stars.includes(h.stars))
    .filter(h => filters.roomTypes.includes(h.roomType))
    .sort((a, b) => {
      if (sort === 'price_asc') return a.priceFrom - b.priceFrom
      if (sort === 'price_desc') return b.priceFrom - a.priceFrom
      if (sort === 'stars') return b.stars - a.stars
      return 0
    })

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-8 py-8 flex gap-6">

        {/* Filtros */}
        <HotelFilters filters={filters} onChange={setFilters} />

        {/* Resultados */}
        <div className="flex-1">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-lg font-medium text-slate-800 mb-1">
                Ciudad de México
              </h1>
              <p className="text-xs text-slate-400">
                {filtered.length} hoteles disponibles · 10 jun — 14 jun · 2 huéspedes
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

          {/* Lista */}
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

        </div>
      </div>
    </div>
  )
}

export default HotelsPage