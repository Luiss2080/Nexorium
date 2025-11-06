<?php

/**
 * Controlador de Cursos (API)
 */
class CursoController extends Controller
{

    public function listar()
    {
        $cursoModel = new Curso();

        $search = $_GET['search'] ?? '';
        $capacitador_id = $_GET['capacitador_id'] ?? '';
        $estado = $_GET['estado'] ?? 'activo';
        $page = $_GET['page'] ?? 1;
        $per_page = $_GET['per_page'] ?? 10;

        try {
            if ($search) {
                $cursos = $cursoModel->buscar($search);
                $response = [
                    'success' => true,
                    'data' => $cursos,
                    'total' => count($cursos)
                ];
            } else {
                $conditions = ['estado' => $estado];

                if ($capacitador_id) {
                    $conditions['capacitador_id'] = $capacitador_id;
                }

                $paginacion = $cursoModel->paginate($page, $per_page, $conditions, 'fecha_inicio DESC');

                $response = [
                    'success' => true,
                    'data' => $paginacion['data'],
                    'pagination' => [
                        'current_page' => $paginacion['page'],
                        'per_page' => $paginacion['per_page'],
                        'total' => $paginacion['total'],
                        'total_pages' => $paginacion['total_pages'],
                        'has_next' => $paginacion['has_next'],
                        'has_prev' => $paginacion['has_prev']
                    ]
                ];
            }

            $this->json($response);
        } catch (Exception $e) {
            $this->json([
                'success' => false,
                'error' => 'Error al obtener cursos: ' . $e->getMessage()
            ], 500);
        }
    }

    public function obtener($id)
    {
        $cursoModel = new Curso();

        try {
            $curso = $cursoModel->obtenerConCapacitador($id);

            if (!$curso) {
                $this->json([
                    'success' => false,
                    'error' => 'Curso no encontrado'
                ], 404);
            }

            // Obtener información adicional
            $moduloModel = new Modulo();
            $materialModel = new Material();
            $inscripcionModel = new Inscripcion();

            $curso['modulos'] = $moduloModel->obtenerPorCurso($id);
            $curso['materiales_count'] = $materialModel->count(['curso_id' => $id]);
            $curso['estudiantes_inscritos'] = $inscripcionModel->count(['curso_id' => $id, 'estado' => 'activa']);

            $this->json([
                'success' => true,
                'data' => $curso
            ]);
        } catch (Exception $e) {
            $this->json([
                'success' => false,
                'error' => 'Error al obtener curso: ' . $e->getMessage()
            ], 500);
        }
    }

    public function estadisticas($id = null)
    {
        $cursoModel = new Curso();

        try {
            if ($id) {
                // Estadísticas de un curso específico
                $curso = $cursoModel->find($id);

                if (!$curso) {
                    $this->json([
                        'success' => false,
                        'error' => 'Curso no encontrado'
                    ], 404);
                }

                $inscripcionModel = new Inscripcion();
                $materialModel = new Material();
                $asistenciaModel = new Asistencia();

                $estadisticas = [
                    'inscripciones' => $inscripcionModel->obtenerEstadisticas(null, $id),
                    'materiales' => $materialModel->count(['curso_id' => $id]),
                    'asistencia_promedio' => $asistenciaModel->obtenerResumenAsistencia($id)
                ];
            } else {
                // Estadísticas generales
                $estadisticas = $cursoModel->obtenerEstadisticas();
            }

            $this->json([
                'success' => true,
                'data' => $estadisticas
            ]);
        } catch (Exception $e) {
            $this->json([
                'success' => false,
                'error' => 'Error al obtener estadísticas: ' . $e->getMessage()
            ], 500);
        }
    }
}
