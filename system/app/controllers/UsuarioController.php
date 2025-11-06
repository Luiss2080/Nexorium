<?php

/**
 * Controlador de Usuarios (API)
 */
class UsuarioController extends Controller
{

    public function listar()
    {
        $usuarioModel = new Usuario();

        $search = $_GET['search'] ?? '';
        $rol = $_GET['rol'] ?? '';
        $estado = $_GET['estado'] ?? 'activo';
        $page = $_GET['page'] ?? 1;
        $per_page = $_GET['per_page'] ?? 10;

        try {
            if ($search) {
                $usuarios = $usuarioModel->buscar($search, $rol);
                $response = [
                    'success' => true,
                    'data' => $usuarios,
                    'total' => count($usuarios)
                ];
            } else {
                $conditions = ['estado' => $estado];

                if ($rol) {
                    $conditions['rol_id'] = $rol;
                }

                $paginacion = $usuarioModel->paginate($page, $per_page, $conditions, 'nombre ASC');

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
                'error' => 'Error al obtener usuarios: ' . $e->getMessage()
            ], 500);
        }
    }

    public function obtener($id)
    {
        $usuarioModel = new Usuario();
        $perfilModel = new Perfil();

        try {
            $usuario = $usuarioModel->obtenerConRol($id);

            if (!$usuario) {
                $this->json([
                    'success' => false,
                    'error' => 'Usuario no encontrado'
                ], 404);
            }

            // Obtener perfil extendido
            $perfil = $perfilModel->obtenerPorUsuario($id);
            if ($perfil) {
                $usuario = array_merge($usuario, $perfil);
            }

            // Obtener estadísticas según el rol
            if ($usuario['rol_nombre'] === 'capacitador') {
                $cursoModel = new Curso();
                $usuario['cursos_impartidos'] = $cursoModel->count(['capacitador_id' => $id]);
                $usuario['estudiantes_capacitados'] = $this->db->fetch(
                    "SELECT COUNT(DISTINCT i.usuario_id) as count
                     FROM inscripciones i
                     INNER JOIN cursos c ON i.curso_id = c.id
                     WHERE c.capacitador_id = ? AND i.estado = 'completada'",
                    [$id]
                )['count'];
            }

            if ($usuario['rol_nombre'] === 'estudiante') {
                $inscripcionModel = new Inscripcion();
                $usuario['cursos_inscritos'] = $inscripcionModel->count(['usuario_id' => $id]);
                $usuario['cursos_completados'] = $inscripcionModel->count(['usuario_id' => $id, 'estado' => 'completada']);
            }

            $this->json([
                'success' => true,
                'data' => $usuario
            ]);
        } catch (Exception $e) {
            $this->json([
                'success' => false,
                'error' => 'Error al obtener usuario: ' . $e->getMessage()
            ], 500);
        }
    }

    public function capacitadores()
    {
        $usuarioModel = new Usuario();

        try {
            $capacitadores = $usuarioModel->obtenerPorRol(ROLE_TRAINER);

            $this->json([
                'success' => true,
                'data' => $capacitadores
            ]);
        } catch (Exception $e) {
            $this->json([
                'success' => false,
                'error' => 'Error al obtener capacitadores: ' . $e->getMessage()
            ], 500);
        }
    }

    public function estudiantes()
    {
        $usuarioModel = new Usuario();

        try {
            $estudiantes = $usuarioModel->obtenerPorRol(ROLE_STUDENT);

            $this->json([
                'success' => true,
                'data' => $estudiantes
            ]);
        } catch (Exception $e) {
            $this->json([
                'success' => false,
                'error' => 'Error al obtener estudiantes: ' . $e->getMessage()
            ], 500);
        }
    }

    public function estadisticas($id = null)
    {
        $usuarioModel = new Usuario();

        try {
            if ($id) {
                $perfilModel = new Perfil();
                $estadisticas = $perfilModel->obtenerEstadisticasPerfil($id);
            } else {
                $estadisticas = $usuarioModel->obtenerEstadisticas();
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
