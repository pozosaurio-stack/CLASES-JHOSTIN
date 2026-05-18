# 🚀 INSTRUCCIONES PASO A PASO - Comienza Ahora

## 📌 Requisitos Previos

Antes de empezar, asegúrate de tener instalado:

- **Node.js** v18+ (descarga de https://nodejs.org)
- **PostgreSQL** (descarga de https://www.postgresql.org/download/)
- **Git** (descarga de https://git-scm.com/)
- **Postman** (descarga de https://www.postman.com/downloads/)
- **VS Code** (descarga de https://code.visualstudio.com/)

Verifica que estén instalados:
```bash
node --version        # Debe ser v18 o superior
npm --version         # npm viene con Node.js
postgres --version    # PostgreSQL instalado
git --version         # Git instalado
```

## 🎯 PASO 1: Preparar el Proyecto (5 minutos)

### 1.1 Abre VS Code

```bash
# Abre la carpeta del proyecto
cd c:\Users\Tw2nt\Desktop\42422542
code .
```

### 1.2 Abre la Terminal Integrada de VS Code

En VS Code:
1. Presiona: `Ctrl + ⁕` (backtick) o `Ctrl + Shift + ⁕`
2. Aparecerá una terminal en la parte inferior

## 🔧 PASO 2: Instalar Dependencias (3 minutos)

En la terminal de VS Code, ejecuta:

```bash
npm install
```

Esto instalará:
- Express
- Prisma
- TypeScript
- Todas las dependencias necesarias

**Espera a que termine** (puede tardar 2-3 minutos)

Verifica que se creó la carpeta `node_modules/` (será grande ~500MB)

## 🗄️ PASO 3: Crear Bases de Datos PostgreSQL (2 minutos)

### 3.1 Abre pgAdmin o psql

**Opción A: Usar pgAdmin (más fácil)**
1. Abre pgAdmin (viene con PostgreSQL)
2. Click en **"Servers"** → **"PostgreSQL 15"**
3. Introduce tu contraseña si te la pide
4. Click derecho en **"Databases"** → **"Create"** → **"Database"**

**Opción B: Usar terminal psql**
```bash
# En terminal (Windows)
psql -U postgres

# Introduce tu contraseña
```

### 3.2 Crea las 6 bases de datos

En pgAdmin o psql, ejecuta:

```sql
CREATE DATABASE users_db;
CREATE DATABASE subscriptions_db;
CREATE DATABASE music_db;
CREATE DATABASE likes_db;
CREATE DATABASE matches_db;
CREATE DATABASE chat_db;
```

**Verifica que se crearon:**
- En pgAdmin: Deberías ver las 6 BD en la lista
- En psql: Ejecuta `\l` para listar todas las BD

## ⚙️ PASO 4: Verificar el Archivo .env (1 minuto)

En VS Code, abre el archivo `.env` en la raíz del proyecto.

Verifica que tenga esto:

```
USERS_DB_URL="postgresql://postgres:123456@192.168.20.147:5432/users_db"
SUBSCRIPTIONS_DB_URL="postgresql://postgres:123456@192.168.20.147:5432/subscriptions_db"
MUSIC_DB_URL="postgresql://postgres:123456@192.168.20.147:5432/music_db"
LIKES_DB_URL="postgresql://postgres:123456@192.168.20.147:5432/likes_db"
MATCHES_DB_URL="postgresql://postgres:123456@192.168.20.147:5432/matches_db"
CHAT_DB_URL="postgresql://postgres:123456@192.168.20.147:5432/chat_db"
PORT=3000
NODE_ENV=development
```

⚠️ **IMPORTANTE**: Si tu usuario PostgreSQL no es `postgres` o contraseña no es `123456`:
- Cambia `postgres` por tu usuario
- Cambia `123456` por tu contraseña
- Cambia `192.168.20.147` por tu IP o `localhost`

Ejemplo:
```
USERS_DB_URL="postgresql://usuario:micontraseña@localhost:5432/users_db"
```

## 📦 PASO 5: Generar Prisma Clients (1 minuto)

En la terminal de VS Code, ejecuta:

```bash
npm run prisma:generate
```

Esto creará automáticamente:
```
generated/
├── users/
├── subscriptions/
├── music/
├── likes/
├── matches/
└── chat/
```

## 🗄️ PASO 6: Crear Migraciones (2 minutos)

Ejecuta:

```bash
npm run prisma:migrate:create
```

Te pedirá un nombre para la migración. Escribe:

```
init
```

Presiona Enter.

**Verifica que se crearon las carpetas:**
```
prisma/
├── users/migrations/
├── subscriptions/migrations/
├── music/migrations/
├── likes/migrations/
├── matches/migrations/
└── chat/migrations/
```

## ✅ PASO 7: Verificar Bases de Datos (1 minuto)

En pgAdmin:
1. Abre cada BD (users_db, subscriptions_db, etc.)
2. Expande **"Tables"**
3. Deberías ver las tablas creadas (users, user_photos, subscription_plans, etc.)

Si no ves tablas, significa que las migraciones fallaron. Revisa los errores en la consola.

## 🚀 PASO 8: Iniciar el Servidor (1 minuto)

En la terminal de VS Code, ejecuta:

```bash
npm run dev
```

**Deberías ver:**
```
✓ Server is running at http://localhost:3000
✓ Health check: http://localhost:3000/health
✓ API documentation: http://localhost:3000/
✓ Multiple Prisma Schemas Configured
✓ Node Environment: development
```

Si ves esto, **¡el servidor está corriendo correctamente!** ✅

## 📮 PASO 9: Probar en Postman (5 minutos)

### 9.1 Importar Colección

1. Abre Postman
2. Click en **File** → **Import**
3. Click en **Upload Files**
4. Busca: `POSTMAN_COLLECTION.json`
5. Haz click en **Open**
6. Verás toda la colección importada

### 9.2 Crear Usuario (Primera Prueba)

1. En Postman, expande **USERS**
2. Click en **Create User**
3. Click en **Send** (azul a la derecha)

**Deberías ver una respuesta 201 (Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Juan García",
  "email": "juan@example.com",
  ...
}
```

### 9.3 Probar Otros Endpoints

1. **Get All Users** → Click Send
2. **Get User by ID** → Cambia el ID y Click Send
3. **Create Subscription User** → Click Send
4. **Create Music Track** → Click Send
5. **Etc.**

## 🎓 Pasos Siguientes

Una vez que todo funcione:

### Entender la Estructura
- Lee `README.md` (documentación completa)
- Lee `ESTRUCTURA.md` (visión general)

### Hacer Cambios
- Edita los schemas en `prisma/*/schema.prisma`
- Luego: `npm run migrate:{modulo} "nombre_cambio"`
- Luego: `npm run prisma:generate`

### Agregar Nuevos Módulos
- Crea carpeta `prisma/nuevo_modulo/`
- Crea `schema.prisma`
- Crea `prisma-nuevo_modulo.config.ts`
- Crea carpeta `src/nuevo_modulo/`
- Crea `controller.ts`, `service.ts`, `routes.ts`

## ❓ Solución de Problemas

### Error: "Cannot find module '@prisma/client'"
```bash
npm install
npm run prisma:generate
```

### Error: "Connection refused"
- Verifica que PostgreSQL está corriendo
- Verifica las URLs en `.env`
- Verifica que las 6 BDs existen
- Verifica usuario/contraseña en `.env`

### Error: "Port 3000 already in use"
```bash
# Cambia PORT en .env a 3001
PORT=3001
```

Luego ejecuta:
```bash
npm run dev
```

### Error: "Relation does not exist"
```bash
# Resetea todas las BDs
npm run prisma:reset

# Luego crea migraciones de nuevo
npm run prisma:migrate:create
```

### Error en Postman: "Cannot GET /api/users"
- Verifica que el servidor está corriendo (`npm run dev`)
- Verifica que la URL es correcta (http://localhost:3000)
- Verifica que el método es correcto (GET, POST, etc.)

## 📚 Documentación

| Archivo | Cuando Usarlo |
|---------|---|
| `QUICK_START.md` | Comienza en 5 min |
| `README.md` | Documentación general |
| `ESTRUCTURA.md` | Entender el proyecto |
| `MIGRACIONES.md` | Cambiar schemas |
| `POSTMAN_GUIDE.md` | Usar Postman |

## ✅ Checklist Final

Marca cada paso conforme lo completes:

- [ ] Node.js v18+ instalado
- [ ] PostgreSQL instalado
- [ ] VS Code abierto en la carpeta del proyecto
- [ ] `npm install` ejecutado
- [ ] 6 bases de datos creadas en PostgreSQL
- [ ] `.env` verificado y correcto
- [ ] `npm run prisma:generate` ejecutado
- [ ] `npm run prisma:migrate:create` ejecutado (nombre: init)
- [ ] Tablas creadas en las 6 BDs
- [ ] `npm run dev` ejecutando correctamente
- [ ] Servidor corriendo en http://localhost:3000
- [ ] Postman abierto
- [ ] Colección importada en Postman
- [ ] Primer endpoint probado exitosamente
- [ ] Documentación leída

## 🎉 ¡Listo!

Si todo pasó el checklist, **¡estás listo para comenzar!**

### Próximos pasos:
1. Prueba todos los endpoints en Postman
2. Lee la documentación para entender la estructura
3. Cambia los datos de ejemplo por los tuyos
4. Agrega nuevos endpoints según necesites
5. Despliega a producción cuando esté listo

## 📞 Ayuda Rápida

- **Servidor no inicia**: Verifica que el puerto 3000 está libre
- **BD no se conecta**: Verifica URLs en `.env`
- **Schemas no se crean**: Ejecuta `npm run prisma:migrate:create`
- **Prisma Client no existe**: Ejecuta `npm run prisma:generate`
- **Postman no encuentra servidor**: Asegúrate que `npm run dev` está ejecutándose

---

**¡Que disfrutes trabajando con Prisma Multiple Schemas!** 🚀

¿Preguntas? Revisa los archivos `.md` para más detalles.
