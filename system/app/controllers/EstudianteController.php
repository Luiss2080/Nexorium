<?php

/**
 * Controlador de Estudiante
 */
class EstudianteController extends Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->requireRole(['estudiante']);
    }

    public function dashboard()
    {
        $user = $this->auth->getUser();
        $cursoModel = new Curso();
        $inscripcionModel = new Inscripcion();
        $materialModel = new Material();

        $misCursos = $inscripcionModel->obtenerPorUsuario($user['id']);
        $cursosDisponibles = $cursoModel->obtenerDisponibles();

        // Filtrar cursos disponibles (excluir los ya inscritos)
        $cursosInscritos = array_column($misCursos, 'curso_id');
        $cursosDisponibles = array_filter($cursosDisponibles, function ($curso) use ($cursosInscritos) {
            return !in_array($curso['id'], $cursosInscritos);
        });

        $data = [
            'mis_cursos' => $misCursos,
            'cursos_disponibles' => array_slice($cursosDisponibles, 0, 6), // Solo los primeros 6
            'estadisticas' => $inscripcionModel->obtenerEstadisticas($user['id']),
            'materiales_recientes' => $this->obtenerMaterialesRecientes($user['id'])
        ];

        $this->view('estudiante/dashboard', $data);
    }

    public function misCursos()
    {
        $user = $this->auth->getUser();
        $inscripcionModel = new Inscripcion();

        $estado = $_GET['estado'] ?? '';
        $search = $_GET['search'] ?? '';

        $misCursos = $inscripcionModel->obtenerPorUsuario($user['id']);

        // Filtrar por estado si se especifica
        if ($estado) {
            $misCursos = array_filter($misCursos, function ($curso) use ($estado) {
                return $curso['estado_inscripcion'] === $estado;
            });
        }

        // Filtrar por búsqueda
        if ($search) {
            $misCursos = array_filter($misCursos, function ($curso) use ($search) {
                return stripos($curso['curso_titulo'], $search) !== false ||
                    stripos($curso['curso_descripcion'], $search) !== false;
            });
        }

        // Agregar progreso a cada curso
        foreach ($misCursos as &$curso) {
            $curso['progreso'] = $inscripcionModel->obtenerProgreso($user['id'], $curso['curso_id']);
        }

        $data = [
            'mis_cursos' => $misCursos,
            'estado_filtro' => $estado,
            'search' => $search,
            'estadisticas' => $inscripcionModel->obtenerEstadisticas($user['id'])
        ];

        $this->view('estudiante/mis_cursos', $data);
    }

    public function verCurso($id)
    {
        $user = $this->auth->getUser();
        $cursoModel = new Curso();
        $inscripcionModel = new Inscripcion();
        $moduloModel = new Modulo();
        $materialModel = new Material();

        $curso = $cursoModel->obtenerConCapacitador($id);

        if (!$curso) {
            setFlash('error', 'Curso no encontrado');
            $this->redirect('/estudiante/mis-cursos');
        }

        // Verificar si está inscrito
        $estaInscrito = $inscripcionModel->estaInscrito($user['id'], $id);

        if (!$estaInscrito) {
            // Si no está inscrito, mostrar información básica y opción de inscripción
            $puedeInscribirse = $cursoModel->puedeInscribirse($id, $user['id']);

            $data = [
                'curso' => $curso,
                'puede_inscribirse' => $puedeInscribirse,
                'esta_inscrito' => false,
                'csrf_token' => $this->generateCSRFToken()
            ];
        } else {
            // Si está inscrito, mostrar contenido completo
            $data = [
                'curso' => $curso,
                'esta_inscrito' => true,
                'modulos' => $moduloModel->obtenerPorCurso($id),
                'materiales' => $materialModel->obtenerPorCurso($id, $user['id']),
                'progreso' => $inscripcionModel->obtenerProgreso($user['id'], $id),
                'inscripcion' => $this->db->fetch(
                    "SELECT * FROM inscripciones WHERE usuario_id = ? AND curso_id = ?",
                    [$user['id'], $id]
                )
            ];
        }

        $this->view('estudiante/curso_detalle', $data);
    }

    public function inscribirse($id)
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->redirect('/estudiante/mis-cursos');
        }

        if (!$this->validateCSRFToken($_POST['csrf_token'] ?? '')) {
            setFlash('error', 'Token de seguridad inválido');
            $this->redirect('/estudiante/curso/' . $id);
        }

        $user = $this->auth->getUser();
        $cursoModel = new Curso();
        $inscripcionModel = new Inscripcion();

        // Verificar que el curso existe y está disponible
        if (!$cursoModel->puedeInscribirse($id, $user['id'])) {
            setFlash('error', 'No se puede inscribir a este curso en este momento');
            $this->redirect('/estudiante/curso/' . $id);
        }

        try {
            $inscripcionModel->inscribirUsuario($user['id'], $id);
            setFlash('success', '¡Te has inscrito exitosamente al curso!');
            $this->redirect('/estudiante/curso/' . $id);
        } catch (Exception $e) {
            setFlash('error', 'Error al inscribirse: ' . $e->getMessage());
            $this->redirect('/estudiante/curso/' . $id);
        }
    }

    public function misMateriales()
    {
        $user = $this->auth->getUser();
        $materialModel = new Material();
        $inscripcionModel = new Inscripcion();

        $curso_id = $_GET['curso_id'] ?? '';
        $tipo = $_GET['tipo'] ?? '';
        $search = $_GET['search'] ?? '';

        // Obtener cursos en los que está inscrito
        $misCursos = $inscripcionModel->obtenerPorUsuario($user['id']);
        $cursosIds = array_column($misCursos, 'curso_id');

        if (empty($cursosIds)) {
            $materiales = [];
        } else {
            // Obtener todos los materiales de los cursos inscritos
            $sql = "SELECT m.*, c.titulo as curso_titulo, mo.titulo as modulo_titulo
                    FROM materiales m
                    INNER JOIN cursos c ON m.curso_id = c.id
                    LEFT JOIN modulos mo ON m.modulo_id = mo.id
                    WHERE m.curso_id IN (" . implode(',', array_fill(0, count($cursosIds), '?')) . ")
                    AND m.estado = 'activo'";

            $params = $cursosIds;

            // Filtros adicionales
            if ($curso_id) {
                $sql .= " AND m.curso_id = ?";
                $params[] = $curso_id;
            }

            if ($tipo) {
                $sql .= " AND m.tipo = ?";
                $params[] = $tipo;
            }

            if ($search) {
                $sql .= " AND (m.titulo LIKE ? OR m.descripcion LIKE ?)";
                $params[] = "%$search%";
                $params[] = "%$search%";
            }

            $sql .= " ORDER BY c.titulo, mo.orden, m.orden";

            $materiales = $this->db->fetchAll($sql, $params);
        }

        $data = [
            'materiales' => $materiales,
            'mis_cursos' => $misCursos,
            'curso_filtro' => $curso_id,
            'tipo_filtro' => $tipo,
            'search' => $search
        ];

        $this->view('estudiante/mis_materiales', $data);
    }

    public function descargarMaterial($id)
    {
        $user = $this->auth->getUser();
        $materialModel = new Material();

        // Verificar que puede descargar el material
        if (!$materialModel->puedeDescargar($id, $user['id'])) {
            setFlash('error', 'No tiene permisos para descargar este material');
            $this->redirect('/estudiante/mis-materiales');
        }

        $rutaArchivo = $materialModel->obtenerRutaArchivo($id);

        if (!$rutaArchivo || !file_exists($rutaArchivo)) {
            setFlash('error', 'Archivo no encontrado');
            $this->redirect('/estudiante/mis-materiales');
        }

        $material = $materialModel->find($id);

        // Configurar headers para descarga
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="' . $material['titulo'] . '"');
        header('Content-Length: ' . filesize($rutaArchivo));

        // Leer y enviar el archivo
        readfile($rutaArchivo);
        exit();
    }

    public function perfil()
    {
        $user = $this->auth->getUser();
        $perfilModel = new Perfil();

        $data = [
            'usuario' => $perfilModel->obtenerCompleto($user['id']),
            'estadisticas' => $perfilModel->obtenerEstadisticasPerfil($user['id']),
            'csrf_token' => $this->generateCSRFToken(),
            'success' => getFlash('success'),
            'error' => getFlash('error')
        ];

        $this->view('estudiante/perfil', $data);
    }

    public function actualizarPerfil()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->redirect('/estudiante/perfil');
        }

        if (!$this->validateCSRFToken($_POST['csrf_token'] ?? '')) {
            setFlash('error', 'Token de seguridad inválido');
            $this->redirect('/estudiante/perfil');
        }

        $user = $this->auth->getUser();

        $errors = $this->validateInput($_POST, [
            'nombre' => 'required|min:2',
            'apellido' => 'required|min:2',
            'email' => 'required|email'
        ]);

        // Verificar email único (excepto el actual)
        $usuarioModel = new Usuario();
        $emailExistente = $usuarioModel->buscarPorEmail($_POST['email']);
        if ($emailExistente && $emailExistente['id'] != $user['id']) {
            $errors['email'] = 'Este email ya está registrado';
        }

        if (!empty($errors)) {
            setErrors($errors);
            setOldInput($_POST);
            $this->redirect('/estudiante/perfil');
        }

        try {
            $perfilModel = new Perfil();

            // Actualizar datos básicos del usuario
            $usuarioModel->update($user['id'], [
                'nombre' => $_POST['nombre'],
                'apellido' => $_POST['apellido'],
                'email' => $_POST['email'],
                'telefono' => $_POST['telefono'] ?? null,
                'direccion' => $_POST['direccion'] ?? null,
                'fecha_nacimiento' => $_POST['fecha_nacimiento'] ?? null
            ]);

            // Actualizar perfil extendido
            $perfilModel->crearOActualizar($user['id'], [
                'biografia' => $_POST['biografia'] ?? '',
                'ciudad' => $_POST['ciudad'] ?? '',
                'pais' => $_POST['pais'] ?? '',
                'genero' => $_POST['genero'] ?? '',
                'telefono_alternativo' => $_POST['telefono_alternativo'] ?? ''
            ]);

            // Manejar avatar si se subió
            if (!empty($_FILES['avatar']['name'])) {
                $avatar = uploadFile($_FILES['avatar'], 'profiles', ['jpg', 'jpeg', 'png']);
                if ($avatar) {
                    $perfilModel->actualizarAvatar($user['id'], $avatar);
                }
            }

            // Cambiar contraseña si se proporcionó
            if (!empty($_POST['password'])) {
                if ($_POST['password'] !== $_POST['password_confirmation']) {
                    throw new Exception('Las contraseñas no coinciden');
                }

                $auth = new Auth();
                $passwordErrors = $auth->checkPasswordStrength($_POST['password']);
                if (!empty($passwordErrors)) {
                    throw new Exception(implode(', ', $passwordErrors));
                }

                $usuarioModel->actualizarPassword($user['id'], $_POST['password']);
            }

            setFlash('success', 'Perfil actualizado exitosamente');
        } catch (Exception $e) {
            setFlash('error', 'Error al actualizar perfil: ' . $e->getMessage());
        }

        $this->redirect('/estudiante/perfil');
    }

    private function obtenerMaterialesRecientes($usuarioId)
    {
        $inscripcionModel = new Inscripcion();
        $misCursos = $inscripcionModel->obtenerPorUsuario($usuarioId);
        $cursosIds = array_column($misCursos, 'curso_id');

        if (empty($cursosIds)) {
            return [];
        }

        $materialModel = new Material();
        $sql = "SELECT m.*, c.titulo as curso_titulo
                FROM materiales m
                INNER JOIN cursos c ON m.curso_id = c.id
                WHERE m.curso_id IN (" . implode(',', array_fill(0, count($cursosIds), '?')) . ")
                AND m.estado = 'activo'
                ORDER BY m.created_at DESC
                LIMIT 5";

        return $this->db->fetchAll($sql, $cursosIds);
    }
}
