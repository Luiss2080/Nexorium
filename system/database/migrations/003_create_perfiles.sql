-- Migracion: 003_create_perfiles.sql
-- Tabla de perfiles (informacion extendida de usuarios)

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