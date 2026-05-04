const axios = require('axios')

const API_URL = 'http://host.docker.internal:8080/api/v1'

const HOTELES = [
  // Ciudad de México
  { name: 'Grand Fiesta Americana Reforma', address: 'Av. Paseo de la Reforma 80', city: 'Ciudad de México', country: 'México', stars: 5 },
  { name: 'Camino Real Polanco', address: 'Av. Mariano Escobedo 700', city: 'Ciudad de México', country: 'México', stars: 5 },
  { name: 'Hilton Mexico City Reforma', address: 'Av. Paseo de la Reforma 195', city: 'Ciudad de México', country: 'México', stars: 4 },
  { name: 'NH Collection Mexico City', address: 'Av. Álvaro Obregón 90, Roma Norte', city: 'Ciudad de México', country: 'México', stars: 4 },
  { name: 'Hotel Geneve', address: 'Londres 130, Zona Rosa', city: 'Ciudad de México', country: 'México', stars: 3 },
  { name: 'City Express Plus Santa Fe', address: 'Av. Santa Fe 170', city: 'Ciudad de México', country: 'México', stars: 3 },
  { name: 'InterContinental Presidente', address: 'Campos Elíseos 218, Polanco', city: 'Ciudad de México', country: 'México', stars: 5 },
  { name: 'W Mexico City', address: 'Campos Elíseos 252, Polanco', city: 'Ciudad de México', country: 'México', stars: 5 },
  { name: 'Hotel De Cortés', address: 'Av. Hidalgo 85, Centro', city: 'Ciudad de México', country: 'México', stars: 3 },
  { name: 'Marquis Reforma', address: 'Av. Paseo de la Reforma 465', city: 'Ciudad de México', country: 'México', stars: 5 },

  // Cancún
  { name: 'Hyatt Ziva Cancún', address: 'Blvd. Kukulcan Km 5', city: 'Cancún', country: 'México', stars: 5 },
  { name: 'Live Aqua Beach Resort', address: 'Blvd. Kukulcan Km 12.5', city: 'Cancún', country: 'México', stars: 5 },
  { name: 'Krystal Grand Cancún', address: 'Blvd. Kukulcan Km 9', city: 'Cancún', country: 'México', stars: 4 },
  { name: 'Oasis Palm', address: 'Blvd. Kukulcan Km 4.5', city: 'Cancún', country: 'México', stars: 4 },
  { name: 'Hotel Ambiance Suites', address: 'Av. Tulum 227, Centro', city: 'Cancún', country: 'México', stars: 3 },
  { name: 'Marriott Cancún Resort', address: 'Blvd. Kukulcan Km 14.5', city: 'Cancún', country: 'México', stars: 5 },
  { name: 'Westin Lagunamar Ocean Resort', address: 'Blvd. Kukulcan Km 12', city: 'Cancún', country: 'México', stars: 5 },
  { name: 'Holiday Inn Cancún Arenas', address: 'Blvd. Kukulcan Km 8.5', city: 'Cancún', country: 'México', stars: 3 },
  { name: 'Hard Rock Hotel Cancún', address: 'Blvd. Kukulcan Km 14', city: 'Cancún', country: 'México', stars: 5 },
  { name: 'Iberostar Selection Cancún', address: 'Blvd. Kukulcan Km 17', city: 'Cancún', country: 'México', stars: 5 },

  // Guadalajara
  { name: 'Hilton Guadalajara Midtown', address: 'Av. de las Rosas 2933', city: 'Guadalajara', country: 'México', stars: 4 },
  { name: 'Hotel Morales', address: 'Av. Corona 243, Centro', city: 'Guadalajara', country: 'México', stars: 4 },
  { name: 'Crowne Plaza Guadalajara', address: 'Av. López Mateos Sur 2500', city: 'Guadalajara', country: 'México', stars: 4 },
  { name: 'One Guadalajara Centro', address: 'Av. 16 de Septiembre 730', city: 'Guadalajara', country: 'México', stars: 3 },
  { name: 'Hyatt Place Guadalajara', address: 'Av. Patria 1150', city: 'Guadalajara', country: 'México', stars: 4 },
  { name: 'Hotel Demetria', address: 'Lerdo de Tejada 2469', city: 'Guadalajara', country: 'México', stars: 5 },
  { name: 'Hampton Inn Guadalajara', address: 'Av. López Mateos Norte 1720', city: 'Guadalajara', country: 'México', stars: 3 },
  { name: 'Fiesta Inn Guadalajara', address: 'Av. Mariano Otero 1550', city: 'Guadalajara', country: 'México', stars: 3 },
  { name: 'Hotel Presidente Intercontinental', address: 'Av. López Mateos Sur 3515', city: 'Guadalajara', country: 'México', stars: 5 },
  { name: 'Casa Fayette', address: 'Libertad 1870, Americana', city: 'Guadalajara', country: 'México', stars: 5 },

  // Monterrey
  { name: 'Safi Royal Luxury Valle', address: 'Av. Lázaro Cárdenas 2525', city: 'Monterrey', country: 'México', stars: 5 },
  { name: 'Hyatt Regency Monterrey', address: 'Av. Constitución 300 Ote', city: 'Monterrey', country: 'México', stars: 5 },
  { name: 'Krystal Monterrey', address: 'Av. Constitución 300', city: 'Monterrey', country: 'México', stars: 4 },
  { name: 'Holiday Inn Monterrey Parque Fundidora', address: 'Av. Fundidora 501', city: 'Monterrey', country: 'México', stars: 4 },
  { name: 'City Express Monterrey Aeropuerto', address: 'Av. Universidad 310', city: 'Monterrey', country: 'México', stars: 3 },
  { name: 'Fiesta Inn Monterrey', address: 'Av. Lázaro Cárdenas 3399', city: 'Monterrey', country: 'México', stars: 3 },
  { name: 'NH Monterrey', address: 'Av. Insurgentes 230', city: 'Monterrey', country: 'México', stars: 4 },
  { name: 'Live Aqua Urban Resort Monterrey', address: 'Av. Lázaro Cárdenas 2500', city: 'Monterrey', country: 'México', stars: 5 },
  { name: 'Galería Plaza Monterrey', address: 'Av. Constitución 360', city: 'Monterrey', country: 'México', stars: 4 },
  { name: 'Hotel Ancira', address: 'Hidalgo y Escobedo, Centro', city: 'Monterrey', country: 'México', stars: 5 },

  // Los Cabos
  { name: 'One&Only Palmilla', address: 'Carretera Transpeninsular Km 7.5', city: 'Los Cabos', country: 'México', stars: 5 },
  { name: 'Hilton Los Cabos', address: 'Carretera Transpeninsular Km 19.5', city: 'Los Cabos', country: 'México', stars: 5 },
  { name: 'Hyatt Ziva Los Cabos', address: 'Blvd. Paseo de la Marina', city: 'Los Cabos', country: 'México', stars: 5 },
  { name: 'Marriott Los Cabos', address: 'Carretera Transpeninsular Km 22', city: 'Los Cabos', country: 'México', stars: 5 },
  { name: 'Hotel Tesoro Los Cabos', address: 'Blvd. Marina Lote 9', city: 'Los Cabos', country: 'México', stars: 4 },
  { name: 'Casa Dorada Los Cabos', address: 'Medano Beach, Cabo San Lucas', city: 'Los Cabos', country: 'México', stars: 5 },
  { name: 'Sandos Finisterra', address: 'Blvd. Marina s/n', city: 'Los Cabos', country: 'México', stars: 4 },
  { name: 'Holiday Inn Los Cabos', address: 'Av. Cárdenas s/n, San José', city: 'Los Cabos', country: 'México', stars: 3 },
  { name: 'Cabo Villas Beach Resort', address: 'Medano Beach, Lote 3', city: 'Los Cabos', country: 'México', stars: 4 },
  { name: 'Breathless Cabo San Lucas', address: 'Carretera Transpeninsular Km 4', city: 'Los Cabos', country: 'México', stars: 5 },
]

