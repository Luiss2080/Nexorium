-- Base de datos Nexorium
-- Creación de tablas principales

-- Crear base de datos
CREATE DATABASE IF NOT EXISTS nexorium_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE nexorium_db;

-- Tabla de roles
CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de usuarios
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

-- Tabla de perfiles (información extendida de usuarios)
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

-- Tabla de permisos
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

-- Tabla de relación roles-permisos
CREATE TABLE rol_permisos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    rol_id INT NOT NULL,
    permiso_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rol_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permiso_id) REFERENCES permisos(id) ON DELETE CASCADE,
    UNIQUE KEY unique_rol_permiso (rol_id, permiso_id)
);

-- Tabla de permisos específicos de usuario (opcional)
CREATE TABLE permisos_usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    permiso_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (permiso_id) REFERENCES permisos(id) ON DELETE CASCADE,
    UNIQUE KEY unique_usuario_permiso (usuario_id, permiso_id)
);

-- Tabla de cursos
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

-- Tabla de módulos de curso
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

-- Tabla de materiales
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
    tamaño_archivo INT DEFAULT 0,
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

-- Tabla de inscripciones
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

-- Tabla de asistencias
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

-- Tabla de progreso de materiales
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

-- Tabla de configuraciones del sistema
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

-- Tabla de sesiones (opcional, para manejo de sesiones en DB)
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

-- Tabla de logs del sistema
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

-- Tabla de categorías de cursos
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

-- Insertar roles básicos
INSERT INTO roles (nombre, descripcion) VALUES
('admin', 'Administrador del sistema con acceso completo'),
('capacitador', 'Instructor que puede crear y gestionar cursos'),
('estudiante', 'Usuario que puede inscribirse y tomar cursos');

-- Insertar categorías de cursos básicas
INSERT INTO categorias_cursos (nombre, descripcion, orden) VALUES
('Trading Básico', 'Conceptos fundamentales del trading', 1),
('Trading Avanzado', 'Estrategias y técnicas avanzadas', 2),
('Análisis Técnico', 'Herramientas de análisis técnico', 3),
('Análisis Fundamental', 'Análisis económico y financiero', 4),
('Gestión de Riesgo', 'Manejo del riesgo en trading', 5),
('Psicología del Trading', 'Aspectos psicológicos del trading', 6),
('Criptomonedas', 'Trading de monedas digitales', 7),
('Forex', 'Mercado de divisas', 8);

-- Insertar usuario administrador por defecto
-- Contraseña: admin123 (cambiar inmediatamente en producción)
INSERT INTO usuarios (nombre, apellido, email, password, rol_id, estado) VALUES
('Administrador', 'Sistema', 'admin@nexorium.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1, 'activo');

-- Insertar configuraciones básicas
INSERT INTO configuraciones (clave, valor, descripcion, tipo, categoria) VALUES
('sitio.nombre', 'Nexorium', 'Nombre del sitio', 'string', 'sitio'),
('sitio.descripcion', 'Plataforma de capacitación en línea', 'Descripción del sitio', 'text', 'sitio'),
('cursos.max_estudiantes_default', '30', 'Máximo de estudiantes por defecto', 'number', 'cursos'),
('sistema.version', '1.0.0', 'Versión del sistema', 'string', 'sistema'),
('seguridad.password_min_length', '8', 'Longitud mínima de contraseña', 'number', 'seguridad');