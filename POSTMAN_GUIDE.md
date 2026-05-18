# 📮 Guía: Usar Postman con Este Proyecto

## 1️⃣ Descargar Postman

Descarga desde: https://www.postman.com/downloads/

## 2️⃣ Importar Colección

### Opción A: Importar archivo JSON (RECOMENDADO)

1. Abre Postman
2. Click en **"File"** → **"Import"**
3. Selecciona **"Upload Files"**
4. Busca el archivo `POSTMAN_COLLECTION.json` en la carpeta del proyecto
5. Click en **"Open"**
6. Verás todos los endpoints listos

### Opción B: Crear manualmente

Si prefieres hacerlo a mano:

1. Abre Postman
2. Click en **"+"** para crear una nueva solicitud
3. Copia los ejemplos de abajo

## 3️⃣ Estructura de la Colección

```
Prisma Multiple Schemas (Collection)
├── USERS
│   ├── Create User
│   ├── Get All Users
│   ├── Get User by ID
│   ├── Update User
│   ├── Delete User
│   └── Add User Photo
├── SUBSCRIPTIONS
│   ├── Create Subscription User
│   ├── Create Subscription Plan
│   ├── Subscribe User to Plan
│   └── Get User Subscriptions
├── MUSIC
│   ├── Create Music User
│   ├── Create Music Track
│   ├── Get All Tracks
│   └── Add Track to User
├── LIKES
│   ├── Create Likes User
│   ├── Create Like
│   ├── Get Likes Sent by User
│   └── Get Likes Received by User
├── MATCHES
│   ├── Create Matches User
│   ├── Create Match
│   ├── Get User Matches
│   └── Get Active Matches
└── CHAT
    ├── Create Match Chat
    ├── Send Message
    ├── Get Match Messages
    ├── Get User Chats
    └── Mark Message as Read
```

## 4️⃣ Ejemplos de Solicitudes

### USERS - Crear Usuario
```
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

**Respuesta esperada (201):**
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

---

### USERS - Obtener Todos
```
GET http://localhost:3000/api/users
```

**Respuesta esperada (200):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Juan García",
    "email": "juan@example.com",
    "passwordHash": "hashed_password_123",
    "birthDate": "1995-05-15T00:00:00.000Z",
    "gender": "Male",
    "bio": "Amante de la música y viajes",
    "city": "Madrid",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "photos": []
  }
]
```

---

### USERS - Obtener por ID
```
GET http://localhost:3000/api/users/550e8400-e29b-41d4-a716-446655440000
```

---

### USERS - Actualizar
```
PUT http://localhost:3000/api/users/550e8400-e29b-41d4-a716-446655440000
Content-Type: application/json

{
  "bio": "Nuevo bio",
  "city": "Barcelona"
}
```

---

### USERS - Eliminar
```
DELETE http://localhost:3000/api/users/550e8400-e29b-41d4-a716-446655440000
```

---

### USERS - Agregar Foto
```
POST http://localhost:3000/api/users/photos
Content-Type: application/json

{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "photoUrl": "https://example.com/photo1.jpg",
  "photoOrder": 1
}
```

---

### SUBSCRIPTIONS - Crear Usuario
```
POST http://localhost:3000/api/subscriptions/users
Content-Type: application/json

{
  "name": "María López",
  "email": "maria@example.com"
}
```

---

### SUBSCRIPTIONS - Crear Plan
```
POST http://localhost:3000/api/subscriptions/plans
Content-Type: application/json

{
  "name": "Premium",
  "price": 9.99,
  "durationDays": 30
}
```

---

### SUBSCRIPTIONS - Suscribir Usuario
```
POST http://localhost:3000/api/subscriptions
Content-Type: application/json

{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "planId": "660e8400-e29b-41d4-a716-446655440001",
  "startDate": "2024-01-15T00:00:00Z",
  "endDate": "2024-02-15T00:00:00Z"
}
```

---

### MUSIC - Crear Usuario
```
POST http://localhost:3000/api/music/users
Content-Type: application/json

{
  "name": "Carlos Ruiz",
  "email": "carlos@example.com"
}
```

---

### MUSIC - Crear Canción
```
POST http://localhost:3000/api/music/tracks
Content-Type: application/json

{
  "title": "Bohemian Rhapsody",
  "artist": "Queen",
  "spotifyUrl": "https://open.spotify.com/track/3z8h0TU7RvxVA6iaWK0NOT"
}
```

---

### MUSIC - Obtener Todas las Canciones
```
GET http://localhost:3000/api/music/tracks
```

---

