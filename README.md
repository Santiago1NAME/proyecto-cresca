<p align="center">
  <h1 align="center">Cresca - Sistema de Gestión</h1>
  <p align="center">
    Plataforma integral de gestión con panel de administración, autenticación JWT y arquitectura hexagonal en el backend.
  </p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS"/>
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind"/>
</p>

---

## Descripción General

**Cresca** es un sistema de gestión que consta de dos aplicaciones principales:

- **Backend API** (`backend-api/`): API RESTful construida con NestJS siguiendo **Arquitectura Hexagonal** (Puertos y Adaptadores), con autenticación JWT, control de acceso basado en roles (RBAC) e integración con modelos de IA.
- **Frontend Admin** (`front-apiv1/`): Dashboard de administración construido con Next.js 16 (App Router), React 19 y shadcn/ui, que consume la API del backend para la gestión de usuarios, roles y reservas.

---

## Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                    │
│              Puerto: 3001 | App Router                   │
│   ┌─────────┐  ┌──────────┐  ┌───────────┐              │
│   │  Login  │  │ Dashboard│  │   Users   │   shadcn/ui  │
│   └─────────┘  └──────────┘  └───────────┘   Zustand    │
└───────────────────────┬─────────────────────────────────┘
                        │ HTTP REST (JWT)
                        ▼
┌─────────────────────────────────────────────────────────┐
│                   Backend API (NestJS)                   │
│              Puerto: 3000 | /api/v1                      │
│                                                         │
│   ┌─────────────────────────────────────────────────┐   │
│   │           Arquitectura Hexagonal                │   │
│   │                                                 │   │
│   │   ┌───────────┐  ┌────────────┐  ┌───────────┐ │   │
│   │   │  Domain   │→ │Application │→ │Infra-     │ │   │
│   │   │           │  │            │  │structure   │ │   │
│   │   │ Entities  │  │ Use Cases  │  │In:  CTRL  │ │   │
│   │   │ Ports     │  │    DTOs    │  │Out: ADAPT  │ │   │
│   │   │ Excepts   │  │            │  │            │ │   │
│   │   └───────────┘  └────────────┘  └───────────┘ │   │
│   └─────────────────────────────────────────────────┘   │
└───────────────────────┬─────────────────────────────────┘
                        │ TypeORM
                        ▼
                ┌───────────────┐
                │   MySQL DB    │
                │   nombre_db   │
                └───────────────┘
```

---

## Docker

### Prerrequisitos

- Docker >= 24
- Docker Compose >= 2.20

### Variables de Entorno

El proyecto utiliza un archivo `.env` en la raíz para la configuración de Docker Compose:

| Variable | Descripción | Ejemplo |
|----------|------------|---------|
| `MYSQL_PASSWORD` | Contraseña de MySQL | `password` |
| `MYSQL_DATABASE` | Nombre de la base de datos | `cresca_db` |

> Las demás variables de conexión (`MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`) se configuran directamente en los archivos `docker-compose*.yml` y en el `.env` de cada servicio.

### Desarrollo con Docker (Recomendado)

Ejecuta el entorno completo con hot-reload para desarrollo:

```bash
docker compose -f docker-compose.dev.yml up --build
```

| Servicio | Puerto | Descripción |
|----------|--------|-------------|
| `cresca-mysql` | `3306` | MySQL 8.0 |
| `cresca-backend` | `3000` | API NestJS con hot-reload |
| `cresca-frontend` | `3001` | Dashboard Next.js con hot-reload |

Para detener y limpiar:

```bash
docker compose -f docker-compose.dev.yml down -v
```

### Producción con Docker

Ejecuta el entorno optimizado para producción:

```bash
docker compose up --build -d
```

- **Backend**: Multi-stage build con producción optimizada
- **Frontend**: Build standalone de Next.js
- **MySQL**: Con healthcheck y persistencia en volumen `mysql_data`
- **Inicialización**: Se ejecuta `mysql/init.sql` automáticamente al crear el contenedor

Para detener y limpiar:

```bash
docker compose down -v
```

### Contenedores

| Contenedor | Puerto | Descripción |
|-----------|--------|-------------|
| `cresca-mysql` | `3306` | Base de datos MySQL 8.0 |
| `cresca-backend` | `3000` | API NestJS |
| `cresca-frontend` | `3001` | Dashboard Next.js |

### Archivos Docker del Proyecto

```
├── docker-compose.yml          # Composición de producción
├── docker-compose.dev.yml      # Composición de desarrollo
├── mysql/
│   └── init.sql                # Inicialización de la BD
├── backend-api/
│   ├── Dockerfile              # Build multi-stage producción
│   ├── Dockerfile.dev          # Build desarrollo
│   └── .dockerignore
└── front-apiv1/
    ├── Dockerfile              # Build multi-stage producción
    ├── Dockerfile.dev          # Build desarrollo
    └── .dockerignore
