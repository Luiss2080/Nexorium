-- Seed: 008_create_cursos.sql
-- Datos iniciales para la tabla cursos

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