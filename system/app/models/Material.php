<?php

/**
 * Modelo Material
 */
class Material extends Model
{
    protected $table = 'materiales';
    protected $fillable = [
        'titulo',
        'descripcion',
        'tipo',
        'archivo',
        'url',
        'curso_id',
        'modulo_id',
        'orden',
        'es_publico',
        'estado'
    ];

    public function obtenerPorCurso($cursoId, $usuarioId = null)
    {
        $sql = "SELECT m.*, mo.titulo as modulo_titulo, mo.orden as modulo_orden
                FROM materiales m
                LEFT JOIN modulos mo ON m.modulo_id = mo.id
                WHERE m.curso_id = ? AND m.estado = 'activo'";

        $params = [$cursoId];

        // Si no es público, verificar inscripción
        if ($usuarioId) {
            $sql .= " AND (m.es_publico = 1 OR EXISTS (
                        SELECT 1 FROM inscripciones i 
                        WHERE i.curso_id = m.curso_id 
                        AND i.usuario_id = ? 
                        AND i.estado = 'activa'
                     ))";
            $params[] = $usuarioId;
        } else {
            $sql .= " AND m.es_publico = 1";
        }

        $sql .= " ORDER BY mo.orden ASC, m.orden ASC";

        return $this->db->fetchAll($sql, $params);
    }

    public function obtenerPorModulo($moduloId)
    {
        return $this->where(['modulo_id' => $moduloId, 'estado' => 'activo'], 'orden ASC');
    }

    public function obtenerPorCapacitador($capacitadorId)
    {
        return $this->db->fetchAll(
            "SELECT m.*, c.titulo as curso_titulo, mo.titulo as modulo_titulo
             FROM materiales m
             INNER JOIN cursos c ON m.curso_id = c.id
             LEFT JOIN modulos mo ON m.modulo_id = mo.id
             WHERE c.capacitador_id = ? AND m.estado = 'activo'
             ORDER BY c.titulo, mo.orden, m.orden",
            [$capacitadorId]
        );
    }

    public function subirArchivo($data, $archivo)
    {
        $this->db->beginTransaction();

        try {
            // Subir archivo
            $nombreArchivo = uploadFile($archivo, 'materiales');
            if (!$nombreArchivo) {
                throw new Exception('Error al subir el archivo');
            }

            $data['archivo'] = $nombreArchivo;
            $data['tipo'] = 'archivo';

            $materialId = $this->create($data);

            $this->db->commit();
            return $materialId;
        } catch (Exception $e) {
            $this->db->rollback();
            throw $e;
        }
    }

    public function crearEnlace($data)
    {
        $data['tipo'] = 'enlace';
        return $this->create($data);
    }

    public function obtenerRutaArchivo($id)
    {
        $material = $this->find($id);
        if (!$material || !$material['archivo']) {
            return null;
        }

        return STORAGE_PATH . 'materiales/' . $material['archivo'];
    }

    public function puedeDescargar($materialId, $usuarioId)
    {
        $material = $this->db->fetch(
            "SELECT m.*, c.capacitador_id
             FROM materiales m
             INNER JOIN cursos c ON m.curso_id = c.id
             WHERE m.id = ?",
            [$materialId]
        );

        if (!$material) {
            return false;
        }

        // Si es público, todos pueden descargar
        if ($material['es_publico']) {
            return true;
        }

        // Si es el capacitador del curso
        if ($material['capacitador_id'] == $usuarioId) {
            return true;
        }

        // Si está inscrito al curso
        $inscripcion = $this->db->fetch(
            "SELECT id FROM inscripciones 
             WHERE curso_id = ? AND usuario_id = ? AND estado = 'activa'",
            [$material['curso_id'], $usuarioId]
        );

        return $inscripcion !== false;
    }

    public function obtenerEstadisticas($capacitadorId = null)
    {
        $where = $capacitadorId ? "WHERE c.capacitador_id = $capacitadorId" : "";

        return [
            'total' => $this->db->fetch(
                "SELECT COUNT(*) as count FROM materiales m 
                 INNER JOIN cursos c ON m.curso_id = c.id $where"
            )['count'],
            'archivos' => $this->db->fetch(
                "SELECT COUNT(*) as count FROM materiales m 
                 INNER JOIN cursos c ON m.curso_id = c.id 
                 WHERE m.tipo = 'archivo' $where"
            )['count'],
            'enlaces' => $this->db->fetch(
                "SELECT COUNT(*) as count FROM materiales m 
                 INNER JOIN cursos c ON m.curso_id = c.id 
                 WHERE m.tipo = 'enlace' $where"
            )['count'],
            'publicos' => $this->db->fetch(
                "SELECT COUNT(*) as count FROM materiales m 
                 INNER JOIN cursos c ON m.curso_id = c.id 
                 WHERE m.es_publico = 1 $where"
            )['count']
        ];
    }

    public function buscar($termino, $capacitadorId = null)
    {
        $sql = "SELECT m.*, c.titulo as curso_titulo, mo.titulo as modulo_titulo
                FROM materiales m
                INNER JOIN cursos c ON m.curso_id = c.id
                LEFT JOIN modulos mo ON m.modulo_id = mo.id
                WHERE (m.titulo LIKE ? OR m.descripcion LIKE ?)";

        $params = ["%$termino%", "%$termino%"];

        if ($capacitadorId) {
            $sql .= " AND c.capacitador_id = ?";
            $params[] = $capacitadorId;
        }

        $sql .= " ORDER BY c.titulo, mo.orden, m.orden";

        return $this->db->fetchAll($sql, $params);
    }

    public function eliminarConArchivo($id)
    {
        $material = $this->find($id);
        if (!$material) {
            return false;
        }

        $this->db->beginTransaction();

        try {
            // Eliminar archivo físico si existe
            if ($material['archivo']) {
                $rutaArchivo = STORAGE_PATH . 'materiales/' . $material['archivo'];
                if (file_exists($rutaArchivo)) {
                    unlink($rutaArchivo);
                }
            }

            // Eliminar registro
            $this->delete($id);

            $this->db->commit();
            return true;
        } catch (Exception $e) {
            $this->db->rollback();
            throw $e;
        }
    }
}
