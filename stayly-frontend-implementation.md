# Stayly Frontend — Guía de Implementación Técnica

> Documento de referencia técnica del proceso de construcción del frontend de Stayly.  
> Stack: React 18 · Vite 8 · TailwindCSS 4 · React Router 7 · Axios · AWS Amplify · Docker

---

## Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────────────┐
│                        BROWSER (localhost:5173)                     │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                     React App (Vite)                        │   │
│  │                                                             │   │
│  │  ┌─────────────┐   ┌──────────────┐   ┌────────────────┐  │   │
│  │  │ AuthContext  │   │ React Router │   │   Components   │  │   │
│  │  │ (Cognito)    │   │   (Rutas)    │   │   + Pages      │  │   │
│  │  └──────┬───────┘   └──────┬───────┘   └───────┬────────┘  │   │
│  │         │                  │                   │            │   │
│  │  ┌──────▼───────────────────▼───────────────────▼────────┐  │   │
│  │  │                    Services Layer                      │  │   │
│  │  │   hotelService.js  │  roomService.js  │  bookingService│  │   │
│  │  │   authService.js   │  api.js (axios)  │               │  │   │
│  │  └──────┬─────────────────────┬──────────────────┬───────┘  │   │
│  └─────────┼─────────────────────┼──────────────────┼──────────┘   │
└────────────┼─────────────────────┼──────────────────┼──────────────┘
             │                     │                  │
             ▼                     ▼                  ▼
    ┌─────────────────┐  ┌──────────────────┐  ┌──────────────────┐
    │  AWS Cognito     │  │  hotel-service   │  │ booking-service  │
    │  us-east-1       │  │  :8080           │  │  :8082           │
    │  (Auth + JWT)    │  │  Spring Boot     │  │  Spring Boot     │
    └─────────────────┘  └────────┬─────────┘  └────────┬─────────┘
                                  │                      │
                         ┌────────▼─────────┐   ┌───────▼──────────┐
                         │   hotel-db       │   │   booking-db     │
                         │   PostgreSQL     │   │   PostgreSQL     │
                         │   :5432          │   │   :5433          │
                         └──────────────────┘   └──────────────────┘
```

---

## Ambiente de Desarrollo

### Stack del contenedor

| Tecnología | Versión | Rol |
|---|---|---|
| Node.js | 20 (Alpine) | Runtime en Docker |
| React | 18.x | Framework UI |
| Vite | 8.x | Dev server + build tool |
| TailwindCSS | 4.x | Estilos utilitarios |
| React Router | 7.x | Navegación SPA |
| Axios | 1.x | HTTP client |
| AWS Amplify | 6.x | Integración Cognito |

### docker-compose.yml

```yaml
services:
  frontend:
    image: node:20-alpine
    container_name: stayly-frontend
    working_dir: /app
    ports:
      - "5173:5173"
    volumes:
      - .:/app
      - /app/node_modules
    tty: true
    stdin_open: true
    command: sh -c "npm install && npm run dev"
```

### vite.config.js

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',   // expone el server fuera del contenedor
    port: 5173,
    watch: {
      usePolling: true  // requerido para hot reload en volúmenes Docker en Windows
    }
  }
})
```

### Flujo de trabajo diario

```bash
# Levantar contenedor en background
docker-compose up -d

# Arrancar Vite (en otra terminal)
docker-compose exec frontend sh -c "npm run dev"

# Instalar nuevas dependencias
docker-compose exec frontend sh -c "npm install <paquete>"

# Detener
docker-compose down
```

> **Importante:** Siempre usar `exec` para instalar paquetes, no `run`. El comando `run` crea un contenedor nuevo sin acceso a red en esta configuración.

---

## Estructura del Proyecto

```
stayly-frontend/
├── public/
├── src/
│   ├── config/
│   │   └── auth.js               ← configuración AWS Amplify + Cognito
│   ├── context/
│   │   └── AuthContext.jsx       ← estado global de autenticación
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx        ← navbar adaptativo (transparente / sólido)
│   │   │   ├── AdminSidebar.jsx  ← sidebar del panel admin
│   │   │   └── ProtectedRoute.jsx← HOC para rutas protegidas
│   │   ├── hotel/
│   │   │   ├── HotelCard.jsx     ← tarjeta horizontal de hotel
│   │   │   ├── HotelFilters.jsx  ← filtros de precio, estrellas y tipo
│   │   │   └── SearchBar.jsx     ← buscador del landing
│   │   ├── room/
│   │   │   └── RoomCard.jsx      ← tarjeta de habitación con botón reservar
│   │   ├── booking/
│   │   │   └── BookingCard.jsx
│   │   └── ui/
│   │       ├── Button.jsx
│   │       └── EmptyState.jsx
│   ├── pages/
│   │   ├── public/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── HotelsPage.jsx
│   │   │   └── HotelDetailPage.jsx
│   │   ├── booking/
│   │   │   ├── BookingPage.jsx
│   │   │   └── BookingConfirmationPage.jsx
│   │   ├── user/
│   │   │   ├── MyBookingsPage.jsx
│   │   │   └── MyBookingDetailPage.jsx
│   │   ├── admin/
│   │   │   ├── AdminDashboardPage.jsx
│   │   │   ├── HotelsAdminPage.jsx
│   │   │   ├── HotelFormPage.jsx
│   │   │   ├── RoomsAdminPage.jsx
│   │   │   ├── RoomFormPage.jsx
│   │   │   └── BookingsAdminPage.jsx
│   │   └── auth/
│   │       ├── LoginPage.jsx
│   │       └── RegisterPage.jsx
│   ├── services/
│   │   ├── api.js                ← instancia base de axios (hotel-service)
│   │   ├── hotelService.js       ← CRUD hoteles → :8080
│   │   ├── roomService.js        ← CRUD habitaciones → :8080
│   │   ├── bookingService.js     ← reservas → :8082
│   │   └── authService.js        ← Cognito via Amplify
│   ├── hooks/
│   ├── App.jsx                   ← router + AuthProvider
│   ├── main.jsx                  ← entry point + Amplify init
│   └── index.css                 ← @import "tailwindcss"
├── seed.cjs                      ← script de seeding de datos
├── docker-compose.yml
├── vite.config.js
└── package.json
```

