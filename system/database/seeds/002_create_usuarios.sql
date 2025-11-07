-- Seed: 002_create_usuarios.sql
-- Datos iniciales para la tabla usuarios

-- Insertar usuario administrador por defecto
-- Contrasena: admin123 (cambiar inmediatamente en produccion)
INSERT INTO usuarios (nombre, apellido, email, password, rol_id, estado) VALUES
('Administrador', 'Sistema', 'admin@nexorium.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1, 'activo'),
('Juan Carlos', 'Perez', 'instructor@nexorium.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2, 'activo'),
('Maria Elena', 'Garcia', 'maria@estudiante.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 3, 'activo');