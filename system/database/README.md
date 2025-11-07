# Base de Datos Nexorium - Migraciones y Seeds

## 📁 Estructura de Archivos

### Migraciones (`migrations/`)

Cada archivo contiene la definición de una tabla específica:

- `000_master_setup.sql` - Archivo maestro que ejecuta todo
- `001_create_roles.sql` - Tabla de roles
- `002_create_usuarios.sql` - Tabla de usuarios
- `003_create_perfiles.sql` - Tabla de perfiles de usuario
- `004_create_permisos.sql` - Tabla de permisos
- `005_create_rol_permisos.sql` - Relación roles-permisos
- `006_create_permisos_usuario.sql` - Permisos específicos de usuario
- `007_create_categorias_cursos.sql` - Categorías de cursos
- `008_create_cursos.sql` - Tabla de cursos
- `009_create_modulos.sql` - Módulos de cursos
- `010_create_materiales.sql` - Materiales educativos
- `011_create_inscripciones.sql` - Inscripciones de estudiantes
- `012_create_asistencias.sql` - Registro de asistencias
- `013_create_material_progreso.sql` - Progreso en materiales
- `014_create_configuraciones.sql` - Configuraciones del sistema
- `015_create_sesiones.sql` - Sesiones de usuario
- `016_create_logs.sql` - Logs del sistema

### Seeds (`seeds/`)

Cada archivo contiene datos iniciales numerados igual que las migraciones:

- `001_create_roles.sql` - Roles básicos del sistema
- `002_create_usuarios.sql` - Usuario administrador inicial
- `003_create_perfiles.sql` - Perfiles de usuarios de ejemplo
- `004_create_permisos.sql` - Permisos del sistema
- `005_create_rol_permisos.sql` - Asignación de permisos a roles
- `006_create_permisos_usuario.sql` - Permisos específicos (vacío)
- `007_create_categorias_cursos.sql` - Categorías de trading
- `008_create_cursos.sql` - Cursos de ejemplo
- `009_create_modulos.sql` - Módulos de ejemplo
- `010_create_materiales.sql` - Materiales (vacío inicialmente)
- `011_create_inscripciones.sql` - Inscripciones de ejemplo
- `012_create_asistencias.sql` - Asistencias (vacío inicialmente)
- `013_create_material_progreso.sql` - Progreso (vacío inicialmente)
- `014_create_configuraciones.sql` - Configuraciones del sistema
- `015_create_sesiones.sql` - Sesiones (vacío, se crean automáticamente)
- `016_create_logs.sql` - Logs (vacío, se generan automáticamente)

## 🚀 Instalación

### ⭐ **Opción 1: phpMyAdmin (RECOMENDADA para XAMPP)**

**Archivo listo para usar:** `nexorium_complete_setup.sql`

1. Abrir phpMyAdmin: `http://localhost/phpmyadmin`
2. Clic en pestaña **"SQL"**
3. Copiar contenido completo de `nexorium_complete_setup.sql`
4. Pegar en phpMyAdmin y ejecutar
5. ✅ ¡Base de datos creada con todos los datos!

📖 **Guía detallada:** Ver `INSTALACION_PHPMYADMIN.md`

### Opción 2: Línea de comandos MySQL

```bash
# En terminal (si tienes MySQL en PATH):
mysql -u root -p < C:/xampp/htdocs/Nexorium/system/database/nexorium_complete_setup.sql
```

### Opción 2: Ejecución Manual

1. Crear la base de datos:

```sql
CREATE DATABASE IF NOT EXISTS nexorium_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE nexorium_db;
```

2. Ejecutar migraciones en orden (001 al 016)
3. Ejecutar seeds con datos iniciales

### Opción 3: Usar el archivo original

```sql
source C:/xampp/htdocs/Nexorium/system/database/migrations/create_database.sql;
```

## 👤 Credenciales Iniciales

**Administrador:**

- Email: `admin@nexorium.com`
- Contraseña: `admin123`

**Instructor:**

- Email: `instructor@nexorium.com`
- Contraseña: `admin123`

**Estudiante:**

- Email: `maria@estudiante.com`
- Contraseña: `admin123`

⚠️ **IMPORTANTE**: Cambiar estas contraseñas inmediatamente en producción.

## 📊 Tablas Principales

### Sistema de Usuarios

- `roles` - Roles del sistema (admin, capacitador, estudiante)
- `usuarios` - Información básica de usuarios
- `perfiles` - Información extendida de usuarios
- `permisos` - Permisos granulares del sistema
- `rol_permisos` - Asignación de permisos a roles
- `permisos_usuario` - Permisos específicos por usuario

### Sistema de Cursos

- `categorias_cursos` - Categorización de cursos
- `cursos` - Información de cursos
- `modulos` - Módulos dentro de cada curso
- `materiales` - Archivos y recursos educativos
- `inscripciones` - Inscripciones de estudiantes
- `asistencias` - Registro de asistencias

### Sistema de Seguimiento

- `material_progreso` - Progreso en materiales
- `sesiones` - Sesiones activas de usuarios
- `logs` - Auditoría del sistema
- `configuraciones` - Configuraciones del sistema

## 🔧 Mantenimiento

### Agregar Nueva Migración

1. Crear archivo `017_nueva_tabla.sql`
2. Definir la estructura de la tabla
3. Crear el seed correspondiente `nueva_tabla_seed.sql`
4. Actualizar el archivo maestro si es necesario

### Modificar Tabla Existente

1. Crear archivo `018_alter_tabla.sql`
2. Usar comandos `ALTER TABLE`
3. Documentar los cambios

## 📈 Características de la Base de Datos

- ✅ **Claves foráneas** con integridad referencial
- ✅ **Índices optimizados** para consultas frecuentes
- ✅ **Campos de auditoría** (created_at, updated_at)
- ✅ **Soft deletes** donde es apropiado
- ✅ **Validaciones a nivel de BD** (ENUM, CHECK)
- ✅ **UTF8MB4** para soporte completo de Unicode
- ✅ **Normalización adecuada** para evitar redundancia

## 🔒 Seguridad

- Contraseñas hasheadas con `password_hash()`
- Tokens de recuperación para reset de contraseñas
- Sistema de permisos granular
- Logs de auditoría para acciones críticas
- Validación de tipos de archivo en materiales