---

## Rutas de la Aplicación

```
Públicas (sin autenticación):
  /                          LandingPage
  /hotels                    HotelsPage
  /hotels/:id                HotelDetailPage
  /login                     LoginPage
  /register                  RegisterPage

Protegidas (usuario autenticado):
  /booking/:roomId           BookingPage
  /booking/confirmation      BookingConfirmationPage
  /my-bookings               MyBookingsPage
  /my-bookings/:id           MyBookingDetailPage

Admin (grupo admins en Cognito):
  /admin                     AdminDashboardPage
  /admin/hotels              HotelsAdminPage
  /admin/hotels/new          HotelFormPage
  /admin/hotels/:id/edit     HotelFormPage
  /admin/hotels/:id/rooms    RoomsAdminPage
  /admin/hotels/:id/rooms/new         RoomFormPage
  /admin/hotels/:id/rooms/:id/edit    RoomFormPage
  /admin/bookings            BookingsAdminPage
```

---

## Capa de Servicios

### api.js — Base Axios

```javascript
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: { 'Content-Type': 'application/json' }
})

export default api
```

### hotelService.js

```javascript
import api from './api'

export const hotelService = {
  getAll: async () => (await api.get('/hotels')).data,
  getById: async (id) => (await api.get(`/hotels/${id}`)).data,
  create: async (hotel) => (await api.post('/hotels', hotel)).data,
  update: async (id, hotel) => (await api.put(`/hotels/${id}`, hotel)).data,
  delete: async (id) => await api.delete(`/hotels/${id}`)
}
```

### bookingService.js

```javascript
// Apunta a booking-service en puerto 8082
const BOOKING_URL = 'http://localhost:8082/api/v1'

export const bookingService = {
  create: async (booking) => {
    const response = await fetch(`${BOOKING_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking)
    })
    if (!response.ok) throw new Error(`Error ${response.status}`)
    return response.json()
  }
  // ...
}
```

---

## Autenticación con AWS Cognito

### Configuración

```javascript
// src/config/auth.js
import { Amplify } from 'aws-amplify'

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_epeUpo1sN',
      userPoolClientId: 'v0saa3ijkqs9n0ojb8jtljspi',
      region: 'us-east-1',
    }
  }
})
```

### Flujo de autenticación

```
Usuario → RegisterPage → Cognito signUp → Email con código
                      → confirmSignUp → cuenta verificada
                      → LoginPage → signIn → JWT token
                      → AuthContext → user + session + groups
                      → Navbar muestra nombre y opciones según rol
```

### Roles con Cognito Groups

```
Grupo "users"  → acceso a /booking y /my-bookings
Grupo "admins" → acceso a /admin y todas sus sub-rutas

El claim "cognito:groups" del JWT determina el rol.
Los admins se asignan manualmente desde la consola de AWS.
```

### ProtectedRoute

```jsx
export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  return children
}

export function AdminRoute({ children }) {
  const { user, isAdmin, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  if (!isAdmin) return <Navigate to="/" replace />
  return children
}
```

---

## Seeding de Datos

El script `seed.cjs` pobla la base de datos con 50 hoteles reales (5 ciudades × 10 hoteles) y sus habitaciones via la API del backend.

```bash
# Ejecutar desde la carpeta stayly-frontend
docker-compose exec frontend sh -c "node seed.cjs"
```

El script usa `host.docker.internal` para conectarse al backend desde dentro del contenedor Docker en Windows.

---

## CORS en el Backend

Cada microservicio requiere `CorsConfig.java` para aceptar requests del frontend:

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173", "http://localhost:4173")
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(false);
    }
}
```

Servicios que requieren esta configuración: `hotel-service` y `booking-service`.

---

## Despliegue en AWS (Pendiente)

```
npm run build → dist/ (archivos estáticos)
    ↓
GitHub Actions
    ↓ aws s3 sync dist/ s3://stayly-frontend-bucket
    ↓ aws cloudfront create-invalidation
    ↓
CloudFront Distribution
    ↓
DuckDNS (dominio gratuito)
```

> El contenedor Docker es solo para desarrollo local. En producción, Vite genera archivos estáticos que S3 sirve directamente — no se necesita servidor Node en producción.

---

*Stayly Frontend — Documento de Implementación Técnica — Mayo 2026*
