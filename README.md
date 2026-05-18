# 🎵 Prisma Multiple Schemas - Guía Completa

Este proyecto implementa Prisma ORM con múltiples schemas separados (NO microservicios) para una aplicación de dating con múltiples módulos.

## 📋 Tabla de Contenidos
1. [Estructura del Proyecto](#estructura-del-proyecto)
2. [Instalación](#instalación)
3. [Configuración](#configuración)
4. [Comandos npm](#comandos-npm)
5. [Migraciones Prisma](#migraciones-prisma)
6. [Ejecutar el Servidor](#ejecutar-el-servidor)
7. [Endpoints REST](#endpoints-rest)
8. [Ejemplos Postman](#ejemplos-postman)
9. [Troubleshooting](#troubleshooting)

## 🏗️ Estructura del Proyecto

```
project/
├── prisma/
│   ├── users/
│   │   └── schema.prisma          # Users + Photos schema
│   ├── subscriptions/
│   │   └── schema.prisma          # Subscriptions schema
│   ├── music/
│   │   └── schema.prisma          # Music tracks schema
│   ├── likes/
│   │   └── schema.prisma          # Likes schema
│   ├── matches/
│   │   └── schema.prisma          # Matches schema
│   └── chat/
│       └── schema.prisma          # Chat messages schema
│
├── generated/                      # Prisma clients (auto-generados)
│   ├── users/
│   ├── subscriptions/
│   ├── music/
│   ├── likes/
│   ├── matches/
│   └── chat/
│
├── src/
│   ├── users/
│   │   ├── service.ts             # Business logic
│   │   ├── controller.ts          # Request handlers
│   │   └── routes.ts              # Express routes
│   ├── subscriptions/
│   │   ├── service.ts
│   │   ├── controller.ts
│   │   └── routes.ts
│   ├── music/
│   │   ├── service.ts
│   │   ├── controller.ts
│   │   └── routes.ts
│   ├── likes/
│   │   ├── service.ts
│   │   ├── controller.ts
│   │   └── routes.ts
│   ├── matches/
│   │   ├── service.ts
│   │   ├── controller.ts
│   │   └── routes.ts
│   ├── chat/
│   │   ├── service.ts
│   │   ├── controller.ts
│   │   └── routes.ts
│   ├── prisma-clients.ts          # Prisma client instances
│   └── server.ts                  # Express app entry point
│
├── prisma-*.config.ts             # Configuraciones separadas
├── .env                           # Variables de entorno
├── package.json
└── tsconfig.json
```

## 🚀 Instalación

### 1. Clonar o crear el proyecto
```bash
cd path/to/your/project
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Crear archivos .env
Los archivos .env ya están configurados con las URLs de las bases de datos PostgreSQL.

Verifica que todas las conexiones estén disponibles:
```
USERS_DB_URL="postgresql://postgres:123456@192.168.20.147:5432/users_db"
SUBSCRIPTIONS_DB_URL="postgresql://postgres:123456@192.168.20.147:5432/subscriptions_db"
MUSIC_DB_URL="postgresql://postgres:123456@192.168.20.147:5432/music_db"
LIKES_DB_URL="postgresql://postgres:123456@192.168.20.147:5432/likes_db"
MATCHES_DB_URL="postgresql://postgres:123456@192.168.20.147:5432/matches_db"
CHAT_DB_URL="postgresql://postgres:123456@192.168.20.147:5432/chat_db"
PORT=3000
```

## 🔧 Configuración

### Bases de Datos PostgreSQL
Asegúrate de que todas las bases de datos estén creadas:
```sql
CREATE DATABASE users_db;
CREATE DATABASE subscriptions_db;
CREATE DATABASE music_db;
CREATE DATABASE likes_db;
CREATE DATABASE matches_db;
CREATE DATABASE chat_db;
```

### Prisma Clients
Los Prisma Clients se generan automáticamente en `./generated/{module}/` para cada schema.

## 📦 Comandos npm

### Instalación y Setup Inicial
```bash
npm install                    # Instalar dependencias
npm run prisma:generate       # Generar todos los Prisma Clients
npm run prisma:migrate:create # Crear e ejecutar migraciones
```

### Desarrollo
```bash
npm run dev                   # Ejecutar servidor en modo desarrollo con hot-reload
npm run build                 # Compilar TypeScript a JavaScript
npm run start                 # Ejecutar servidor compilado
```

### Migraciones Prisma
```bash
# Crear migraciones para todos los schemas
npm run prisma:migrate:create

# Ejecutar migraciones en producción
npm run prisma:migrate:deploy

# Resetear todas las bases de datos (¡CUIDADO!)
npm run prisma:reset

# Migraciones específicas
npm run migrate:users "nombre_migracion"
npm run migrate:subscriptions "nombre_migracion"
npm run migrate:music "nombre_migracion"
npm run migrate:likes "nombre_migracion"
npm run migrate:matches "nombre_migracion"
npm run migrate:chat "nombre_migracion"

# Prisma Studio (interfaz visual)
npm run prisma:studio
```

## 🗄️ Migraciones Prisma

### Primera vez: Crear tablas
```bash
npm run prisma:migrate:create
```

Esto te pedirá un nombre para la migración (ej: "init"):
```
✔ Enter a name for the new migration: … init
Prisma Migrate created the following migration:

  prisma/users/migrations/20231215120000_init/migration.sql
  prisma/subscriptions/migrations/20231215120000_init/migration.sql
  prisma/music/migrations/20231215120000_init/migration.sql
  prisma/likes/migrations/20231215120000_init/migration.sql
  prisma/matches/migrations/20231215120000_init/migration.sql
  prisma/chat/migrations/20231215120000_init/migration.sql
```

### Después: Generar Prisma Clients
```bash
npm run prisma:generate
```

### Aplicar migraciones en otra máquina/producción
```bash
npm run prisma:migrate:deploy
```

## 🌐 Ejecutar el Servidor

### Desarrollo (con hot-reload)
```bash
npm run dev
```

Output esperado:
```
✓ Server is running at http://localhost:3000
✓ Health check: http://localhost:3000/health
✓ API documentation: http://localhost:3000/
✓ Multiple Prisma Schemas Configured
✓ Node Environment: development
```

### Producción
```bash
npm run build
npm run start
```

## 🔌 Endpoints REST

### 📱 USERS - `/api/users`
- `POST /api/users` - Crear usuario
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:id` - Obtener usuario por ID
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario
- `POST /api/users/photos` - Agregar foto
- `GET /api/users/:userId/photos` - Obtener fotos del usuario
- `PUT /api/users/photos/:photoId` - Actualizar orden de fotos
- `DELETE /api/users/photos/:photoId` - Eliminar foto

### 💳 SUBSCRIPTIONS - `/api/subscriptions`
- `POST /api/subscriptions/users` - Crear usuario
- `GET /api/subscriptions/users` - Obtener todos los usuarios
- `GET /api/subscriptions/users/:id` - Obtener usuario por ID
- `PUT /api/subscriptions/users/:id` - Actualizar usuario
- `DELETE /api/subscriptions/users/:id` - Eliminar usuario
- `POST /api/subscriptions/plans` - Crear plan
- `GET /api/subscriptions/plans` - Obtener planes
- `POST /api/subscriptions` - Suscribir usuario a plan
- `GET /api/subscriptions/:userId` - Obtener suscripciones del usuario
- `PUT /api/subscriptions/:subscriptionId/cancel` - Cancelar suscripción

### 🎵 MUSIC - `/api/music`
- `POST /api/music/users` - Crear usuario
- `GET /api/music/users` - Obtener todos los usuarios
- `GET /api/music/users/:id` - Obtener usuario por ID
- `PUT /api/music/users/:id` - Actualizar usuario
- `DELETE /api/music/users/:id` - Eliminar usuario
- `POST /api/music/tracks` - Crear canción
- `GET /api/music/tracks` - Obtener todas las canciones
- `GET /api/music/tracks/:id` - Obtener canción por ID
- `PUT /api/music/tracks/:id` - Actualizar canción
- `DELETE /api/music/tracks/:id` - Eliminar canción
- `POST /api/music/user-tracks` - Agregar canción a usuario
- `GET /api/music/users/:userId/tracks` - Obtener canciones del usuario
- `DELETE /api/music/user-tracks/:userMusicId` - Eliminar canción del usuario

### ❤️ LIKES - `/api/likes`
- `POST /api/likes/users` - Crear usuario
- `GET /api/likes/users` - Obtener todos los usuarios
- `GET /api/likes/users/:id` - Obtener usuario por ID
- `PUT /api/likes/users/:id` - Actualizar usuario
- `DELETE /api/likes/users/:id` - Eliminar usuario
- `POST /api/likes` - Crear like
- `GET /api/likes` - Obtener todos los likes
- `GET /api/likes/sent/:userId` - Obtener likes enviados por usuario
- `GET /api/likes/received/:userId` - Obtener likes recibidos por usuario
- `DELETE /api/likes/:likeId` - Eliminar like
- `DELETE /api/likes/users/unlike` - Eliminar like entre dos usuarios

### 💕 MATCHES - `/api/matches`
- `POST /api/matches/users` - Crear usuario
- `GET /api/matches/users` - Obtener todos los usuarios
- `GET /api/matches/users/:id` - Obtener usuario por ID
- `PUT /api/matches/users/:id` - Actualizar usuario
- `DELETE /api/matches/users/:id` - Eliminar usuario
- `POST /api/matches` - Crear match
- `GET /api/matches` - Obtener todos los matches
- `GET /api/matches/:id` - Obtener match por ID
- `GET /api/matches/user/:userId` - Obtener matches del usuario
- `GET /api/matches/user/:userId/active` - Obtener matches activos
- `PUT /api/matches/:id/deactivate` - Desactivar match
- `DELETE /api/matches/:id` - Eliminar match

### 💬 CHAT - `/api/chat`
- `POST /api/chat/matches` - Crear chat de match
- `GET /api/chat/matches` - Obtener todos los chats
- `GET /api/chat/matches/:id` - Obtener chat por ID
- `GET /api/chat/matches/between` - Obtener chat entre dos usuarios
- `GET /api/chat/user/:userId` - Obtener chats del usuario
- `DELETE /api/chat/matches/:id` - Eliminar chat
- `POST /api/chat/messages` - Enviar mensaje
- `GET /api/chat/messages/:matchId` - Obtener mensajes del match
- `GET /api/chat/unread/:userId` - Obtener mensajes no leídos
- `PUT /api/chat/messages/:messageId/read` - Marcar mensaje como leído
- `PUT /api/chat/matches/:matchId/read-all` - Marcar todos como leídos
- `DELETE /api/chat/messages/:messageId` - Eliminar mensaje

## 📮 Ejemplos Postman

### 1. USERS

#### Crear Usuario
```http
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "name": "Juan García",
  "email": "juan@example.com",
  "passwordHash": "hashed_password_123",
  "birthDate": "1995-05-15",
  "gender": "Male",
  "bio": "Amante de la música y viajes",
  "city": "Madrid"
}
```

Respuesta:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Juan García",
  "email": "juan@example.com",
  "passwordHash": "hashed_password_123",
  "birthDate": "1995-05-15T00:00:00.000Z",
  "gender": "Male",
  "bio": "Amante de la música y viajes",
  "city": "Madrid",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

#### Obtener Todos los Usuarios
```http
GET http://localhost:3000/api/users
```

#### Obtener Usuario por ID
```http
GET http://localhost:3000/api/users/550e8400-e29b-41d4-a716-446655440000
```

#### Actualizar Usuario
```http
PUT http://localhost:3000/api/users/550e8400-e29b-41d4-a716-446655440000
Content-Type: application/json

{
  "bio": "Nuevo bio actualizado",
  "city": "Barcelona"
}
```

#### Eliminar Usuario
```http
DELETE http://localhost:3000/api/users/550e8400-e29b-41d4-a716-446655440000
```

#### Agregar Foto a Usuario
```http
POST http://localhost:3000/api/users/photos
Content-Type: application/json

{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "photoUrl": "https://example.com/photo1.jpg",
  "photoOrder": 1
}
```

#### Obtener Fotos del Usuario
```http
GET http://localhost:3000/api/users/550e8400-e29b-41d4-a716-446655440000/photos
```

### 2. SUBSCRIPTIONS

#### Crear Usuario de Subscripción
```http
POST http://localhost:3000/api/subscriptions/users
Content-Type: application/json

{
  "name": "María López",
  "email": "maria@example.com"
}
```

#### Crear Plan de Subscripción
```http
POST http://localhost:3000/api/subscriptions/plans
Content-Type: application/json

{
  "name": "Premium",
  "price": 9.99,
  "durationDays": 30
}
```

Respuesta:
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "name": "Premium",
  "price": "9.99",
  "durationDays": 30
}
```

#### Suscribir Usuario a Plan
```http
POST http://localhost:3000/api/subscriptions
Content-Type: application/json

{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "planId": "660e8400-e29b-41d4-a716-446655440001",
  "startDate": "2024-01-15T00:00:00Z",
  "endDate": "2024-02-15T00:00:00Z"
}
```

#### Obtener Suscripciones del Usuario
```http
GET http://localhost:3000/api/subscriptions/550e8400-e29b-41d4-a716-446655440000
```

#### Cancelar Suscripción
```http
PUT http://localhost:3000/api/subscriptions/550e8400-e29b-41d4-a716-446655440002/cancel
```

### 3. MUSIC

#### Crear Usuario de Música
```http
POST http://localhost:3000/api/music/users
Content-Type: application/json

{
  "name": "Carlos Ruiz",
  "email": "carlos@example.com"
}
```

#### Crear Canción
```http
POST http://localhost:3000/api/music/tracks
Content-Type: application/json

{
  "title": "Bohemian Rhapsody",
  "artist": "Queen",
  "spotifyUrl": "https://open.spotify.com/track/3z8h0TU7RvxVA6iaWK0NOT"
}
```

Respuesta:
```json
{
  "id": "770e8400-e29b-41d4-a716-446655440002",
  "title": "Bohemian Rhapsody",
  "artist": "Queen",
  "spotifyUrl": "https://open.spotify.com/track/3z8h0TU7RvxVA6iaWK0NOT"
}
```

#### Obtener Todas las Canciones
```http
GET http://localhost:3000/api/music/tracks
```

#### Agregar Canción a Usuario
```http
POST http://localhost:3000/api/music/user-tracks
Content-Type: application/json

{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "trackId": "770e8400-e29b-41d4-a716-446655440002"
}
```

#### Obtener Canciones del Usuario
```http
GET http://localhost:3000/api/music/users/550e8400-e29b-41d4-a716-446655440000/tracks
```

### 4. LIKES

#### Crear Usuario para Likes
```http
POST http://localhost:3000/api/likes/users
Content-Type: application/json

{
  "name": "Pedro García",
  "email": "pedro@example.com"
}
```

#### Crear Like
```http
POST http://localhost:3000/api/likes
Content-Type: application/json

{
  "senderUserId": "550e8400-e29b-41d4-a716-446655440000",
  "receiverUserId": "880e8400-e29b-41d4-a716-446655440003"
}
```

Respuesta:
```json
{
  "id": "990e8400-e29b-41d4-a716-446655440004",
  "senderUserId": "550e8400-e29b-41d4-a716-446655440000",
  "receiverUserId": "880e8400-e29b-41d4-a716-446655440003",
  "createdAt": "2024-01-15T10:45:00.000Z"
}
```

#### Obtener Likes Enviados por Usuario
```http
GET http://localhost:3000/api/likes/sent/550e8400-e29b-41d4-a716-446655440000
```

#### Obtener Likes Recibidos por Usuario
```http
GET http://localhost:3000/api/likes/received/880e8400-e29b-41d4-a716-446655440003
```

#### Eliminar Like
```http
DELETE http://localhost:3000/api/likes/990e8400-e29b-41d4-a716-446655440004
```

### 5. MATCHES

#### Crear Usuario para Matches
```http
POST http://localhost:3000/api/matches/users
Content-Type: application/json

{
  "name": "Ana Martínez",
  "email": "ana@example.com"
}
```

#### Crear Match
```http
POST http://localhost:3000/api/matches
Content-Type: application/json

{
  "user1Id": "550e8400-e29b-41d4-a716-446655440000",
  "user2Id": "880e8400-e29b-41d4-a716-446655440003"
}
```

Respuesta:
```json
{
  "id": "aa0e8400-e29b-41d4-a716-446655440005",
  "user1Id": "550e8400-e29b-41d4-a716-446655440000",
  "user2Id": "880e8400-e29b-41d4-a716-446655440003",
  "matchedAt": "2024-01-15T10:50:00.000Z",
  "isActive": true
}
```

#### Obtener Matches del Usuario
```http
GET http://localhost:3000/api/matches/user/550e8400-e29b-41d4-a716-446655440000
```

#### Obtener Matches Activos
```http
GET http://localhost:3000/api/matches/user/550e8400-e29b-41d4-a716-446655440000/active
```

#### Desactivar Match
```http
PUT http://localhost:3000/api/matches/aa0e8400-e29b-41d4-a716-446655440005/deactivate
```

#### Eliminar Match
```http
DELETE http://localhost:3000/api/matches/aa0e8400-e29b-41d4-a716-446655440005
```

### 6. CHAT

#### Crear Chat de Match
```http
POST http://localhost:3000/api/chat/matches
Content-Type: application/json

{
  "user1Id": "550e8400-e29b-41d4-a716-446655440000",
  "user2Id": "880e8400-e29b-41d4-a716-446655440003"
}
```

Respuesta:
```json
{
  "id": "bb0e8400-e29b-41d4-a716-446655440006",
  "user1Id": "550e8400-e29b-41d4-a716-446655440000",
  "user2Id": "880e8400-e29b-41d4-a716-446655440003",
  "matchedAt": "2024-01-15T10:55:00.000Z"
}
```

#### Enviar Mensaje
```http
POST http://localhost:3000/api/chat/messages
Content-Type: application/json

{
  "matchId": "bb0e8400-e29b-41d4-a716-446655440006",
  "senderUserId": "550e8400-e29b-41d4-a716-446655440000",
  "message": "¡Hola! ¿Cómo estás?"
}
```

Respuesta:
```json
{
  "id": "cc0e8400-e29b-41d4-a716-446655440007",
  "matchId": "bb0e8400-e29b-41d4-a716-446655440006",
  "senderUserId": "550e8400-e29b-41d4-a716-446655440000",
  "message": "¡Hola! ¿Cómo estás?",
  "isRead": false,
  "createdAt": "2024-01-15T11:00:00.000Z"
}
```

#### Obtener Mensajes del Match
```http
GET http://localhost:3000/api/chat/messages/bb0e8400-e29b-41d4-a716-446655440006
```

#### Obtener Mensajes No Leídos
```http
GET http://localhost:3000/api/chat/unread/880e8400-e29b-41d4-a716-446655440003
```

#### Marcar Mensaje como Leído
```http
PUT http://localhost:3000/api/chat/messages/cc0e8400-e29b-41d4-a716-446655440007/read
```

#### Marcar Todos los Mensajes del Match como Leídos
```http
PUT http://localhost:3000/api/chat/matches/bb0e8400-e29b-41d4-a716-446655440006/read-all
```

#### Obtener Chats del Usuario
```http
GET http://localhost:3000/api/chat/user/550e8400-e29b-41d4-a716-446655440000
```

#### Obtener Chat entre Dos Usuarios
```http
GET http://localhost:3000/api/chat/matches/between?user1Id=550e8400-e29b-41d4-a716-446655440000&user2Id=880e8400-e29b-41d4-a716-446655440003
```

#### Eliminar Mensaje
```http
DELETE http://localhost:3000/api/chat/messages/cc0e8400-e29b-41d4-a716-446655440007
```

## 📋 Pasos para Ejecutar Completos

### 1. Setup Inicial
```bash
# Clonar o crear el proyecto
cd path/to/project

# Instalar dependencias
npm install

# Generar Prisma Clients
npm run prisma:generate
```

### 2. Crear Bases de Datos PostgreSQL
```bash
# Conectar a PostgreSQL y ejecutar:
CREATE DATABASE users_db;
CREATE DATABASE subscriptions_db;
CREATE DATABASE music_db;
CREATE DATABASE likes_db;
CREATE DATABASE matches_db;
CREATE DATABASE chat_db;
```

### 3. Ejecutar Migraciones
```bash
npm run prisma:migrate:create
# Te pedirá un nombre para la migración (ej: init)
```

### 4. Iniciar el Servidor
```bash
npm run dev
```

### 5. Probar en Postman
- Importa los ejemplos de Postman proporcionados
- Empieza con `/api/users`
- Prueba cada módulo

## 🛠️ Troubleshooting

### Error: "Cannot find module '@prisma/client'"
```bash
npm install
npm run prisma:generate
```

### Error: "ECONNREFUSED - Database connection refused"
- Verifica que PostgreSQL está corriendo
- Revisa las URLs en .env
- Confirma que las bases de datos existen

### Error: "Relation does not exist"
```bash
# Resetear bases de datos (¡CUIDADO!)
npm run prisma:reset
```

### Port 3000 ya está en uso
```bash
# Cambiar puerto en .env
PORT=3001
```

### Error en migraciones
```bash
# Ver logs detallados
npm run prisma:migrate:create -- --skip-generate
```

## 📚 Estructura de Datos

### Users Database
- `users` - Tabla de usuarios
- `user_photos` - Fotos de usuarios

### Subscriptions Database
- `users_sub` - Usuarios para suscripciones
- `subscription_plans` - Planes disponibles
- `user_subscriptions` - Suscripciones activas

### Music Database
- `users_music_service` - Usuarios para música
- `music_tracks` - Canciones
- `user_music` - Relación usuario-canción

### Likes Database
- `users_likes_service` - Usuarios para likes
- `likes` - Registro de likes

### Matches Database
- `users_matches_service` - Usuarios para matches
- `matches` - Matches entre usuarios

### Chat Database
- `matches_chat` - Chats de matches
- `messages` - Mensajes en chats

## 🎯 Características Principales

✅ 6 Schemas Prisma separados
✅ 6 Prisma Clients independientes
✅ 6 Bases de Datos PostgreSQL
✅ Controllers, Services, Routes modulares
✅ CRUD completo para cada módulo
✅ TypeScript con tipos
✅ Express.js
✅ Migraciones automáticas
✅ Conexiones separadas por módulo
✅ Ejemplos de Postman

## 📞 Soporte

Para más información sobre Prisma:
- https://www.prisma.io/docs/
- https://www.prisma.io/docs/orm/reference/prisma-cli-reference

Para más información sobre Express:
- https://expressjs.com/

## 📄 Licencia

Este proyecto está disponible para uso educativo y comercial.