```

---

## Backend API (`backend-api/`)

### Arquitectura Hexagonal

El backend implementa **Arquitectura Hexagonal** (también conocida como Puertos y Adaptadores), un patrón de diseño que separa la lógica core de la aplicación de los detalles de infraestructura. Esto permite cambiar fácilmente las fuentes de datos, APIs externas o frameworks sin afectar la lógica de negocio.

#### Flujo de una Petición

```
HTTP Request
    │
    ▼
┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│ Controller  │ →  │  Use Case    │ →  │   Port      │
│ (infra/in)  │    │ (application)│    │ (domain)    │
└─────────────┘    └──────────────┘    └──────┬──────┘
                                              │
                                              ▼
                                        ┌─────────────┐
                                        │   Adapter   │
                                        │ (infra/out) │
                                        └──────┬──────┘
                                               │
                                               ▼
                                         ┌───────────┐
                                         │  MySQL DB │
                                         └───────────┘
```

#### Módulos Implementados

| Módulo | Funcionalidad |
|--------|--------------|
| **Auth** | Login JWT, verificación de credenciales |
| **Users** | CRUD completo de usuarios |
| **Roles** | Gestión de roles y permisos (RBAC) |
| **Reserva** (**Implementando**) | Reservaciones con chat IA (Ollama) |

### Stack Tecnológico

| Componente | Tecnología | Versión |
|-----------|-----------|---------|
| Runtime | Node.js | LTS |
| Framework | NestJS | ^11.0.1 |
| Lenguaje | TypeScript | ^5.7.3 |
| ORM | TypeORM | ^0.3.28 |
| Base de datos | MySQL (mysql2) | ^3.17.2 |
| Autenticación | JWT (@nestjs/jwt) | ^11.0.2 |
| Hash passwords | bcrypt | ^6.0.0 |
| Validación | class-validator + class-transformer | ^0.14.3 / ^0.5.1 |
| IA (chat) | Ollama + OpenAI SDK | ^0.6.3 / ^6.25.0 |
| Gestor de paquetes | pnpm | ^9.1.0 |

### Prerequisitos

- Node.js >= 18
- pnpm >= 9.1.0
- MySQL >= 8.0
- (Opcional) Ollama corriendo localmente para funcionalidad de chat IA

### Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd proyecto/backend-api

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de MySQL
```

### Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|------------|---------|
| `MYSQL_HOST` | Host del servidor MySQL | `localhost` |
| `MYSQL_PORT` | Puerto de MySQL | `3306` |
| `MYSQL_USER` | Usuario de MySQL | `root` |
| `MYSQL_PASSWORD` | Contraseña de MySQL | `password` |
| `MYSQL_DATABASE` | Nombre de la base de datos | `nombre_db` |

### Ejecución

```bash
# Desarrollo (con hot-reload)
pnpm run start:dev

# Produccion
pnpm run start:prod

# Build
pnpm run build
```

El servidor arranca en `http://localhost:3000` con prefijo global `/api/v1`.