### MUSIC - Agregar Canción a Usuario
```
POST http://localhost:3000/api/music/user-tracks
Content-Type: application/json

{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "trackId": "770e8400-e29b-41d4-a716-446655440002"
}
```

---

### LIKES - Crear Usuario
```
POST http://localhost:3000/api/likes/users
Content-Type: application/json

{
  "name": "Pedro García",
  "email": "pedro@example.com"
}
```

---

### LIKES - Crear Like
```
POST http://localhost:3000/api/likes
Content-Type: application/json

{
  "senderUserId": "550e8400-e29b-41d4-a716-446655440000",
  "receiverUserId": "880e8400-e29b-41d4-a716-446655440003"
}
```

---

### LIKES - Obtener Likes Enviados
```
GET http://localhost:3000/api/likes/sent/550e8400-e29b-41d4-a716-446655440000
```

---

### LIKES - Obtener Likes Recibidos
```
GET http://localhost:3000/api/likes/received/880e8400-e29b-41d4-a716-446655440003
```

---

### MATCHES - Crear Usuario
```
POST http://localhost:3000/api/matches/users
Content-Type: application/json

{
  "name": "Ana Martínez",
  "email": "ana@example.com"
}
```

---

### MATCHES - Crear Match
```
POST http://localhost:3000/api/matches
Content-Type: application/json

{
  "user1Id": "550e8400-e29b-41d4-a716-446655440000",
  "user2Id": "880e8400-e29b-41d4-a716-446655440003"
}
```

---

### MATCHES - Obtener Matches del Usuario
```
GET http://localhost:3000/api/matches/user/550e8400-e29b-41d4-a716-446655440000
```

---

### CHAT - Crear Chat de Match
```
POST http://localhost:3000/api/chat/matches
Content-Type: application/json

{
  "user1Id": "550e8400-e29b-41d4-a716-446655440000",
  "user2Id": "880e8400-e29b-41d4-a716-446655440003"
}
```

---

### CHAT - Enviar Mensaje
```
POST http://localhost:3000/api/chat/messages
Content-Type: application/json

{
  "matchId": "bb0e8400-e29b-41d4-a716-446655440006",
  "senderUserId": "550e8400-e29b-41d4-a716-446655440000",
  "message": "¡Hola! ¿Cómo estás?"
}
```

---

### CHAT - Obtener Mensajes del Match
```
GET http://localhost:3000/api/chat/messages/bb0e8400-e29b-41d4-a716-446655440006
```

---

### CHAT - Obtener Chats del Usuario
```
GET http://localhost:3000/api/chat/user/550e8400-e29b-41d4-a716-446655440000
```

---

### CHAT - Marcar Mensaje como Leído
```
PUT http://localhost:3000/api/chat/messages/cc0e8400-e29b-41d4-a716-446655440007/read
```

---

## 5️⃣ Tips & Tricks

### Guardar IDs para Reutilizarlos

En Postman, después de crear un usuario, puedes guardar el ID:

1. Haz click en la respuesta
2. Selecciona el ID del JSON
3. Click derecho → "Set as variable"
4. Luego lo puedes usar en otras solicitudes como `{{userId}}`

### Usar Variables de Entorno

1. Click en el engranaje ⚙️ (arriba a la derecha)
2. **Manage Environments**
3. **Create Environment**
4. Agrega variables:
   - `base_url` = `http://localhost:3000`
   - `userId` = `tu-id-aqui`
   - `trackId` = `tu-id-aqui`

5. En las solicitudes, usa:
   - `{{base_url}}/api/users`
   - `{{userId}}`

### Usar Pre-request Script

Para agregar timestamps:
```javascript
pm.environment.set("timestamp", new Date().toISOString());
```

### Ver Respuestas Formateadas

Postman automáticamente formatea JSON. Si no lo hace:
1. Click en **"Body"**
2. Asegúrate que **"JSON"** está seleccionado

## 6️⃣ Orden Recomendado para Probar

1. **Crear usuario en USERS** (guardá el ID)
2. **Crear usuario en SUBSCRIPTIONS** (guardá el ID)
3. **Crear usuario en MUSIC** (guardá el ID)
4. **Crear usuario en LIKES** (guardá el ID)
5. **Crear usuario en MATCHES** (guardá el ID)
6. **Agregar planes de suscripción**
7. **Crear canción en MUSIC**
8. **Crear match entre dos usuarios**
9. **Crear chat**
10. **Enviar mensaje**

## 7️⃣ Exportar Resultados

Si necesitas documentar:
1. Click en **"..."** (arriba a la derecha)
2. **"Generate Report"**
3. Exporta a PDF o HTML

---

¡Listo! Ya puedes probar toda la API 🚀
