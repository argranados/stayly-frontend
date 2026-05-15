# stayly-frontend

Frontend de **Stayly**, plataforma de búsqueda y reserva de hoteles construida con React. Este repositorio contiene la interfaz de usuario completa — área pública, flujo de reservas, panel de administración y autenticación con AWS Cognito.

---

## Stack

| Tecnología | Versión | Rol |
|---|---|---|
| React | 18.x | Framework UI |
| Vite | 8.x | Build tool y dev server |
| TailwindCSS | 4.x | Estilos utilitarios |
| React Router | 7.x | Navegación SPA |
| Axios | 1.x | HTTP client |
| AWS Amplify | 6.x | Integración con Cognito |
| Node.js | 20 (Alpine) | Runtime en contenedor Docker |

---

## Arquitectura del Proyecto

El frontend es una Single-Page Application (SPA) que se comunica con dos microservicios del backend:

- **hotel-service** (`localhost:8080`) — hoteles y habitaciones
- **booking-service** (`localhost:8082`) — reservas con Outbox Pattern

La autenticación se maneja externamente con **AWS Cognito**, eliminando la necesidad de construir un auth-service propio. Los roles se controlan mediante Cognito Groups (`users` y `admins`).

---

## Estructura de Carpetas

```
src/
├── config/         → configuración de Amplify/Cognito
├── context/        → AuthContext con estado global de autenticación
├── components/     → componentes reutilizables (layout, hotel, room, ui)
├── pages/          → vistas organizadas por dominio (public, booking, user, admin, auth)
├── services/       → capa de comunicación HTTP con los microservicios
└── hooks/          → lógica reutilizable
```

---

## Funcionalidades

### Área pública
- Landing page con buscador (destino, fechas, huéspedes)
- Listado de hoteles con filtros por precio, estrellas y tipo de habitación
- Ordenamiento de resultados
- Detalle de hotel con habitaciones disponibles

### Flujo de reserva (requiere autenticación)
- Selección de habitación y fechas
- Formulario de datos del huésped
- Cálculo automático del total por noches
- Confirmación con número de reserva

### Área de usuario (requiere autenticación)
- Listado de mis reservas con estados (confirmada, completada, cancelada)
- Detalle de cada reserva con opción de cancelación

### Panel admin (requiere grupo `admins` en Cognito)
- Dashboard con métricas generales
- CRUD completo de hoteles
- Gestión de habitaciones por hotel
- Listado de reservas del sistema

### Autenticación
- Registro con verificación por email
- Login con JWT via AWS Cognito
- Rutas protegidas por rol
- Sesión persistente con refresh token

---

## Ambiente de Desarrollo

El ambiente de desarrollo corre completamente en Docker — no es necesario instalar Node.js en la máquina host.

### Pre-requisitos
- Docker Desktop
- Git Bash o terminal integrada de VSC

### Levantar el ambiente

```bash
# 1. Levantar el contenedor
docker-compose up -d

# 2. Arrancar Vite
docker-compose exec frontend sh -c "npm run dev"
```

Abrir `http://localhost:5173` en el browser.

### Detener el ambiente

```bash
docker-compose down
```

### Instalar nuevas dependencias

```bash
docker-compose exec frontend sh -c "npm install <paquete>"
```

> Siempre usar `exec` para instalar paquetes — `run` crea un contenedor sin acceso a red.

---

## Variables de Configuración

La configuración de Cognito vive en `src/config/auth.js`:

```javascript
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

Las URLs de los servicios se configuran en `src/services/api.js` y `src/services/bookingService.js`.

---

## Seeding de Datos

Para poblar la base de datos con hoteles y habitaciones de prueba:

```bash
docker-compose exec frontend sh -c "node seed.cjs"
```

El script inserta 50 hoteles en 5 ciudades mexicanas (CDMX, Cancún, Guadalajara, Monterrey, Los Cabos) con 3-4 habitaciones cada uno via la API del `hotel-service`.

---

## Decisiones de Diseño

### React + Vite sobre Angular
Angular fue evaluado pero descartado por su curva de aprendizaje más pronunciada y la necesidad de un servidor para algunos modos de despliegue. React con Vite compila a archivos estáticos puros, lo que permite despliegue directo en S3 sin infraestructura de servidor.

### TailwindCSS sobre librerías de componentes
Se eligió Tailwind directamente para evitar el look genérico que produce Material UI o Ant Design. El objetivo era un diseño minimalista tipo Airbnb con identidad propia.

### Docker para el ambiente local
En lugar de instalar Node.js en Windows, el ambiente completo corre en un contenedor Alpine. Esto garantiza reproducibilidad y evita conflictos de versiones entre proyectos.

### AWS Cognito sobre auth-service propio
Cognito elimina la necesidad de construir, mantener y asegurar un servicio de autenticación propio. Maneja registro, verificación por email, JWT, refresh tokens y grupos de usuarios. Es gratuito hasta 50,000 usuarios activos mensuales y se integra nativamente con la infraestructura AWS del proyecto.

### Separación de servicios en la capa HTTP
`hotel-service` y `booking-service` tienen URLs base distintas (puertos 8080 y 8082). En lugar de forzar una configuración única en axios, `bookingService.js` usa `fetch` nativo con su propia URL base. Esto refleja la separación real de microservicios y facilita el cambio a URLs de producción de forma independiente.

### Datos mock en transición a datos reales
El frontend se construyó inicialmente con datos hardcodeados para validar el diseño y la navegación sin depender del backend. Una vez validado el diseño, se reemplazaron los datos mock por llamadas reales a los microservicios. Esta estrategia permite avanzar en paralelo en frontend y backend.

---

## Problemas Encontrados y Soluciones

### Hot reload no funciona en Docker con Windows
Vite por defecto usa eventos del sistema de archivos para detectar cambios. En volúmenes montados de Docker en Windows, estos eventos no se propagan al contenedor. Solución: activar `usePolling: true` en `vite.config.js`.

### Vite no accesible desde el browser en Windows
El servidor de Vite por defecto escucha solo en `localhost` dentro del contenedor. Para que Docker exponga el puerto hacia Windows hay que configurar `host: '0.0.0.0'`. Sin este cambio, el browser recibe "conexión rechazada" aunque el puerto esté mapeado.

### `npm install` falla con ENETUNREACH en `docker-compose run`
Los contenedores creados con `docker-compose run` no heredan la configuración de red del servicio en esta configuración. La solución es usar `docker-compose exec` sobre un contenedor ya levantado con `docker-compose up -d`.

### Cognito App Client con Client Secret
El primer App Client fue creado como "Traditional Web Application", lo que generó un Client Secret. Las SPAs no pueden manejar secretos de forma segura porque el código corre en el browser. Solución: crear un nuevo App Client de tipo "Single-page application" que configura automáticamente el cliente sin secret.

### `USER_PASSWORD_AUTH` no habilitado
El flujo de autenticación por defecto en Cognito es SRP, que es más seguro pero requiere configuración adicional en Amplify. Para simplificar la integración, se habilitó `ALLOW_USER_PASSWORD_AUTH` en el App Client desde la consola de AWS.

### `useAuth()` llamado dentro de una función
En la versión inicial de `RegisterPage`, el hook `useAuth()` se llamaba dentro de `handleConfirm()`, violando las reglas de hooks de React. Los hooks solo pueden llamarse en el cuerpo del componente. Solución: desestructurar `confirmEmail` junto con los demás valores al inicio del componente.

### `seed.cjs` no puede conectarse al backend desde Docker
Desde dentro del contenedor, `localhost` apunta al propio contenedor, no a la máquina host donde corre el backend. Solución: usar `host.docker.internal`, el hostname especial de Docker Desktop en Windows que referencia la máquina host.

### El build de Vite sobreescribió el `package.json`
Al crear el proyecto Vite dentro de un directorio no vacío usando una carpeta temporal y moviendo los archivos, el `package.json` generado por Vite sobreescribió el existente que solo tenía las dependencias instaladas manualmente. Esto dejó el proyecto sin los scripts de Vite. Solución: recrear el proyecto con el directorio vacío para que Vite inicialice correctamente todos los archivos.

---

## Despliegue (Pendiente)

El despliegue en producción usará:

- **S3** — almacena el build estático generado por `npm run build`
- **CloudFront** — CDN con HTTPS gratuito via AWS Certificate Manager
- **DuckDNS** — dominio gratuito sin costo de registro

```bash
npm run build   # genera dist/
aws s3 sync dist/ s3://stayly-frontend-bucket
aws cloudfront create-invalidation --distribution-id <ID> --paths "/*"
```

El pipeline de CI/CD en GitHub Actions automatizará este proceso en cada push a `main`.

---

## Microservicios Relacionados

| Servicio | Puerto | Repositorio |
|---|---|---|
| hotel-service | 8080 | github.com/stayly-app/hotel-service |
| booking-service | 8082 | github.com/stayly-app/booking-service |

---

*Stayly — stayly-frontend — Mayo 2026*