### Endpoints API

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `POST` | `/api/v1/auth/login` | Iniciar sesión | No |
| `POST` | `/api/v1/users` | Crear usuario | Sí |
| `GET` | `/api/v1/users` | Listar usuarios | Sí |
| `GET` | `/api/v1/users/:id` | Obtener usuario por ID | Sí |
| `PATCH` | `/api/v1/users/:id` | Actualizar usuario | Sí |
| `DELETE` | `/api/v1/users/:id` | Eliminar usuario | Sí |
| `GET` | `/api/v1/reserva` | Listar reservas | Sí |
| `POST` | `/api/v1/reserva` | Crear reserva | Sí |
| `PATCH` | `/api/v1/reserva/:id` | Actualizar reserva | Sí |
| `DELETE` | `/api/v1/reserva/:id` | Eliminar reserva | Sí |

---

## Frontend Admin (`front-apiv1/`)

### Descripción

Dashboard de administración con autenticación JWT, gestión de usuarios y sistema de roles. Construido con Next.js 16 (App Router) y componentes shadcn/ui.

### Stack Tecnológico

| Componente | Tecnología | Versión |
|-----------|-----------|---------|
| Framework | Next.js (App Router) | ^16.1.4 |
| UI Library | React | ^19.2.3 |
| Componentes | shadcn/ui (New York) | Radix UI |
| Estilos | Tailwind CSS | ^4 |
| Estado global | Zustand | ^5.0.10 |
| Formularios | React Hook Form + Zod | ^7.71.1 / ^4.3.6 |
| Icons | Lucide React | ^0.562.0 |
| JWT | jwt-decode | ^4.0.0 |
| Cookies | js-cookie | ^3.0.5 |
| Notificaciones | Sonner | ^2.0.7 |
| Gestor de paquetes | pnpm | ^9.1.0 |

### Prerequisitos

- Node.js >= 18
- pnpm >= 9.1.0
- Backend API corriendo en `http://localhost:3000`

### Instalación

```bash
cd proyecto/front-apiv1

# Instalar dependencias
pnpm install
```

### Ejecución

```bash
# Desarrollo
pnpm run dev

# Build
pnpm run build

# Produccion
pnpm run start
```

El frontend arranca en `http://localhost:3001`.

### Estructura de Rutas

| Ruta | Archivo | Descripción |
|------|---------|-------------|
| `/` | `app/page.tsx` | Página de login |
| `/unauthorized` | `app/unauthorized/page.tsx` | Acceso no autorizado |
| `/dashboard` | `app/dashboard/page.tsx` | Panel principal |
| `/dashboard/users` | `app/dashboard/users/page.tsx` | Lista de usuarios |
| `/dashboard/users/:id` | `app/dashboard/users/[id]/page.tsx` | Info del usuario |
| `/dashboard/users/:id/edit` | `app/dashboard/users/[id]/edit/page.tsx` | Editar usuario |
| `/dashboard/users/:id/roles` | `app/dashboard/users/[id]/roles/page.tsx` | Gestionar roles |

### Sistema de Autenticación

```
1. Usuario ingresa credenciales en /login
         │
         ▼
2. POST /api/v1/auth/login → Backend valida con bcrypt
         │
         ▼
3. Backend retorna JWT (1 hora de expiración)
         │
         ▼
4. Frontend guarda JWT en httpOnly cookie (server action)
         │
         ▼
5. Proxy middleware (/proxy.tsx) protege rutas /dashboard/*
         │
         ▼
6. Tokens decodificados en Zustand store para permisos UI
```

### Sistema de Permisos (RBAC)

| Módulo | Permiso | Descripción |
|--------|---------|-------------|
| `users` | `users_view` | Ver lista de usuarios |
| `users` | `users_create` | Crear nuevos usuarios |
| `users` | `users_edit` | Editar usuarios existentes |
| `users` | `users_delete` | Eliminar usuarios |
| `admin` | `admin_create` | Acciones de administración |

---