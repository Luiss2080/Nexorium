<?php

/**
 * Modelo Modulo
 */
class Modulo extends Model
{
    protected $table = 'modulos';
    protected $fillable = [
        'titulo',
        'descripcion',
        'objetivos',
        'curso_id',
        'orden',
        'duracion_estimada',
        'estado'
    ];

    public function obtenerPorCurso($cursoId)
    {
        return $this->where(['curso_id' => $cursoId, 'estado' => 'activo'], 'orden ASC');
    }

    public function obtenerConMateriales($moduloId)
    {
        $modulo = $this->find($moduloId);
        if (!$modulo) {
            return null;
        }

        $materiales = $this->db->fetchAll(
            "SELECT * FROM materiales WHERE modulo_id = ? AND estado = 'activo' ORDER BY orden ASC",
            [$moduloId]
        );

        $modulo['materiales'] = $materiales;
        return $modulo;
    }

    public function obtenerSiguiente($cursoId, $ordenActual)
    {
        return $this->db->fetch(
            "SELECT * FROM modulos 
             WHERE curso_id = ? AND orden > ? AND estado = 'activo' 
             ORDER BY orden ASC LIMIT 1",
            [$cursoId, $ordenActual]
        );
    }

    public function obtenerAnterior($cursoId, $ordenActual)
    {
        return $this->db->fetch(
            "SELECT * FROM modulos 
             WHERE curso_id = ? AND orden < ? AND estado = 'activo' 
             ORDER BY orden DESC LIMIT 1",
            [$cursoId, $ordenActual]
        );
    }

    public function reordenar($cursoId, $nuevosOrdenes)
    {
        $this->db->beginTransaction();

        try {
            foreach ($nuevosOrdenes as $moduloId => $nuevoOrden) {
                $this->db->execute(
                    "UPDATE modulos SET orden = ? WHERE id = ? AND curso_id = ?",
                    [$nuevoOrden, $moduloId, $cursoId]
                );
            }

            $this->db->commit();
            return true;
        } catch (Exception $e) {
            $this->db->rollback();
            throw $e;
        }
    }

    public function duplicar($moduloId, $nuevoCursoId)
    {
        $modulo = $this->find($moduloId);
        if (!$modulo) {
            return false;
        }

        $this->db->beginTransaction();

        try {
            // Obtener siguiente orden para el nuevo curso
            $siguienteOrden = $this->db->fetch(
                "SELECT COALESCE(MAX(orden), 0) + 1 as siguiente_orden FROM modulos WHERE curso_id = ?",
                [$nuevoCursoId]
            )['siguiente_orden'];

            // Crear nuevo módulo
            $nuevoModuloId = $this->create([
                'titulo' => $modulo['titulo'],
                'descripcion' => $modulo['descripcion'],
                'objetivos' => $modulo['objetivos'],
                'curso_id' => $nuevoCursoId,
                'orden' => $siguienteOrden,
                'duracion_estimada' => $modulo['duracion_estimada'],
                'estado' => 'activo'
            ]);

            // Duplicar materiales del módulo
            $materiales = $this->db->fetchAll(
                "SELECT * FROM materiales WHERE modulo_id = ? ORDER BY orden ASC",
                [$moduloId]
            );

            $materialModel = new Material();
            foreach ($materiales as $material) {
                $materialModel->create([
                    'titulo' => $material['titulo'],
                    'descripcion' => $material['descripcion'],
                    'tipo' => $material['tipo'],
                    'archivo' => $material['archivo'], // Nota: el archivo físico no se duplica
                    'url' => $material['url'],
                    'curso_id' => $nuevoCursoId,
                    'modulo_id' => $nuevoModuloId,
                    'orden' => $material['orden'],
                    'es_publico' => $material['es_publico'],
                    'estado' => 'activo'
                ]);
            }

            $this->db->commit();
            return $nuevoModuloId;
        } catch (Exception $e) {
            $this->db->rollback();
            throw $e;
        }
    }

    public function obtenerProgreso($moduloId, $usuarioId)
    {
        $totalMateriales = $this->db->fetch(
            "SELECT COUNT(*) as count FROM materiales WHERE modulo_id = ? AND estado = 'activo'",
            [$moduloId]
        )['count'];

        $materialesVistos = $this->db->fetch(
            "SELECT COUNT(*) as count FROM material_progreso mp
             INNER JOIN materiales m ON mp.material_id = m.id
             WHERE m.modulo_id = ? AND mp.usuario_id = ?",
            [$moduloId, $usuarioId]
        )['count'];

        $porcentaje = $totalMateriales > 0 ? ($materialesVistos / $totalMateriales) * 100 : 0;

        return [
            'total_materiales' => $totalMateriales,
            'materiales_vistos' => $materialesVistos,
            'porcentaje' => round($porcentaje, 2),
            'completado' => $porcentaje >= 100
        ];
    }

    public function obtenerDuracionTotal($cursoId)
    {
        $resultado = $this->db->fetch(
            "SELECT SUM(duracion_estimada) as duracion_total FROM modulos 
             WHERE curso_id = ? AND estado = 'activo'",
            [$cursoId]
        );

        return $resultado['duracion_total'] ?? 0;
    }

    public function eliminarConMateriales($moduloId)
    {
        $this->db->beginTransaction();

        try {
            // Eliminar materiales del módulo
            $materialModel = new Material();
            $materiales = $this->db->fetchAll(
                "SELECT id FROM materiales WHERE modulo_id = ?",
                [$moduloId]
            );

            foreach ($materiales as $material) {
                $materialModel->eliminarConArchivo($material['id']);
            }

            // Eliminar el módulo
            $this->delete($moduloId);

            $this->db->commit();
            return true;
        } catch (Exception $e) {
            $this->db->rollback();
            throw $e;
        }
    }
}
