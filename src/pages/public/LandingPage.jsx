import Navbar from '../../components/layout/Navbar'
import SearchBar from '../../components/hotel/SearchBar'

const DESTINOS = [
  { city: 'Ciudad de México', hotels: 142, color: 'bg-blue-50', text: 'text-blue-800' },
  { city: 'Cancún', hotels: 98, color: 'bg-green-50', text: 'text-green-800' },
  { city: 'Guadalajara', hotels: 67, color: 'bg-amber-50', text: 'text-amber-800' },
  { city: 'Monterrey', hotels: 54, color: 'bg-pink-50', text: 'text-pink-800' },
]

const HOTELES = [
  { name: 'Grand Fiesta Americana', city: 'Ciudad de México', stars: 5, price: 2800, type: 'Suite' },
  { name: 'Hyatt Ziva', city: 'Cancún', stars: 5, price: 3500, type: 'Deluxe' },
  { name: 'Camino Real', city: 'Guadalajara', stars: 4, price: 1600, type: 'Doble' },
]

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-amber-400 text-xs">★</span>
      ))}
    </div>
  )
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* HERO */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 min-h-[520px] flex flex-col">
        <Navbar transparent />

        <div className="flex flex-col items-center justify-center flex-1 px-4 pb-16 pt-8">
          <p className="text-xs text-white/50 uppercase tracking-widest mb-3">
            Encuentra tu lugar en el mundo
          </p>
          <h1 className="text-4xl font-medium text-white text-center mb-3 leading-tight">
            Hoteles para cada momento
          </h1>
          <p className="text-base text-white/60 mb-10 text-center">
            Busca, reserva y disfruta — sin complicaciones
          </p>
          <SearchBar />
        </div>
      </div>

      {/* DESTINOS POPULARES */}
      <div className="max-w-6xl mx-auto px-8 py-12">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-2">
          Destinos populares
        </p>
        <h2 className="text-xl font-medium text-slate-800 mb-6">
          ¿A dónde quieres ir?
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {DESTINOS.map(d => (
            <div
              key={d.city}
              className={`${d.color} rounded-xl p-5 cursor-pointer hover:scale-105 transition-transform`}
            >
              <p className={`text-sm font-medium ${d.text} mb-1`}>{d.city}</p>
              <p className={`text-xs ${d.text} opacity-60`}>{d.hotels} hoteles</p>
            </div>
          ))}
        </div>
      </div>

      {/* HOTELES DESTACADOS */}
      <div className="max-w-6xl mx-auto px-8 pb-16">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-2">
          Selección
        </p>
        <h2 className="text-xl font-medium text-slate-800 mb-6">
          Hoteles destacados
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {HOTELES.map(h => (
            <div
              key={h.name}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="h-40 bg-gradient-to-br from-slate-700 to-blue-900 flex items-end p-3">
                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">
                  {h.type}
                </span>
              </div>
              <div className="p-4">
                <p className="text-sm font-medium text-slate-800 mb-1">{h.name}</p>
                <p className="text-xs text-slate-400 mb-3">{h.city}</p>
                <div className="flex items-center justify-between">
                  <StarRating count={h.stars} />
                  <p className="text-sm font-medium text-slate-800">
                    ${h.price.toLocaleString()}
                    <span className="text-xs text-slate-400 font-normal"> / noche</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default LandingPage