<?php

/**
 * Modelo Asistencia
 */
class Asistencia extends Model
{
    protected $table = 'asistencias';
    protected $fillable = [
        'usuario_id',
        'curso_id',
        'fecha',
        'estado',
        'hora_entrada',
        'hora_salida',
        'observaciones'
    ];

    public function registrarAsistencia($usuarioId, $cursoId, $fecha, $estado = 'presente', $observaciones = null)
    {
        // Verificar si ya existe registro para esta fecha
        $existente = $this->db->fetch(
            "SELECT id FROM asistencias WHERE usuario_id = ? AND curso_id = ? AND fecha = ?",
            [$usuarioId, $cursoId, $fecha]
        );

        if ($existente) {
            // Actualizar existente
            return $this->update($existente['id'], [
                'estado' => $estado,
                'observaciones' => $observaciones,
                'hora_entrada' => $estado === 'presente' ? date('H:i:s') : null
            ]);
        } else {
            // Crear nuevo
            return $this->create([
                'usuario_id' => $usuarioId,
                'curso_id' => $cursoId,
                'fecha' => $fecha,
                'estado' => $estado,
                'hora_entrada' => $estado === 'presente' ? date('H:i:s') : null,
                'observaciones' => $observaciones
            ]);
        }
    }

    public function registrarSalida($usuarioId, $cursoId, $fecha)
    {
        return $this->db->execute(
            "UPDATE asistencias SET hora_salida = ? 
             WHERE usuario_id = ? AND curso_id = ? AND fecha = ? AND estado = 'presente'",
            [date('H:i:s'), $usuarioId, $cursoId, $fecha]
        );
    }

    public function obtenerPorCurso($cursoId, $fecha = null)
    {
        $sql = "SELECT a.*, u.nombre, u.apellido, u.email
                FROM asistencias a
                INNER JOIN usuarios u ON a.usuario_id = u.id
                WHERE a.curso_id = ?";

        $params = [$cursoId];

        if ($fecha) {
            $sql .= " AND a.fecha = ?";
            $params[] = $fecha;
        }

        $sql .= " ORDER BY a.fecha DESC, u.nombre ASC";

        return $this->db->fetchAll($sql, $params);
    }

    public function obtenerPorUsuario($usuarioId, $cursoId = null)
    {
        $sql = "SELECT a.*, c.titulo as curso_titulo
                FROM asistencias a
                INNER JOIN cursos c ON a.curso_id = c.id
                WHERE a.usuario_id = ?";

        $params = [$usuarioId];

        if ($cursoId) {
            $sql .= " AND a.curso_id = ?";
            $params[] = $cursoId;
        }

        $sql .= " ORDER BY a.fecha DESC";

        return $this->db->fetchAll($sql, $params);
    }

    public function obtenerResumenAsistencia($cursoId, $usuarioId = null)
    {
        $sql = "SELECT 
                    COUNT(*) as total_clases,
                    SUM(CASE WHEN estado = 'presente' THEN 1 ELSE 0 END) as clases_asistidas,
                    SUM(CASE WHEN estado = 'ausente' THEN 1 ELSE 0 END) as clases_ausentes,
                    SUM(CASE WHEN estado = 'tardanza' THEN 1 ELSE 0 END) as tardanzas
                FROM asistencias 
                WHERE curso_id = ?";

        $params = [$cursoId];

        if ($usuarioId) {
            $sql .= " AND usuario_id = ?";
            $params[] = $usuarioId;
        }

        $resultado = $this->db->fetch($sql, $params);

        $porcentajeAsistencia = $resultado['total_clases'] > 0
            ? ($resultado['clases_asistidas'] / $resultado['total_clases']) * 100
            : 0;

        return [
            'total_clases' => $resultado['total_clases'],
            'clases_asistidas' => $resultado['clases_asistidas'],
            'clases_ausentes' => $resultado['clases_ausentes'],
            'tardanzas' => $resultado['tardanzas'],
            'porcentaje_asistencia' => round($porcentajeAsistencia, 2)
        ];
    }

    public function obtenerEstudiantesAusentes($cursoId, $fecha)
    {
        return $this->db->fetchAll(
            "SELECT u.id, u.nombre, u.apellido, u.email
             FROM usuarios u
             INNER JOIN inscripciones i ON u.id = i.usuario_id
             LEFT JOIN asistencias a ON u.id = a.usuario_id AND a.curso_id = ? AND a.fecha = ?
             WHERE i.curso_id = ? AND i.estado = 'activa' AND (a.id IS NULL OR a.estado = 'ausente')
             ORDER BY u.nombre, u.apellido",
            [$cursoId, $fecha, $cursoId]
        );
    }

    public function generarReporteAsistencia($cursoId, $fechaInicio = null, $fechaFin = null)
    {
        $sql = "SELECT 
                    u.id as usuario_id,
                    u.nombre,
                    u.apellido,
                    u.email,
                    COUNT(a.id) as total_registros,
                    SUM(CASE WHEN a.estado = 'presente' THEN 1 ELSE 0 END) as presentes,
                    SUM(CASE WHEN a.estado = 'ausente' THEN 1 ELSE 0 END) as ausentes,
                    SUM(CASE WHEN a.estado = 'tardanza' THEN 1 ELSE 0 END) as tardanzas
                FROM usuarios u
                INNER JOIN inscripciones i ON u.id = i.usuario_id
                LEFT JOIN asistencias a ON u.id = a.usuario_id AND a.curso_id = i.curso_id";

        $params = [$cursoId];
        $where = ["i.curso_id = ?", "i.estado = 'activa'"];

        if ($fechaInicio) {
            $where[] = "a.fecha >= ?";
            $params[] = $fechaInicio;
        }

        if ($fechaFin) {
            $where[] = "a.fecha <= ?";
            $params[] = $fechaFin;
        }

        $sql .= " WHERE " . implode(" AND ", $where);
        $sql .= " GROUP BY u.id ORDER BY u.nombre, u.apellido";

        $estudiantes = $this->db->fetchAll($sql, $params);

        foreach ($estudiantes as &$estudiante) {
            $estudiante['porcentaje_asistencia'] = $estudiante['total_registros'] > 0
                ? ($estudiante['presentes'] / $estudiante['total_registros']) * 100
                : 0;
        }

        return $estudiantes;
    }

    public function marcarAsistenciaMasiva($cursoId, $fecha, $asistencias)
    {
        $this->db->beginTransaction();

        try {
            foreach ($asistencias as $usuarioId => $estado) {
                $this->registrarAsistencia($usuarioId, $cursoId, $fecha, $estado);
            }

            $this->db->commit();
            return true;
        } catch (Exception $e) {
            $this->db->rollback();
            throw $e;
        }
    }

    public function obtenerFechasClase($cursoId)
    {
        return $this->db->fetchAll(
            "SELECT DISTINCT fecha FROM asistencias WHERE curso_id = ? ORDER BY fecha DESC",
            [$cursoId]
        );
    }
}
