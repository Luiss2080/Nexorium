<?php

/**
 * Modelo Curso
 */
class Curso extends Model
{
    protected $table = 'cursos';
    protected $fillable = [
        'titulo',
        'descripcion',
        'objetivos',
        'duracion_horas',
        'fecha_inicio',
        'fecha_fin',
        'capacitador_id',
        'max_estudiantes',
        'precio',
        'estado',
        'imagen'
    ];

    public function obtenerConCapacitador($id)
    {
        return $this->db->fetch(
            "SELECT c.*, u.nombre as capacitador_nombre, u.apellido as capacitador_apellido
             FROM cursos c
             LEFT JOIN usuarios u ON c.capacitador_id = u.id
             WHERE c.id = ?",
            [$id]
        );
    }

    public function obtenerTodosConCapacitador()
    {
        return $this->db->fetchAll(
            "SELECT c.*, u.nombre as capacitador_nombre, u.apellido as capacitador_apellido,
                    COUNT(i.id) as total_inscritos
             FROM cursos c
             LEFT JOIN usuarios u ON c.capacitador_id = u.id
             LEFT JOIN inscripciones i ON c.id = i.curso_id AND i.estado = 'activa'
             GROUP BY c.id
             ORDER BY c.fecha_inicio DESC"
        );
    }

    public function obtenerPorCapacitador($capacitadorId)
    {
        return $this->db->fetchAll(
            "SELECT c.*, COUNT(i.id) as total_inscritos
             FROM cursos c
             LEFT JOIN inscripciones i ON c.id = i.curso_id AND i.estado = 'activa'
             WHERE c.capacitador_id = ?
             GROUP BY c.id
             ORDER BY c.fecha_inicio DESC",
            [$capacitadorId]
        );
    }

    public function obtenerDisponibles()
    {
        return $this->db->fetchAll(
            "SELECT c.*, u.nombre as capacitador_nombre, u.apellido as capacitador_apellido,
                    COUNT(i.id) as total_inscritos
             FROM cursos c
             LEFT JOIN usuarios u ON c.capacitador_id = u.id
             LEFT JOIN inscripciones i ON c.id = i.curso_id AND i.estado = 'activa'
             WHERE c.estado = 'activo' AND c.fecha_inicio > NOW()
             GROUP BY c.id
             HAVING total_inscritos < c.max_estudiantes
             ORDER BY c.fecha_inicio ASC"
        );
    }

    public function obtenerEstudiantesInscritos($cursoId)
    {
        return $this->db->fetchAll(
            "SELECT u.*, i.fecha_inscripcion, i.estado as estado_inscripcion
             FROM usuarios u
             INNER JOIN inscripciones i ON u.id = i.usuario_id
             WHERE i.curso_id = ? AND i.estado = 'activa'
             ORDER BY i.fecha_inscripcion ASC",
            [$cursoId]
        );
    }

    public function obtenerModulos($cursoId)
    {
        return $this->db->fetchAll(
            "SELECT * FROM modulos WHERE curso_id = ? ORDER BY orden ASC",
            [$cursoId]
        );
    }

    public function obtenerMateriales($cursoId)
    {
        return $this->db->fetchAll(
            "SELECT m.*, mo.titulo as modulo_titulo
             FROM materiales m
             LEFT JOIN modulos mo ON m.modulo_id = mo.id
             WHERE m.curso_id = ?
             ORDER BY mo.orden ASC, m.orden ASC",
            [$cursoId]
        );
    }

    public function puedeInscribirse($cursoId, $usuarioId)
    {
        // Verificar si el curso está disponible
        $curso = $this->find($cursoId);
        if (!$curso || $curso['estado'] !== 'activo' || $curso['fecha_inicio'] <= date('Y-m-d H:i:s')) {
            return false;
        }

        // Verificar si ya está inscrito
        $inscripcion = $this->db->fetch(
            "SELECT id FROM inscripciones WHERE curso_id = ? AND usuario_id = ? AND estado = 'activa'",
            [$cursoId, $usuarioId]
        );
        if ($inscripcion) {
            return false;
        }

        // Verificar capacidad
        $inscritos = $this->db->fetch(
            "SELECT COUNT(*) as total FROM inscripciones WHERE curso_id = ? AND estado = 'activa'",
            [$cursoId]
        );

        return $inscritos['total'] < $curso['max_estudiantes'];
    }

    public function obtenerEstadisticas()
    {
        return [
            'total' => $this->count(),
            'activos' => $this->count(['estado' => 'activo']),
            'finalizados' => $this->count(['estado' => 'finalizado']),
            'proximos' => $this->db->fetch(
                "SELECT COUNT(*) as count FROM cursos WHERE fecha_inicio > NOW() AND estado = 'activo'"
            )['count'],
            'en_curso' => $this->db->fetch(
                "SELECT COUNT(*) as count FROM cursos WHERE fecha_inicio <= NOW() AND fecha_fin >= NOW() AND estado = 'activo'"
            )['count']
        ];
    }

    public function buscar($termino)
    {
        return $this->db->fetchAll(
            "SELECT c.*, u.nombre as capacitador_nombre, u.apellido as capacitador_apellido
             FROM cursos c
             LEFT JOIN usuarios u ON c.capacitador_id = u.id
             WHERE c.titulo LIKE ? OR c.descripcion LIKE ?
             ORDER BY c.fecha_inicio DESC",
            ["%$termino%", "%$termino%"]
        );
    }
}
