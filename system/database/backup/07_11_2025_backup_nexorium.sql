-- =======================================================
-- NEXORIUM DATABASE SETUP - COMPLETO PARA PHPMYADMIN
-- =======================================================
-- Ejecutar este archivo completo en phpMyAdmin
-- 
-- INSTRUCCIONES:
-- 1. Abrir phpMyAdmin (http://localhost/phpmyadmin)
-- 2. Clic en "Importar" o "SQL"
-- 3. Copiar y pegar todo este contenido
-- 4. Ejecutar
-- =======================================================

-- Crear base de datos
CREATE DATABASE IF NOT EXISTS nexorium_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE nexorium_db;

-- =======================================================
-- MIGRACIONES - CREAR TABLAS
-- =======================================================

-- 001_create_roles.sql
CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 002_create_usuarios.sql
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    direccion TEXT,
    fecha_nacimiento DATE,
    avatar VARCHAR(255),
    rol_id INT NOT NULL,
    estado ENUM('activo', 'inactivo', 'pendiente') DEFAULT 'activo',
    ultimo_acceso TIMESTAMP NULL,
    token_recuperacion VARCHAR(255) NULL,
    token_expiracion TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (rol_id) REFERENCES roles(id) ON DELETE RESTRICT,
    INDEX idx_email (email),
    INDEX idx_rol (rol_id),
    INDEX idx_estado (estado)
);

-- 003_create_perfiles.sql
CREATE TABLE perfiles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL UNIQUE,
    biografia TEXT,
    especialidades TEXT,
    experiencia TEXT,
    educacion TEXT,
    certificaciones TEXT,
    linkedin VARCHAR(255),
    website VARCHAR(255),
    telefono_alternativo VARCHAR(20),
    direccion_completa TEXT,
    ciudad VARCHAR(100),
    pais VARCHAR(100),
    genero ENUM('masculino', 'femenino', 'otro', 'no_especificar'),
    slug VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    INDEX idx_slug (slug)
);

-- 004_create_permisos.sql
CREATE TABLE permisos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    modulo VARCHAR(50) NOT NULL,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_modulo (modulo)
);

-- 005_create_rol_permisos.sql
CREATE TABLE rol_permisos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    rol_id INT NOT NULL,
    permiso_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rol_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permiso_id) REFERENCES permisos(id) ON DELETE CASCADE,
    UNIQUE KEY unique_rol_permiso (rol_id, permiso_id)
);

-- 006_create_permisos_usuario.sql
CREATE TABLE permisos_usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    permiso_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (permiso_id) REFERENCES permisos(id) ON DELETE CASCADE,
    UNIQUE KEY unique_usuario_permiso (usuario_id, permiso_id)
);

-- 007_create_categorias_cursos.sql
CREATE TABLE categorias_cursos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    imagen VARCHAR(255),
    orden INT DEFAULT 0,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_orden (orden),
    INDEX idx_estado (estado)
);

-- 008_create_cursos.sql
CREATE TABLE cursos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    objetivos TEXT,
    duracion_horas INT NOT NULL,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME NOT NULL,
    capacitador_id INT NOT NULL,
    categoria_id INT NULL,
    max_estudiantes INT DEFAULT 30,
    precio DECIMAL(10,2) DEFAULT 0.00,
    imagen VARCHAR(255),
    estado ENUM('activo', 'inactivo', 'finalizado', 'cancelado') DEFAULT 'activo',
    slug VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (capacitador_id) REFERENCES usuarios(id) ON DELETE RESTRICT,
    FOREIGN KEY (categoria_id) REFERENCES categorias_cursos(id) ON DELETE SET NULL,
    INDEX idx_capacitador (capacitador_id),
    INDEX idx_categoria (categoria_id),
    INDEX idx_estado (estado),
    INDEX idx_fechas (fecha_inicio, fecha_fin),
    INDEX idx_slug (slug)
);

-- 009_create_modulos.sql
CREATE TABLE modulos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    objetivos TEXT,
    curso_id INT NOT NULL,
    orden INT NOT NULL,
    duracion_estimada INT DEFAULT 0,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE,
    INDEX idx_curso_orden (curso_id, orden)
);

