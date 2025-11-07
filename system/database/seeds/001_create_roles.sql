-- Seed: 001_create_roles.sql
-- Datos iniciales para la tabla roles

INSERT INTO roles (nombre, descripcion) VALUES
('admin', 'Administrador del sistema con acceso completo'),
('capacitador', 'Instructor que puede crear y gestionar cursos'),
('estudiante', 'Usuario que puede inscribirse y tomar cursos');