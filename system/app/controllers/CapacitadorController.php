<?php

/**
 * Controlador de Capacitador
 */
class CapacitadorController extends Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->requireRole(['capacitador']);
    }

    public function dashboard()
    {
        $user = $this->auth->getUser();
        $cursoModel = new Curso();
        $materialModel = new Material();
        $inscripcionModel = new Inscripcion();

        $misCursos = $cursoModel->obtenerPorCapacitador($user['id']);
        $totalEstudiantes = 0;

        foreach ($misCursos as $curso) {
            $totalEstudiantes += $curso['total_inscritos'];
        }

        $data = [
            'mis_cursos' => $misCursos,
            'total_cursos' => count($misCursos),
            'total_estudiantes' => $totalEstudiantes,
            'mis_materiales' => $materialModel->obtenerPorCapacitador($user['id']),
            'estadisticas_materiales' => $materialModel->obtenerEstadisticas($user['id']),
            'cursos_activos' => array_filter($misCursos, function ($curso) {
                return $curso['estado'] === 'activo';
            })
        ];

        $this->view('capacitador/dashboard', $data);
    }

    public function misCursos()
    {
        $user = $this->auth->getUser();
        $cursoModel = new Curso();

        $page = $_GET['page'] ?? 1;
        $estado = $_GET['estado'] ?? '';

        $conditions = ['capacitador_id' => $user['id']];
        if ($estado) {
            $conditions['estado'] = $estado;
        }

        $paginacion = $cursoModel->paginate($page, 10, $conditions, 'fecha_inicio DESC');

        $data = [
            'cursos' => $paginacion['data'],
            'paginacion' => $paginacion,
            'estado_filtro' => $estado
        ];

        $this->view('capacitador/mis_cursos', $data);
    }

    public function verCurso($id)
    {
        $user = $this->auth->getUser();
        $cursoModel = new Curso();
        $moduloModel = new Modulo();
        $materialModel = new Material();
        $inscripcionModel = new Inscripcion();

        $curso = $cursoModel->obtenerConCapacitador($id);

        if (!$curso || $curso['capacitador_id'] != $user['id']) {
            setFlash('error', 'Curso no encontrado o no autorizado');
            $this->redirect('/capacitador/mis-cursos');
        }

        $data = [
            'curso' => $curso,
            'modulos' => $moduloModel->obtenerPorCurso($id),
            'materiales' => $materialModel->obtenerPorCurso($id),
            'estudiantes' => $inscripcionModel->obtenerPorCurso($id),
            'estadisticas' => $inscripcionModel->obtenerEstadisticas(null, $id)
        ];

        $this->view('capacitador/curso_detalle', $data);
    }

    public function misMateriales()
    {
        $user = $this->auth->getUser();
        $materialModel = new Material();
        $cursoModel = new Curso();

        $page = $_GET['page'] ?? 1;
        $curso_id = $_GET['curso_id'] ?? '';
        $search = $_GET['search'] ?? '';

        if ($search) {
            $materiales = $materialModel->buscar($search, $user['id']);
            $paginacion = null;
        } else {
            // Obtener materiales del capacitador
            $materiales = $materialModel->obtenerPorCapacitador($user['id']);

            if ($curso_id) {
                $materiales = array_filter($materiales, function ($material) use ($curso_id) {
                    return $material['curso_id'] == $curso_id;
                });
            }

            $paginacion = null; // Implementar paginación manual si es necesario
        }

        $data = [
            'materiales' => $materiales,
            'paginacion' => $paginacion,
            'mis_cursos' => $cursoModel->obtenerPorCapacitador($user['id']),
            'curso_filtro' => $curso_id,
            'search' => $search,
            'estadisticas' => $materialModel->obtenerEstadisticas($user['id']),
            'csrf_token' => $this->generateCSRFToken()
        ];

        $this->view('capacitador/mis_materiales', $data);
    }

    public function subirMaterial()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->redirect('/capacitador/mis-materiales');
        }

        if (!$this->validateCSRFToken($_POST['csrf_token'] ?? '')) {
            setFlash('error', 'Token de seguridad inválido');
            $this->redirect('/capacitador/mis-materiales');
        }

        $user = $this->auth->getUser();
        $cursoModel = new Curso();

        // Verificar que el curso pertenece al capacitador
        $curso = $cursoModel->find($_POST['curso_id']);
        if (!$curso || $curso['capacitador_id'] != $user['id']) {
            setFlash('error', 'Curso no autorizado');
            $this->redirect('/capacitador/mis-materiales');
        }

        $errors = $this->validateInput($_POST, [
            'titulo' => 'required|min:3',
            'descripcion' => 'required|min:10',
            'curso_id' => 'required'
        ]);

        if (!empty($errors)) {
            setErrors($errors);
            setOldInput($_POST);
            $this->redirect('/capacitador/mis-materiales');
        }

        try {
            $materialModel = new Material();

            if (!empty($_FILES['archivo']['name'])) {
                // Subir archivo
                $materialId = $materialModel->subirArchivo($_POST, $_FILES['archivo']);
            } elseif (!empty($_POST['url'])) {
                // Crear enlace
                $materialId = $materialModel->crearEnlace($_POST);
            } else {
                throw new Exception('Debe proporcionar un archivo o una URL');
            }

            setFlash('success', 'Material subido exitosamente');
        } catch (Exception $e) {
            setFlash('error', 'Error al subir material: ' . $e->getMessage());
        }

        $this->redirect('/capacitador/mis-materiales');
    }

    public function eliminarMaterial($id)
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
            $this->redirect('/capacitador/mis-materiales');
        }

        $user = $this->auth->getUser();
        $materialModel = new Material();
        $cursoModel = new Curso();

        $material = $materialModel->find($id);
        if (!$material) {
            $this->json(['error' => 'Material no encontrado'], 404);
        }

        // Verificar autorización
        $curso = $cursoModel->find($material['curso_id']);
        if (!$curso || $curso['capacitador_id'] != $user['id']) {
            $this->json(['error' => 'No autorizado'], 403);
        }

        try {
            $materialModel->eliminarConArchivo($id);
            $this->json(['success' => 'Material eliminado exitosamente']);
        } catch (Exception $e) {
            $this->json(['error' => 'Error al eliminar material: ' . $e->getMessage()], 500);
        }
    }

    public function estudiantes()
    {
        $user = $this->auth->getUser();
        $cursoModel = new Curso();
        $inscripcionModel = new Inscripcion();

        $curso_id = $_GET['curso_id'] ?? '';
        $search = $_GET['search'] ?? '';

        // Obtener cursos del capacitador
        $misCursos = $cursoModel->obtenerPorCapacitador($user['id']);

        $estudiantes = [];
        if ($curso_id) {
            $estudiantes = $inscripcionModel->obtenerPorCurso($curso_id);

            if ($search) {
                $estudiantes = array_filter($estudiantes, function ($estudiante) use ($search) {
                    return stripos($estudiante['nombre'], $search) !== false ||
                        stripos($estudiante['apellido'], $search) !== false ||
                        stripos($estudiante['email'], $search) !== false;
                });
            }
        }

        $data = [
            'estudiantes' => $estudiantes,
            'mis_cursos' => $misCursos,
            'curso_filtro' => $curso_id,
            'search' => $search
        ];

        $this->view('capacitador/estudiantes', $data);
    }

    public function asistencia()
    {
        $user = $this->auth->getUser();
        $cursoModel = new Curso();
        $asistenciaModel = new Asistencia();

        $curso_id = $_GET['curso_id'] ?? '';
        $fecha = $_GET['fecha'] ?? date('Y-m-d');

        $misCursos = $cursoModel->obtenerPorCapacitador($user['id']);

        $asistencias = [];
        $estudiantes = [];
        $resumen = null;

        if ($curso_id) {
            $asistencias = $asistenciaModel->obtenerPorCurso($curso_id, $fecha);
            $inscripcionModel = new Inscripcion();
            $estudiantes = $inscripcionModel->obtenerPorCurso($curso_id);
            $resumen = $asistenciaModel->obtenerResumenAsistencia($curso_id);
        }

        $data = [
            'asistencias' => $asistencias,
            'estudiantes' => $estudiantes,
            'mis_cursos' => $misCursos,
            'curso_filtro' => $curso_id,
            'fecha' => $fecha,
            'resumen' => $resumen,
            'csrf_token' => $this->generateCSRFToken()
        ];

        $this->view('capacitador/asistencia', $data);
    }

    public function registrarAsistencia()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->redirect('/capacitador/asistencia');
        }

        if (!$this->validateCSRFToken($_POST['csrf_token'] ?? '')) {
            setFlash('error', 'Token de seguridad inválido');
            $this->redirect('/capacitador/asistencia');
        }

        $user = $this->auth->getUser();
        $cursoModel = new Curso();

        // Verificar autorización del curso
        $curso = $cursoModel->find($_POST['curso_id']);
        if (!$curso || $curso['capacitador_id'] != $user['id']) {
            setFlash('error', 'Curso no autorizado');
            $this->redirect('/capacitador/asistencia');
        }

        try {
            $asistenciaModel = new Asistencia();
            $asistencias = $_POST['asistencias'] ?? [];

            $asistenciaModel->marcarAsistenciaMasiva(
                $_POST['curso_id'],
                $_POST['fecha'],
                $asistencias
            );

            setFlash('success', 'Asistencias registradas exitosamente');
        } catch (Exception $e) {
            setFlash('error', 'Error al registrar asistencias: ' . $e->getMessage());
        }

        $this->redirect('/capacitador/asistencia?curso_id=' . $_POST['curso_id'] . '&fecha=' . $_POST['fecha']);
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

        $this->view('capacitador/perfil', $data);
    }

    public function actualizarPerfil()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->redirect('/capacitador/perfil');
        }

        if (!$this->validateCSRFToken($_POST['csrf_token'] ?? '')) {
            setFlash('error', 'Token de seguridad inválido');
            $this->redirect('/capacitador/perfil');
        }

        $user = $this->auth->getUser();

        try {
            $usuarioModel = new Usuario();
            $perfilModel = new Perfil();

            // Actualizar datos básicos del usuario
            $usuarioModel->update($user['id'], [
                'nombre' => $_POST['nombre'],
                'apellido' => $_POST['apellido'],
                'telefono' => $_POST['telefono'],
                'direccion' => $_POST['direccion']
            ]);

            // Actualizar perfil extendido
            $perfilModel->crearOActualizar($user['id'], [
                'biografia' => $_POST['biografia'] ?? '',
                'especialidades' => $_POST['especialidades'] ?? '',
                'experiencia' => $_POST['experiencia'] ?? '',
                'educacion' => $_POST['educacion'] ?? '',
                'certificaciones' => $_POST['certificaciones'] ?? '',
                'linkedin' => $_POST['linkedin'] ?? '',
                'website' => $_POST['website'] ?? ''
            ]);

            // Manejar avatar si se subió
            if (!empty($_FILES['avatar']['name'])) {
                $avatar = uploadFile($_FILES['avatar'], 'profiles', ['jpg', 'jpeg', 'png']);
                if ($avatar) {
                    $perfilModel->actualizarAvatar($user['id'], $avatar);
                }
            }

            setFlash('success', 'Perfil actualizado exitosamente');
        } catch (Exception $e) {
            setFlash('error', 'Error al actualizar perfil: ' . $e->getMessage());
        }

        $this->redirect('/capacitador/perfil');
    }
}