-- 010_create_materiales.sql
CREATE TABLE materiales (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    tipo ENUM('archivo', 'enlace', 'video', 'presentacion') NOT NULL,
    archivo VARCHAR(255) NULL,
    url TEXT NULL,
    curso_id INT NOT NULL,
    modulo_id INT NULL,
    orden INT DEFAULT 0,
    es_publico BOOLEAN DEFAULT FALSE,
    tamano_archivo INT DEFAULT 0,
    tipo_mime VARCHAR(100),
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE,
    FOREIGN KEY (modulo_id) REFERENCES modulos(id) ON DELETE SET NULL,
    INDEX idx_curso (curso_id),
    INDEX idx_modulo_orden (modulo_id, orden),
    INDEX idx_tipo (tipo)
);

-- 011_create_inscripciones.sql
CREATE TABLE inscripciones (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    curso_id INT NOT NULL,
    fecha_inscripcion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_completacion TIMESTAMP NULL,
    fecha_cancelacion TIMESTAMP NULL,
    estado ENUM('activa', 'completada', 'cancelada', 'suspendida') DEFAULT 'activa',
    nota_final DECIMAL(5,2) NULL,
    certificado VARCHAR(255) NULL,
    comentarios TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE,
    UNIQUE KEY unique_usuario_curso (usuario_id, curso_id),
    INDEX idx_estado (estado),
    INDEX idx_fecha_inscripcion (fecha_inscripcion)
);

-- 012_create_asistencias.sql
CREATE TABLE asistencias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    curso_id INT NOT NULL,
    fecha DATE NOT NULL,
    estado ENUM('presente', 'ausente', 'tardanza', 'justificado') NOT NULL,
    hora_entrada TIME NULL,
    hora_salida TIME NULL,
    observaciones TEXT,
    registrado_por INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE,
    FOREIGN KEY (registrado_por) REFERENCES usuarios(id) ON DELETE SET NULL,
    UNIQUE KEY unique_usuario_curso_fecha (usuario_id, curso_id, fecha),
    INDEX idx_curso_fecha (curso_id, fecha),
    INDEX idx_estado (estado)
);

-- 013_create_material_progreso.sql
CREATE TABLE material_progreso (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    material_id INT NOT NULL,
    visto BOOLEAN DEFAULT FALSE,
    tiempo_visto INT DEFAULT 0,
    completado BOOLEAN DEFAULT FALSE,
    fecha_vista TIMESTAMP NULL,
    fecha_completado TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (material_id) REFERENCES materiales(id) ON DELETE CASCADE,
    UNIQUE KEY unique_usuario_material (usuario_id, material_id)
);

-- 014_create_configuraciones.sql
CREATE TABLE configuraciones (
    id INT PRIMARY KEY AUTO_INCREMENT,
    clave VARCHAR(100) NOT NULL UNIQUE,
    valor TEXT,
    descripcion TEXT,
    tipo ENUM('string', 'number', 'boolean', 'text', 'email', 'url', 'file', 'password') DEFAULT 'string',
    categoria VARCHAR(50) DEFAULT 'general',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_categoria (categoria)
);

-- 015_create_sesiones.sql
CREATE TABLE sesiones (
    id VARCHAR(255) PRIMARY KEY,
    usuario_id INT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    payload LONGTEXT,
    last_activity INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    INDEX idx_usuario (usuario_id),
    INDEX idx_last_activity (last_activity)
);

-- 016_create_logs.sql
CREATE TABLE logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NULL,
    accion VARCHAR(100) NOT NULL,
    tabla_afectada VARCHAR(50),
    registro_id INT NULL,
    datos_anteriores JSON NULL,
    datos_nuevos JSON NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
    INDEX idx_usuario (usuario_id),
    INDEX idx_accion (accion),
    INDEX idx_tabla (tabla_afectada),
    INDEX idx_fecha (created_at)
);

-- =======================================================
-- SEEDS - INSERTAR DATOS INICIALES
-- =======================================================

-- 001_create_roles.sql - Seeds
INSERT INTO roles (nombre, descripcion) VALUES
('admin', 'Administrador del sistema con acceso completo'),
('capacitador', 'Instructor que puede crear y gestionar cursos'),
('estudiante', 'Usuario que puede inscribirse y tomar cursos');

