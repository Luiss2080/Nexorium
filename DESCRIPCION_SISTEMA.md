# NEXORIUM Trading Academy - Descripción del Sistema

## 📋 Resumen General

**NEXORIUM Trading Academy** es una plataforma educativa híbrida que combina un **frontend moderno en React** para el sitio web público con un **backend robusto en PHP** para el sistema de gestión académica. La plataforma está diseñada para ofrecer cursos de trading de manera profesional y escalable.

## 🏗️ Arquitectura del Sistema

### Estructura de Doble Aplicación

El proyecto está dividido en **dos aplicaciones principales**:

1. **Website Frontend (React + Vite)** - Sitio web público
2. **System Backend (PHP MVC)** - Sistema de gestión académica

```
Nexorium/
├── 🌐 Website/          # Frontend público (React)
├── ⚙️  System/           # Backend académico (PHP)
├── 🔗 index.php         # Punto de entrada principal
└── 📦 package.json      # Scripts de conveniencia
```

---

## 🌐 Frontend - Website (React)

### **Propósito**

Sitio web público e institucional para promocionar la academia, mostrar cursos disponibles y captar nuevos estudiantes.

### **Tecnologías**

- **React 18** - Framework principal
- **Vite** - Herramienta de desarrollo y build
- **React Router DOM** - Enrutamiento
- **Framer Motion** - Animaciones
- **Lucide React** - Iconografía

### **Estructura**

```
website/
├── src/
│   ├── App.jsx              # Componente principal
│   ├── main.jsx            # Punto de entrada React
│   ├── components/         # Componentes reutilizables
│   ├── layouts/           # Layouts (header, footer)
│   └── pages/             # Páginas principales
│       ├── Home.jsx       # Página de inicio
│       ├── Cursos.jsx     # Catálogo de cursos
│       ├── Academia.jsx   # Información de la academia
│       ├── Nosotros.jsx   # Sobre nosotros
│       ├── Señales.jsx    # Señales de trading
│       └── Contacto.jsx   # Contacto
├── public/               # Archivos estáticos
│   ├── css/             # Estilos CSS
│   ├── images/          # Imágenes
│   └── javaScript/      # Scripts JS vanilla
└── package.json         # Configuración de dependencias
```

### **Características**

- ✅ **Single Page Application (SPA)**
- ✅ **Diseño responsivo**
- ✅ **Animaciones fluidas**
- ✅ **Optimizado para SEO**
- ✅ **Hot reload en desarrollo**

### **URLs de Acceso**

- **Desarrollo**: `http://localhost:3000/`
- **Producción**: `http://localhost/Nexorium/website/`

---

## ⚙️ Backend - System (PHP MVC)

### **Propósito**

Sistema de gestión académica completo para administrar usuarios, cursos, materiales educativos, asistencias y reportes.

### **Arquitectura MVC**

```
system/
├── app/
│   ├── controllers/     # Controladores (lógica de negocio)
│   ├── models/         # Modelos (acceso a datos)
│   ├── views/          # Vistas (interfaz de usuario)
│   ├── core/           # Núcleo del framework
│   ├── auth/           # Sistema de autenticación
│   ├── helpers/        # Funciones auxiliares
│   └── middlewares/    # Middlewares de validación
├── config/            # Configuraciones
├── database/          # Migraciones y seeds
├── public/           # Assets públicos del sistema
├── routes/           # Definición de rutas
└── storage/          # Archivos subidos y logs
```

### **Controladores Principales**

#### 🔐 **AuthController**

- Gestión de login, logout, registro
- Recuperación de contraseñas
- Validación de sesiones

#### 👨‍💼 **AdminController**

- Panel de administración completo
- Gestión de usuarios y roles
- Configuración del sistema
- Reportes y estadísticas

#### 🎓 **CapacitadorController**

- Dashboard del instructor
- Gestión de cursos asignados
- Subida de materiales
- Registro de asistencias

#### 📚 **EstudianteController**

- Dashboard del estudiante
- Acceso a cursos inscritos
- Descarga de materiales
- Seguimiento de progreso

#### 📋 **CursoController**

- CRUD de cursos
- Gestión de módulos
- Inscripciones y matrículas

### **Modelos de Datos**

```php
// Principales entidades del sistema
├── Usuario.php          # Usuarios del sistema
├── Rol.php             # Roles (Admin, Capacitador, Estudiante)
├── Curso.php           # Cursos disponibles
├── Modulo.php          # Módulos de cursos
├── Material.php        # Materiales educativos
├── Inscripcion.php     # Inscripciones de estudiantes
├── Asistencia.php      # Control de asistencias
├── Permiso.php         # Sistema de permisos
└── Configuracion.php   # Configuraciones del sistema
```

### **Sistema de Roles**

#### 🛡️ **Administrador**

- Control total del sistema
- Gestión de usuarios y permisos
- Configuración global
- Reportes completos

#### 🎓 **Capacitador**

