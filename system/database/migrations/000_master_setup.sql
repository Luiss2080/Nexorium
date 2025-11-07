-- NEXORIUM DATABASE SETUP
-- Archivo maestro para crear toda la base de datos
-- Ejecutar: source C:/xampp/htdocs/Nexorium/system/database/migrations/000_master_setup.sql;

-- Crear base de datos
CREATE DATABASE IF NOT EXISTS nexorium_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE nexorium_db;

-- Ejecutar migraciones en orden correcto (segun dependencias FK/PK)
source 001_create_roles.sql;
source 002_create_usuarios.sql;
source 003_create_perfiles.sql;
source 004_create_permisos.sql;
source 005_create_rol_permisos.sql;
source 006_create_permisos_usuario.sql;
source 007_create_categorias_cursos.sql;
source 008_create_cursos.sql;
source 009_create_modulos.sql;
source 010_create_materiales.sql;
source 011_create_inscripciones.sql;
source 012_create_asistencias.sql;
source 013_create_material_progreso.sql;
source 014_create_configuraciones.sql;
source 015_create_sesiones.sql;
source 016_create_logs.sql;

-- Ejecutar seeds con datos iniciales (mismo orden)
source ../seeds/001_create_roles.sql;
source ../seeds/002_create_usuarios.sql;
source ../seeds/003_create_perfiles.sql;
source ../seeds/004_create_permisos.sql;
source ../seeds/005_create_rol_permisos.sql;
source ../seeds/006_create_permisos_usuario.sql;
source ../seeds/007_create_categorias_cursos.sql;
source ../seeds/008_create_cursos.sql;
source ../seeds/009_create_modulos.sql;
source ../seeds/010_create_materiales.sql;
source ../seeds/011_create_inscripciones.sql;
source ../seeds/012_create_asistencias.sql;
source ../seeds/013_create_material_progreso.sql;
source ../seeds/014_create_configuraciones.sql;
source ../seeds/015_create_sesiones.sql;
source ../seeds/016_create_logs.sql;

SELECT 'Base de datos Nexorium creada exitosamente!' as Resultado;