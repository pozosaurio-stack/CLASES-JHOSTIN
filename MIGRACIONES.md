# 📊 Guía Completa de Migraciones Prisma

## ¿Qué son las Migraciones?

Las migraciones en Prisma son cambios en la base de datos que quedan registrados. Permiten:
- ✅ Crear/actualizar/eliminar tablas
- ✅ Cambiar esquema de la BD
- ✅ Documentar cambios
- ✅ Reproducir en otras máquinas
- ✅ Controlar versiones

## 🚀 Flujo Básico de Migraciones

### 1. Primera vez: Setup Inicial

```bash
# Paso 1: Instalar dependencias
npm install

# Paso 2: Generar Prisma Clients
npm run prisma:generate

# Paso 3: Crear las primeras migraciones
npm run prisma:migrate:create
```

Te pedirá un nombre para la migración:
```
✔ Enter a name for the new migration: … init
```

Escribe: `init`

Esto creará:
```
prisma/users/migrations/20240115120000_init/migration.sql
prisma/subscriptions/migrations/20240115120000_init/migration.sql
prisma/music/migrations/20240115120000_init/migration.sql
prisma/likes/migrations/20240115120000_init/migration.sql
prisma/matches/migrations/20240115120000_init/migration.sql
prisma/chat/migrations/20240115120000_init/migration.sql
```

### 2. Hacer cambios al schema

Si necesitas cambiar algo en `schema.prisma`:
```prisma
// Ejemplo: Agregar un campo nuevo
model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  // Agregar campo nuevo
  website   String?  // ← NUEVO CAMPO
  
  @@map("users")
}
```

### 3. Crear migración para los cambios

```bash
npm run migrate:users "agregar_website"
```

Esto creará:
```
prisma/users/migrations/20240115120500_agregar_website/migration.sql
```

### 4. Generar Prisma Client

```bash
npm run prisma:generate
```

## 📋 Comandos de Migraciones

### Crear Migraciones Iniciales (Todos los schemas)
```bash
npm run prisma:migrate:create
```

### Crear Migración Específica por Módulo
```bash
npm run migrate:users "nombre_migracion"
npm run migrate:subscriptions "nombre_migracion"
npm run migrate:music "nombre_migracion"
npm run migrate:likes "nombre_migracion"
npm run migrate:matches "nombre_migracion"
npm run migrate:chat "nombre_migracion"
```

Ejemplo:
```bash
npm run migrate:users "agregar_campo_telefono"
```

### Generar Prisma Clients
```bash
npm run prisma:generate
```

### Aplicar Migraciones en Otra Máquina/Producción
```bash
npm run prisma:migrate:deploy
```

### Resetear Bases de Datos (¡CUIDADO!)
```bash
npm run prisma:reset
```

⚠️ **Esto elimina todos los datos!**

### Ver Prisma Studio (Interfaz Visual)
```bash
npm run prisma:studio
```

Abre: http://localhost:5555

## 📝 Ejemplos Prácticos

### Ejemplo 1: Agregar Campo a Users

1. Editar `prisma/users/schema.prisma`:
```prisma
model User {
  id            String   @id @default(uuid())
  name          String
  email         String   @unique
  passwordHash  String   @map("password_hash")
  birthDate     DateTime @map("birth_date")
  gender        String
  bio           String?
  city          String?
  phoneNumber   String?  @map("phone_number")  // ← NUEVO
  createdAt     DateTime @default(now()) @map("created_at")
  
  photos        UserPhoto[]
  @@map("users")
}
```

2. Crear migración:
```bash
npm run migrate:users "agregar_telefono"
```

3. Generar client:
```bash
npm run prisma:generate
```

4. Listo! El cambio está en la BD

### Ejemplo 2: Agregar Tabla Relacionada

1. Editar `prisma/users/schema.prisma`:
```prisma
model User {
  id        String   @id @default(uuid())
  // ... campos existentes ...
  badges    UserBadge[]  // ← NUEVA RELACIÓN
  @@map("users")
}

model UserBadge {  // ← NUEVA TABLA
  id        String @id @default(uuid())
  userId    String @map("user_id")
  badgeName String
  createdAt DateTime @default(now()) @map("created_at")
  
  user      User @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@map("user_badges")
}
```

2. Crear migración:
```bash
npm run migrate:users "agregar_badges"
```

