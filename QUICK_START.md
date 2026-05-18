# ⚡ Quick Start - Comienza en 5 Minutos

## 1️⃣ Instalación (2 minutos)

```bash
# Navega a la carpeta del proyecto
cd path/to/42422542

# Instala dependencias
npm install
```

## 2️⃣ Generar Prisma Clients (1 minuto)

```bash
npm run prisma:generate
```

## 3️⃣ Crear Bases de Datos (1 minuto)

Asegúrate que PostgreSQL esté corriendo, luego ejecuta en PostgreSQL:

```sql
CREATE DATABASE users_db;
CREATE DATABASE subscriptions_db;
CREATE DATABASE music_db;
CREATE DATABASE likes_db;
CREATE DATABASE matches_db;
CREATE DATABASE chat_db;
```

## 4️⃣ Ejecutar Migraciones (1 minuto)

```bash
npm run prisma:migrate:create
```

Cuando te pida el nombre, escribe: `init`

## 5️⃣ Iniciar el Servidor

```bash
npm run dev
```

✅ **¡Listo!** El servidor está corriendo en `http://localhost:3000`

---

## 📮 Primeras Pruebas en Postman

### 1. Crear Usuario
```
POST http://localhost:3000/api/users

{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "passwordHash": "pass123",
  "birthDate": "1990-01-01",
  "gender": "Male",
  "bio": "Hola soy Juan",
  "city": "Madrid"
}
```

### 2. Obtener Usuarios
```
GET http://localhost:3000/api/users
```

### 3. Crear Suscripción
```
POST http://localhost:3000/api/subscriptions/users

{
  "name": "Suscriptor",
  "email": "suscriptor@example.com"
}
```

### 4. Crear Canción
```
POST http://localhost:3000/api/music/tracks

{
  "title": "Mi Canción",
  "artist": "Mi Artista",
  "spotifyUrl": "https://spotify.com/..."
}
```

---

## 🔧 Comandos Útiles

```bash
# Ver la API en navegador
http://localhost:3000

# Ver salud del servidor
http://localhost:3000/health

# Detener servidor
Ctrl + C

# Ver BD visualmente
npm run prisma:studio

# Compilar TypeScript
npm run build

# Generar clientes nuevamente
npm run prisma:generate
```

---

## 📚 Documentación Completa

- `README.md` - Documentación completa
- `MIGRACIONES.md` - Guía de migraciones
- `POSTMAN_COLLECTION.json` - Colección Postman lista para importar

---

## ❓ Problemas Comunes

### "Cannot find module '@prisma/client'"
```bash
npm install
npm run prisma:generate
```

### "Connection refused"
- Verifica que PostgreSQL esté corriendo
- Verifica las URLs en `.env`
- Verifica que las 6 BD existan

### "Port 3000 already in use"
```bash
# Cambia PORT en .env a 3001
PORT=3001
```

---

¡Ahora estás listo para comenzar! 🚀
