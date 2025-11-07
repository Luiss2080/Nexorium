-- Seed: 005_create_rol_permisos.sql
-- Datos iniciales para la tabla rol_permisos (asignacion de permisos a roles)

-- Permisos para rol Admin (ID: 1) - Todos los permisos
INSERT INTO rol_permisos (rol_id, permiso_id) VALUES
-- Permisos de usuarios
(1, 1), (1, 2), (1, 3), (1, 4),
-- Permisos de cursos
(1, 5), (1, 6), (1, 7), (1, 8),
-- Permisos de materiales
(1, 10),
-- Permisos de asistencias
(1, 15),
-- Permisos de reportes
(1, 16),
-- Permisos de configuracion
(1, 18), (1, 19),
-- Permisos de permisos
(1, 20), (1, 21);

-- Permisos para rol Capacitador (ID: 2)
INSERT INTO rol_permisos (rol_id, permiso_id) VALUES
-- Gestion de cursos asignados
(2, 9),
-- Gestion de materiales
(2, 11), (2, 12),
-- Registro de asistencias
(2, 13), (2, 14),
-- Reportes de cursos
(2, 17);

-- Permisos para rol Estudiante (ID: 3)
INSERT INTO rol_permisos (rol_id, permiso_id) VALUES
-- Descargar materiales
(3, 13);