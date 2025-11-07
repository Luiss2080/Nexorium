-- Seed: 014_create_configuraciones.sql
-- Datos iniciales para la tabla configuraciones

INSERT INTO configuraciones (clave, valor, descripcion, tipo, categoria) VALUES
('sitio.nombre', 'Nexorium', 'Nombre del sitio', 'string', 'sitio'),
('sitio.descripcion', 'Plataforma de capacitacion en linea', 'Descripcion del sitio', 'text', 'sitio'),
('sitio.logo', '/assets/images/logo.png', 'Ruta del logo del sitio', 'file', 'sitio'),
('sitio.email', 'contacto@nexorium.com', 'Email de contacto principal', 'email', 'sitio'),
('sitio.telefono', '+1 234 567 8900', 'Telefono de contacto', 'string', 'sitio'),

('cursos.max_estudiantes_default', '30', 'Maximo de estudiantes por defecto', 'number', 'cursos'),
('cursos.duracion_minima', '4', 'Duracion minima de curso en horas', 'number', 'cursos'),
('cursos.precio_minimo', '50.00', 'Precio minimo de curso', 'number', 'cursos'),

('sistema.version', '1.0.0', 'Version del sistema', 'string', 'sistema'),
('sistema.mantenimiento', 'false', 'Modo mantenimiento activado', 'boolean', 'sistema'),
('sistema.timezone', 'America/Mexico_City', 'Zona horaria del sistema', 'string', 'sistema'),

('seguridad.password_min_length', '8', 'Longitud minima de contrasena', 'number', 'seguridad'),
('seguridad.session_timeout', '7200', 'Tiempo de expiracion de sesion en segundos', 'number', 'seguridad'),
('seguridad.max_login_attempts', '5', 'Maximo intentos de login', 'number', 'seguridad'),

('email.smtp_host', 'smtp.gmail.com', 'Servidor SMTP', 'string', 'email'),
('email.smtp_port', '587', 'Puerto SMTP', 'number', 'email'),
('email.smtp_user', '', 'Usuario SMTP', 'email', 'email'),
('email.smtp_password', '', 'Contrasena SMTP', 'password', 'email'),

('archivos.max_size', '10485760', 'Tamano maximo de archivo en bytes (10MB)', 'number', 'archivos'),
('archivos.tipos_permitidos', 'pdf,doc,docx,ppt,pptx,mp4,avi,jpg,png', 'Tipos de archivo permitidos', 'string', 'archivos'),

('notificaciones.email_enabled', 'true', 'Notificaciones por email habilitadas', 'boolean', 'notificaciones'),
('notificaciones.sms_enabled', 'false', 'Notificaciones por SMS habilitadas', 'boolean', 'notificaciones');