const ROOM_TEMPLATES = {
  5: [
    { roomNumber: '101', type: 'SUITE', pricePerNight: 4500.00, capacity: 2, status: 'AVAILABLE', amenities: null },
    { roomNumber: '102', type: 'DOUBLE', pricePerNight: 3200.00, capacity: 2, status: 'AVAILABLE', amenities: null },
    { roomNumber: '103', type: 'SINGLE', pricePerNight: 2800.00, capacity: 1, status: 'AVAILABLE', amenities: null },
    { roomNumber: '104', type: 'SUITE', pricePerNight: 6000.00, capacity: 4, status: 'AVAILABLE', amenities: null },
  ],
  4: [
    { roomNumber: '101', type: 'DOUBLE', pricePerNight: 2200.00, capacity: 2, status: 'AVAILABLE', amenities: null },
    { roomNumber: '102', type: 'SINGLE', pricePerNight: 1800.00, capacity: 1, status: 'AVAILABLE', amenities: null },
    { roomNumber: '103', type: 'SUITE', pricePerNight: 3200.00, capacity: 3, status: 'AVAILABLE', amenities: null },
    { roomNumber: '104', type: 'DOUBLE', pricePerNight: 2400.00, capacity: 3, status: 'AVAILABLE', amenities: null },
  ],
  3: [
    { roomNumber: '101', type: 'SINGLE', pricePerNight: 900.00, capacity: 1, status: 'AVAILABLE', amenities: null },
    { roomNumber: '102', type: 'DOUBLE', pricePerNight: 1200.00, capacity: 2, status: 'AVAILABLE', amenities: null },
    { roomNumber: '103', type: 'DOUBLE', pricePerNight: 1400.00, capacity: 3, status: 'AVAILABLE', amenities: null },
  ],
}

async function seed() {
  console.log('🌱 Iniciando seed de datos...\n')
  let hotelsCreated = 0
  let roomsCreated = 0

  for (const hotel of HOTELES) {
    try {
      const response = await axios.post(`${API_URL}/hotels`, hotel)
      const createdHotel = response.data
      hotelsCreated++
      console.log(`✅ Hotel creado: ${createdHotel.name}`)

      const rooms = ROOM_TEMPLATES[hotel.stars] || ROOM_TEMPLATES[3]
      for (const room of rooms) {
        try {
          await axios.post(`${API_URL}/hotels/${createdHotel.id}/rooms`, room)
          roomsCreated++
        } catch (err) {
          console.error(`  ❌ Error creando habitación: ${err.message}`)
        }
      }
      console.log(`  🛏  ${rooms.length} habitaciones creadas\n`)

    } catch (err) {
      console.error(`❌ Error creando hotel ${hotel.name}: ${err.message}`)
    }
  }

  console.log(`\n✨ Seed completado: ${hotelsCreated} hoteles, ${roomsCreated} habitaciones`)
}

seed()