-- Seed: 004_create_permisos.sql
-- Datos iniciales para la tabla permisos

INSERT INTO permisos (nombre, descripcion, modulo) VALUES
-- Permisos de usuarios
('admin.usuarios.ver', 'Ver listado de usuarios', 'usuarios'),
('admin.usuarios.crear', 'Crear nuevos usuarios', 'usuarios'),
('admin.usuarios.editar', 'Editar usuarios existentes', 'usuarios'),
('admin.usuarios.eliminar', 'Eliminar usuarios', 'usuarios'),

-- Permisos de cursos
('admin.cursos.ver', 'Ver listado de cursos', 'cursos'),
('admin.cursos.crear', 'Crear nuevos cursos', 'cursos'),
('admin.cursos.editar', 'Editar cursos existentes', 'cursos'),
('admin.cursos.eliminar', 'Eliminar cursos', 'cursos'),
('capacitador.cursos.gestionar', 'Gestionar cursos asignados', 'cursos'),

-- Permisos de materiales
('admin.materiales.ver', 'Ver todos los materiales', 'materiales'),
('capacitador.materiales.subir', 'Subir materiales', 'materiales'),
('capacitador.materiales.gestionar', 'Gestionar materiales propios', 'materiales'),
('estudiante.materiales.descargar', 'Descargar materiales', 'materiales'),

-- Permisos de asistencias
('capacitador.asistencias.registrar', 'Registrar asistencias', 'asistencias'),
('capacitador.asistencias.ver', 'Ver asistencias de sus cursos', 'asistencias'),
('admin.asistencias.ver', 'Ver todas las asistencias', 'asistencias'),

-- Permisos de reportes
('admin.reportes.ver', 'Ver reportes del sistema', 'reportes'),
('capacitador.reportes.cursos', 'Ver reportes de sus cursos', 'reportes'),

-- Permisos de configuracion
('admin.configuracion.ver', 'Ver configuraciones', 'configuracion'),
('admin.configuracion.editar', 'Editar configuraciones', 'configuracion'),

-- Permisos de permisos
('admin.permisos.ver', 'Ver permisos', 'permisos'),
('admin.permisos.asignar', 'Asignar permisos', 'permisos');