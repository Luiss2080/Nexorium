<?php

/**
 * Modelo Inscripcion
 */
class Inscripcion extends Model
{
    protected $table = 'inscripciones';
    protected $fillable = [
        'usuario_id',
        'curso_id',
        'fecha_inscripcion',
        'estado',
        'nota_final',
        'certificado'
    ];

    public function inscribirUsuario($usuarioId, $cursoId)
    {
        // Verificar si puede inscribirse
        $curso = new Curso();
        if (!$curso->puedeInscribirse($cursoId, $usuarioId)) {
            throw new Exception('No se puede inscribir al curso');
        }

        return $this->create([
            'usuario_id' => $usuarioId,
            'curso_id' => $cursoId,
            'fecha_inscripcion' => date('Y-m-d H:i:s'),
            'estado' => 'activa'
        ]);
    }

    public function obtenerPorUsuario($usuarioId)
    {
        return $this->db->fetchAll(
            "SELECT i.*, c.titulo as curso_titulo, c.descripcion as curso_descripcion,
                    c.fecha_inicio, c.fecha_fin, c.duracion_horas,
                    u.nombre as capacitador_nombre, u.apellido as capacitador_apellido
             FROM inscripciones i
             INNER JOIN cursos c ON i.curso_id = c.id
             LEFT JOIN usuarios u ON c.capacitador_id = u.id
             WHERE i.usuario_id = ?
             ORDER BY i.fecha_inscripcion DESC",
            [$usuarioId]
        );
    }

    public function obtenerPorCurso($cursoId)
    {
        return $this->db->fetchAll(
            "SELECT i.*, u.nombre, u.apellido, u.email
             FROM inscripciones i
             INNER JOIN usuarios u ON i.usuario_id = u.id
             WHERE i.curso_id = ? AND i.estado = 'activa'
             ORDER BY i.fecha_inscripcion ASC",
            [$cursoId]
        );
    }

    public function obtenerEstadisticas($usuarioId = null, $cursoId = null)
    {
        $where = [];
        $params = [];

        if ($usuarioId) {
            $where[] = "usuario_id = ?";
            $params[] = $usuarioId;
        }

        if ($cursoId) {
            $where[] = "curso_id = ?";
            $params[] = $cursoId;
        }

        $whereClause = !empty($where) ? "WHERE " . implode(" AND ", $where) : "";

        return [
            'total' => $this->db->fetch(
                "SELECT COUNT(*) as count FROM inscripciones $whereClause",
                $params
            )['count'],
            'activas' => $this->db->fetch(
                "SELECT COUNT(*) as count FROM inscripciones $whereClause AND estado = 'activa'",
                array_merge($params, ['activa'])
            )['count'],
            'completadas' => $this->db->fetch(
                "SELECT COUNT(*) as count FROM inscripciones $whereClause AND estado = 'completada'",
                array_merge($params, ['completada'])
            )['count'],
            'canceladas' => $this->db->fetch(
                "SELECT COUNT(*) as count FROM inscripciones $whereClause AND estado = 'cancelada'",
                array_merge($params, ['cancelada'])
            )['count']
        ];
    }

    public function cancelarInscripcion($usuarioId, $cursoId)
    {
        return $this->db->execute(
            "UPDATE inscripciones SET estado = 'cancelada', fecha_cancelacion = NOW() 
             WHERE usuario_id = ? AND curso_id = ? AND estado = 'activa'",
            [$usuarioId, $cursoId]
        );
    }

    public function completarCurso($usuarioId, $cursoId, $notaFinal = null)
    {
        $data = [
            'estado' => 'completada',
            'fecha_completacion' => date('Y-m-d H:i:s')
        ];

        if ($notaFinal !== null) {
            $data['nota_final'] = $notaFinal;

            // Generar certificado si la nota es aprobatoria
            if ($notaFinal >= 70) {
                $data['certificado'] = $this->generarCertificado($usuarioId, $cursoId);
            }
        }

        return $this->db->execute(
            "UPDATE inscripciones SET estado = ?, fecha_completacion = ?, nota_final = ?, certificado = ?
             WHERE usuario_id = ? AND curso_id = ?",
            [
                $data['estado'],
                $data['fecha_completacion'],
                $data['nota_final'] ?? null,
                $data['certificado'] ?? null,
                $usuarioId,
                $cursoId
            ]
        );
    }

    private function generarCertificado($usuarioId, $cursoId)
    {
        // Generar código único para el certificado
        return 'CERT-' . $cursoId . '-' . $usuarioId . '-' . time();
    }

    public function estaInscrito($usuarioId, $cursoId)
    {
        $inscripcion = $this->db->fetch(
            "SELECT id FROM inscripciones 
             WHERE usuario_id = ? AND curso_id = ? AND estado = 'activa'",
            [$usuarioId, $cursoId]
        );

        return $inscripcion !== false;
    }

    public function obtenerProgreso($usuarioId, $cursoId)
    {
        // Esto se puede expandir para incluir progreso de módulos/materiales
        $inscripcion = $this->db->fetch(
            "SELECT * FROM inscripciones 
             WHERE usuario_id = ? AND curso_id = ?",
            [$usuarioId, $cursoId]
        );

        if (!$inscripcion) {
            return null;
        }

        // Calcular progreso basado en materiales vistos, asistencias, etc.
        $totalMateriales = $this->db->fetch(
            "SELECT COUNT(*) as count FROM materiales WHERE curso_id = ?",
            [$cursoId]
        )['count'];

        $materialesVistos = $this->db->fetch(
            "SELECT COUNT(*) as count FROM material_progreso 
             WHERE usuario_id = ? AND material_id IN 
             (SELECT id FROM materiales WHERE curso_id = ?)",
            [$usuarioId, $cursoId]
        )['count'];

        $porcentaje = $totalMateriales > 0 ? ($materialesVistos / $totalMateriales) * 100 : 0;

        return [
            'inscripcion' => $inscripcion,
            'total_materiales' => $totalMateriales,
            'materiales_vistos' => $materialesVistos,
            'porcentaje_progreso' => round($porcentaje, 2)
        ];
    }
}