3. Generar client:
```bash
npm run prisma:generate
```

### Ejemplo 3: Cambiar Tipo de Campo

1. Editar `prisma/subscriptions/schema.prisma`:
```prisma
model SubscriptionPlan {
  id            String   @id @default(uuid())
  name          String
  price         Decimal   // ← Cambiar a Float
  durationDays  Int      @map("duration_days")
  
  userSubscriptions UserSubscriptionPlan[]
  @@map("subscription_plans")
}
```

Cambiar a:
```prisma
model SubscriptionPlan {
  id            String   @id @default(uuid())
  name          String
  price         Float    @map("price")  // ← CAMBIO
  durationDays  Int      @map("duration_days")
  
  userSubscriptions UserSubscriptionPlan[]
  @@map("subscription_plans")
}
```

2. Crear migración:
```bash
npm run migrate:subscriptions "cambiar_precio_a_float"
```

3. Generar client:
```bash
npm run prisma:generate
```

## 🔄 Flujo en Equipo

### Desarrollador 1: Hace cambios
```bash
# 1. Edita schema.prisma
nano prisma/users/schema.prisma

# 2. Crea migración
npm run migrate:users "nueva_funcionalidad"

# 3. Genera client
npm run prisma:generate

# 4. Commit a git
git add .
git commit -m "feat: agregar campo X a users"
git push
```

### Desarrollador 2: Recibe cambios
```bash
# 1. Pull cambios
git pull

# 2. Aplicar migraciones
npm run prisma:migrate:deploy

# 3. Generar clients
npm run prisma:generate

# 4. Listo para desarrollar
npm run dev
```

## 📂 Estructura de Migraciones

Cada schema tiene su carpeta de migraciones:
```
prisma/
├── users/
│   ├── schema.prisma
│   └── migrations/
│       ├── migration_lock.toml
│       └── 20240115120000_init/
│           └── migration.sql
│       └── 20240115120500_agregar_website/
│           └── migration.sql
├── subscriptions/
│   ├── schema.prisma
│   └── migrations/
│       └── ...
...
```

## 🆘 Troubleshooting

### Error: "Migration already applied"
```bash
# No hacer nada, es normal
# La migración ya está en la BD
```

### Error: "Database tables already exist"
```bash
# Opción 1: Resetear (PELIGRO: Pierde datos)
npm run prisma:reset

# Opción 2: Resolver conflicto manualmente
npm run prisma:migrate:resolve -- --rolled-back 20240115120000_init
```

### Error: "Schema validation error"
```bash
# Verificar schema.prisma
nano prisma/users/schema.prisma

# Buscar errores de sintaxis
# Luego intentar de nuevo
npm run migrate:users "nuevo_intento"
```

### Error: "Connection timeout"
```bash
# Verificar que PostgreSQL está corriendo
# Verificar URLs en .env
# Intenta de nuevo
npm run prisma:migrate:deploy
```

### Error: "Cannot create migration, database schema is out of sync"
```bash
# Opción 1: Generar migración vacía
npm run migrate:users "sincronizar"

# Opción 2: Resetear
npm run prisma:reset
```

## ✅ Checklist Pre-Deployar

Antes de deployar a producción:

```
[ ] Todos los cambios en schema.prisma están hechos
[ ] Todas las migraciones fueron creadas
[ ] Las migraciones fueron testeadas localmente
[ ] npm run prisma:generate ejecutado
[ ] npm run prisma:migrate:deploy testado en BD de prueba
[ ] Código está en git
[ ] Tests pasan
[ ] PR fue revisado
```

## 📚 Recursos Útiles

- [Prisma Migrations Docs](https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/what-is-prisma-migrate)
- [Schema Reference](https://www.prisma.io/docs/orm/reference/prisma-schema-reference)
- [SQL Migration Files](https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/what-is-prisma-migrate#understanding-the-generated-sql-files)

## 🎯 Resumen Rápido

1. **Cambio en schema.prisma** → `npm run migrate:{modulo} "nombre"`
2. **Generar Prisma Client** → `npm run prisma:generate`
3. **Aplicar en producción** → `npm run prisma:migrate:deploy`
4. **Ver datos visual** → `npm run prisma:studio`
5. **Resetear TODO** → `npm run prisma:reset` ⚠️

¡Listo! Ya sabes cómo manejar migraciones en Prisma.
