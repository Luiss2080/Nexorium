-- Seed: 009_create_modulos.sql
-- Datos iniciales para la tabla modulos

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