-- Migracion: 013_create_material_progreso.sql
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