-- Migracion: 010_create_materiales.sql
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