-- 002_create_usuarios.sql - Seeds
INSERT INTO usuarios (nombre, apellido, email, password, rol_id, estado) VALUES
('Administrador', 'Sistema', 'admin@nexorium.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1, 'activo'),
('Juan Carlos', 'Perez', 'instructor@nexorium.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2, 'activo'),
('Maria Elena', 'Garcia', 'maria@estudiante.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 3, 'activo');

-- 003_create_perfiles.sql - Seeds
INSERT INTO perfiles (usuario_id, biografia, especialidades, experiencia, educacion, slug) VALUES
(1, 'Administrador del sistema Nexorium', 'Administracion, Gestion de sistemas', '10 anos en administracion de plataformas educativas', 'Ingeniero en Sistemas', 'administrador-sistema'),
(2, 'Instructor experto en trading con mas de 15 anos de experiencia', 'Trading, Analisis tecnico, Forex', '15 anos como trader profesional', 'Economista, MBA en Finanzas', 'juan-carlos-perez'),
(3, 'Estudiante entusiasta del trading', 'Principiante en trading', 'Nuevo en el mundo del trading', 'Licenciatura en Administracion', 'maria-elena-garcia');

-- 004_create_permisos.sql - Seeds
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

-- 005_create_rol_permisos.sql - Seeds
-- Permisos para rol Admin (ID: 1) - Todos los permisos
INSERT INTO rol_permisos (rol_id, permiso_id) VALUES
-- Permisos de usuarios (1-4)
(1, 1), (1, 2), (1, 3), (1, 4),
-- Permisos de cursos (5-9) 
(1, 5), (1, 6), (1, 7), (1, 8), (1, 9),
-- Permisos de materiales (10-13)
(1, 10), (1, 11), (1, 12), (1, 13),
-- Permisos de asistencias (14-16)
(1, 14), (1, 15), (1, 16),
-- Permisos de reportes (17-18)
(1, 17), (1, 18),
-- Permisos de configuracion (19-20)
(1, 19), (1, 20),
-- Permisos de permisos (21-22)
(1, 21), (1, 22);

-- Permisos para rol Capacitador (ID: 2)
INSERT INTO rol_permisos (rol_id, permiso_id) VALUES
-- Gestion de cursos asignados
(2, 9),
-- Gestion de materiales
(2, 11), (2, 12),
-- Registro de asistencias
(2, 14), (2, 15),
-- Reportes de cursos
(2, 18);

-- Permisos para rol Estudiante (ID: 3)
INSERT INTO rol_permisos (rol_id, permiso_id) VALUES
-- Descargar materiales
(3, 13);

-- 007_create_categorias_cursos.sql - Seeds
INSERT INTO categorias_cursos (nombre, descripcion, orden) VALUES
('Trading Basico', 'Conceptos fundamentales del trading y mercados financieros', 1),
('Trading Avanzado', 'Estrategias y tecnicas avanzadas de trading', 2),
('Analisis Tecnico', 'Herramientas y metodos de analisis tecnico', 3),
('Analisis Fundamental', 'Analisis economico y financiero de activos', 4),
('Gestion de Riesgo', 'Manejo del riesgo y money management', 5),
('Psicologia del Trading', 'Aspectos psicologicos y emocionales del trading', 6),
('Criptomonedas', 'Trading de monedas digitales y blockchain', 7),
('Forex', 'Mercado de divisas y pares de monedas', 8),
('Acciones', 'Trading de acciones y mercado bursatil', 9),
('Commodities', 'Trading de materias primas', 10);

-- 008_create_cursos.sql - Seeds
INSERT INTO cursos (titulo, descripcion, objetivos, duracion_horas, fecha_inicio, fecha_fin, capacitador_id, categoria_id, max_estudiantes, precio, estado, slug) VALUES
('Introduccion al Trading', 
 'Curso basico para comenzar en el mundo del trading', 
 'Aprender conceptos basicos, tipos de mercados, y primeros pasos en trading',
 40, 
 '2024-01-15 09:00:00', 
 '2024-03-15 18:00:00', 
 2, 1, 25, 299.99, 'activo', 'introduccion-al-trading'),

('Analisis Tecnico Avanzado', 
 'Curso especializado en analisis tecnico y patrones de precio', 
 'Dominar herramientas de analisis tecnico, patrones chartistas e indicadores',
 60, 
 '2024-02-01 10:00:00', 
 '2024-04-30 17:00:00', 
 2, 3, 20, 499.99, 'activo', 'analisis-tecnico-avanzado'),

('Forex para Principiantes', 
 'Aprende a operar en el mercado de divisas desde cero', 
 'Entender el mercado forex, pares de divisas y estrategias basicas',
 35, 
 '2024-01-20 08:00:00', 
 '2024-03-20 16:00:00', 
 2, 8, 30, 349.99, 'activo', 'forex-principiantes');

-- 009_create_modulos.sql - Seeds
INSERT INTO modulos (titulo, descripcion, objetivos, curso_id, orden, duracion_estimada) VALUES
-- Modulos para curso "Introduccion al Trading" (ID: 1)
('Que es el Trading?', 'Conceptos basicos y definiciones', 'Entender que es el trading y los mercados financieros', 1, 1, 4),
('Tipos de Mercados', 'Forex, Acciones, Commodities, Criptomonedas', 'Conocer los diferentes mercados disponibles', 1, 2, 6),
('Analisis Basico', 'Introduccion al analisis tecnico y fundamental', 'Aprender los fundamentos del analisis', 1, 3, 8),
('Gestion de Capital', 'Money management y gestion de riesgo basica', 'Entender la importancia de la gestion de capital', 1, 4, 6),
('Primera Operacion', 'Simulador y practica', 'Realizar las primeras operaciones en simulador', 1, 5, 8),

-- Modulos para curso "Analisis Tecnico Avanzado" (ID: 2)
('Patrones Chartistas', 'Patrones de continuacion y reversion', 'Identificar y operar patrones chartistas', 2, 1, 10),
('Indicadores Tecnicos', 'RSI, MACD, Medias Moviles, Bollinger Bands', 'Dominar el uso de indicadores tecnicos', 2, 2, 12),
('Fibonacci y Retrocesos', 'Niveles de Fibonacci y su aplicacion', 'Usar Fibonacci para encontrar niveles clave', 2, 3, 8),
('Ondas de Elliott', 'Teoria de ondas y conteo', 'Aplicar la teoria de ondas de Elliott', 2, 4, 10),
('Estrategias Avanzadas', 'Combinacion de herramientas tecnicas', 'Crear estrategias de trading efectivas', 2, 5, 12),

-- Modulos para curso "Forex para Principiantes" (ID: 3)
('El Mercado Forex', 'Caracteristicas y horarios del forex', 'Entender el funcionamiento del mercado forex', 3, 1, 5),
('Pares de Divisas', 'Mayores, menores y exoticos', 'Conocer los diferentes pares de divisas', 3, 2, 6),
('Spreads y Comisiones', 'Costos de operacion en forex', 'Entender los costos asociados al trading', 3, 3, 4),
('Apalancamiento', 'Uso del apalancamiento y sus riesgos', 'Comprender el apalancamiento y su gestion', 3, 4, 6),
('Estrategias Forex', 'Estrategias especificas para forex', 'Implementar estrategias efectivas en forex', 3, 5, 8);

-- 010_create_materiales.sql - Seeds
-- No hay datos iniciales necesarios para esta tabla
-- Los materiales se subiran cuando los capacitadores creen contenido

-- 011_create_inscripciones.sql - Seeds
INSERT INTO inscripciones (usuario_id, curso_id, fecha_inscripcion, estado) VALUES
-- Maria Garcia inscrita en cursos
(3, 1, '2024-01-10 14:30:00', 'activa'),
(3, 3, '2024-01-18 16:45:00', 'activa');

-- 012_create_asistencias.sql - Seeds
-- No hay datos iniciales necesarios para esta tabla
-- Las asistencias se registraran durante el desarrollo de los cursos

-- 013_create_material_progreso.sql - Seeds
-- No hay datos iniciales necesarios para esta tabla
-- El progreso se registrara cuando los estudiantes interactuen con los materiales

-- 014_create_configuraciones.sql - Seeds
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

-- 015_create_sesiones.sql - Seeds
-- No hay datos iniciales necesarios para esta tabla
-- Las sesiones se crearan automaticamente cuando los usuarios inicien sesion

-- 016_create_logs.sql - Seeds
-- No hay datos iniciales necesarios para esta tabla
-- Los logs se generaran automaticamente durante el uso del sistema

-- =======================================================
-- VERIFICACION FINAL
-- =======================================================

-- Mostrar resumen de tablas creadas
SELECT 
    TABLE_NAME as 'Tabla Creada',
    TABLE_ROWS as 'Filas'
FROM information_schema.TABLES 
WHERE TABLE_SCHEMA = 'nexorium_db' 
ORDER BY TABLE_NAME;

-- Mostrar usuarios creados
SELECT id, nombre, apellido, email, 
       (SELECT nombre FROM roles WHERE id = usuarios.rol_id) as rol
FROM usuarios;

-- Mostrar cursos creados  
SELECT id, titulo, 
       (SELECT nombre FROM categorias_cursos WHERE id = cursos.categoria_id) as categoria,
       precio, estado
FROM cursos;

SELECT 'Base de datos Nexorium creada exitosamente!' as Resultado;