- Gestión de cursos asignados
- Subida de materiales
- Control de asistencias
- Seguimiento de estudiantes

#### 📚 **Estudiante**

- Acceso a cursos inscritos
- Descarga de materiales
- Visualización de progreso
- Interacción con contenido

---

## 🔗 Conexión entre Frontend y Backend

### **Punto de Entrada Principal (`index.php`)**

El archivo `index.php` en la raíz actúa como **dispatcher inteligente**:

```php
// Lógica de redirección automática
if (isDevServerRunning()) {
    // En desarrollo -> React dev server
    redirect('http://localhost:3000/');
} else {
    // En producción -> React build estático
    redirect('/Nexorium/website/');
}
```

### **Flujo de Navegación**

```mermaid
graph TD
    A[Usuario accede a /Nexorium/] --> B[index.php]
    B --> C{¿Dev server activo?}
    C -->|Sí| D[React Dev Server :3000]
    C -->|No| E[React Build Estático]
    D --> F[Website Público]
    E --> F
    F --> G[Botón 'Acceder al Sistema']
    G --> H[/system/auth/login]
    H --> I[Dashboard según rol]
```

### **Integración de APIs**

El frontend React puede consumir APIs del backend PHP mediante:

```javascript
// Ejemplo de integración
const API_BASE = "http://localhost/Nexorium/system/api/";

// Obtener cursos disponibles
const fetchCursos = async () => {
  const response = await fetch(`${API_BASE}cursos`);
  return response.json();
};

// Autenticación
const login = async (credentials) => {
  const response = await fetch(`${API_BASE}auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return response.json();
};
```

---

## 🛠️ Configuración y Despliegue

### **Configuración de Base de Datos**

```php
// system/config/config.php
define('DB_HOST', 'localhost');
define('DB_NAME', 'nexorium_db');
define('DB_USER', 'root');
define('DB_PASS', '');
```

### **Comandos de Desarrollo**

```bash
# Iniciar servidor React
cd website/
npm run dev

# O desde la raíz
npm run dev

# O usando el script de Windows
start-dev.bat
```

### **URLs del Sistema**

| Componente      | URL Desarrollo                              | URL Producción                              |
| --------------- | ------------------------------------------- | ------------------------------------------- |
| Website (React) | `localhost:3000`                            | `localhost/Nexorium/website/`               |
| System Login    | `localhost/Nexorium/system/auth/login`      | `localhost/Nexorium/system/auth/login`      |
| Admin Panel     | `localhost/Nexorium/system/admin/dashboard` | `localhost/Nexorium/system/admin/dashboard` |

---

## 📁 Gestión de Archivos

### **Estructura de Storage**

```
system/storage/
├── logs/              # Logs del sistema
├── uploads/
│   ├── courses/       # Materiales de cursos
│   └── profiles/      # Fotos de perfil
└── temp/             # Archivos temporales
```

### **Configuración de Subidas**

```php
// Límites de archivos
define('MAX_FILE_SIZE', 10 * 1024 * 1024); // 10MB
define('ALLOWED_EXTENSIONS', ['pdf', 'doc', 'docx', 'ppt', 'pptx']);
```

---

## 🔐 Seguridad

### **Características de Seguridad**

- ✅ **Autenticación basada en sesiones**
- ✅ **Sistema de roles y permisos**
- ✅ **Validación de inputs**
- ✅ **Protección CSRF**
- ✅ **Sanitización de archivos**
- ✅ **Logs de auditoría**

### **Middleware de Autenticación**

```php
// Verificación automática en rutas protegidas
if (!Auth::check()) {
    redirect('/auth/login');
}

// Verificación de permisos
if (!Auth::hasPermission('admin.users.view')) {
    throw new UnauthorizedException();
}
```

---

## 🚀 Escalabilidad y Futuro

### **Características Escalables**

- **Modular**: Fácil agregar nuevos módulos
- **API-Ready**: Backend preparado para APIs REST
- **Responsive**: Frontend adaptable a dispositivos
- **Configurable**: Sistema de configuraciones flexible

### **Posibles Expansiones**

- 📱 Aplicación móvil (React Native)
- 🔌 Integraciones con plataformas de pago
- 📊 Analytics avanzados
- 🎥 Sistema de videoconferencias
- 📧 Notificaciones por email
- 🔔 Notificaciones push

---

## 📞 Soporte y Mantenimiento

### **Logs del Sistema**

Los logs se almacenan en `system/storage/logs/` con información detallada de:

- Errores del sistema
- Accesos de usuarios
- Operaciones administrativas
- Subida de archivos

### **Base de Datos**

Las migraciones están en `system/database/migrations/` para facilitar actualizaciones y cambios estructurales.

---

**NEXORIUM Trading Academy** representa una solución educativa moderna, escalable y profesional, combinando lo mejor de las tecnologías web actuales para ofrecer una experiencia de aprendizaje excepcional.
