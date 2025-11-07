-- Migracion: 008_create_cursos.sql
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