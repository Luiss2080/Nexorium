<?php

/**
 * Controlador de Administración
 */
class AdminController extends Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->requireRole(['admin']);
    }

    public function dashboard()
    {
        $usuarioModel = new Usuario();
        $cursoModel = new Curso();
        $inscripcionModel = new Inscripcion();

        $data = [
            'estadisticas_usuarios' => $usuarioModel->obtenerEstadisticas(),
            'estadisticas_cursos' => $cursoModel->obtenerEstadisticas(),
            'estadisticas_inscripciones' => $inscripcionModel->obtenerEstadisticas(),
            'cursos_recientes' => $cursoModel->obtenerTodosConCapacitador(),
            'usuarios_recientes' => $usuarioModel->where(['estado' => 'activo'], 'created_at DESC', 10)
        ];

        $this->view('admin/dashboard', $data);
    }

    public function usuarios()
    {
        $usuarioModel = new Usuario();
        $rolModel = new Rol();

        $page = $_GET['page'] ?? 1;
        $search = $_GET['search'] ?? '';
        $rol = $_GET['rol'] ?? '';

        if ($search) {
            $usuarios = $usuarioModel->buscar($search, $rol);
            $paginacion = null;
        } else {
            $conditions = [];
            if ($rol) {
                $conditions['rol_id'] = $rol;
            }
            $paginacion = $usuarioModel->paginate($page, 20, $conditions, 'nombre ASC');
            $usuarios = $paginacion['data'];
        }

        $data = [
            'usuarios' => $usuarios,
            'paginacion' => $paginacion,
            'roles' => $rolModel->obtenerTodos(),
            'search' => $search,
            'rol_filtro' => $rol,
            'csrf_token' => $this->generateCSRFToken()
        ];

        $this->view('admin/usuarios', $data);
    }

    public function crearUsuario()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->redirect('/admin/usuarios');
        }

        if (!$this->validateCSRFToken($_POST['csrf_token'] ?? '')) {
            setFlash('error', 'Token de seguridad inválido');
            $this->redirect('/admin/usuarios');
        }

        $errors = $this->validateInput($_POST, [
            'nombre' => 'required|min:2',
            'apellido' => 'required|min:2',
            'email' => 'required|email',
            'password' => 'required|min:8',
            'rol_id' => 'required'
        ]);

        // Verificar email único
        $usuarioModel = new Usuario();
        if ($usuarioModel->buscarPorEmail($_POST['email'])) {
            $errors['email'] = 'Este email ya está registrado';
        }

        if (!empty($errors)) {
            setErrors($errors);
            setOldInput($_POST);
            $this->redirect('/admin/usuarios');
        }

        try {
            $usuarioModel->crearUsuario($_POST);
            setFlash('success', 'Usuario creado exitosamente');
        } catch (Exception $e) {
            setFlash('error', 'Error al crear usuario: ' . $e->getMessage());
        }

        $this->redirect('/admin/usuarios');
    }

    public function actualizarUsuario($id)
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
            $this->redirect('/admin/usuarios');
        }

        // Obtener datos PUT
        parse_str(file_get_contents("php://input"), $_PUT);

        if (!$this->validateCSRFToken($_PUT['csrf_token'] ?? '')) {
            $this->json(['error' => 'Token de seguridad inválido'], 400);
        }

        $usuarioModel = new Usuario();
        $usuario = $usuarioModel->find($id);

        if (!$usuario) {
            $this->json(['error' => 'Usuario no encontrado'], 404);
        }

        $errors = $this->validateInput($_PUT, [
            'nombre' => 'required|min:2',
            'apellido' => 'required|min:2',
            'email' => 'required|email',
            'rol_id' => 'required'
        ]);

        // Verificar email único (excepto el actual)
        $emailExistente = $usuarioModel->buscarPorEmail($_PUT['email']);
        if ($emailExistente && $emailExistente['id'] != $id) {
            $errors['email'] = 'Este email ya está registrado';
        }

        if (!empty($errors)) {
            $this->json(['errors' => $errors], 400);
        }

        try {
            $data = [
                'nombre' => $_PUT['nombre'],
                'apellido' => $_PUT['apellido'],
                'email' => $_PUT['email'],
                'telefono' => $_PUT['telefono'] ?? null,
                'direccion' => $_PUT['direccion'] ?? null,
                'rol_id' => $_PUT['rol_id'],
                'estado' => $_PUT['estado'] ?? 'activo'
            ];

            if (!empty($_PUT['password'])) {
                $data['password'] = password_hash($_PUT['password'], PASSWORD_DEFAULT);
            }

            $usuarioModel->update($id, $data);
            $this->json(['success' => 'Usuario actualizado exitosamente']);
        } catch (Exception $e) {
            $this->json(['error' => 'Error al actualizar usuario: ' . $e->getMessage()], 500);
        }
    }

    public function eliminarUsuario($id)
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
            $this->redirect('/admin/usuarios');
        }

        $usuarioModel = new Usuario();
        $usuario = $usuarioModel->find($id);

        if (!$usuario) {
            $this->json(['error' => 'Usuario no encontrado'], 404);
        }

        try {
            // Soft delete
            $usuarioModel->desactivar($id);
            $this->json(['success' => 'Usuario eliminado exitosamente']);
        } catch (Exception $e) {
            $this->json(['error' => 'Error al eliminar usuario: ' . $e->getMessage()], 500);
        }
    }

    public function cursos()
    {
        $cursoModel = new Curso();

        $page = $_GET['page'] ?? 1;
        $search = $_GET['search'] ?? '';

        if ($search) {
            $cursos = $cursoModel->buscar($search);
            $paginacion = null;
        } else {
            $paginacion = $cursoModel->paginate($page, 15, [], 'fecha_inicio DESC');
            $cursos = $paginacion['data'];
        }

        $data = [
            'cursos' => $cursos,
            'paginacion' => $paginacion,
            'search' => $search,
            'csrf_token' => $this->generateCSRFToken()
        ];

        $this->view('admin/cursos', $data);
    }

    public function crearCurso()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->redirect('/admin/cursos');
        }

        if (!$this->validateCSRFToken($_POST['csrf_token'] ?? '')) {
            setFlash('error', 'Token de seguridad inválido');
            $this->redirect('/admin/cursos');
        }

        $errors = $this->validateInput($_POST, [
            'titulo' => 'required|min:3',
            'descripcion' => 'required|min:10',
            'capacitador_id' => 'required',
            'fecha_inicio' => 'required',
            'fecha_fin' => 'required',
            'duracion_horas' => 'required',
            'max_estudiantes' => 'required'
        ]);

        if (!empty($errors)) {
            setErrors($errors);
            setOldInput($_POST);
            $this->redirect('/admin/cursos');
        }

        try {
            $cursoModel = new Curso();
            $cursoModel->create($_POST);
            setFlash('success', 'Curso creado exitosamente');
        } catch (Exception $e) {
            setFlash('error', 'Error al crear curso: ' . $e->getMessage());
        }

        $this->redirect('/admin/cursos');
    }

    public function actualizarCurso($id)
    {
        // Similar a actualizarUsuario pero para cursos
        if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
            $this->redirect('/admin/cursos');
        }

        parse_str(file_get_contents("php://input"), $_PUT);

        if (!$this->validateCSRFToken($_PUT['csrf_token'] ?? '')) {
            $this->json(['error' => 'Token de seguridad inválido'], 400);
        }

        $cursoModel = new Curso();
        $curso = $cursoModel->find($id);

        if (!$curso) {
            $this->json(['error' => 'Curso no encontrado'], 404);
        }

        try {
            $cursoModel->update($id, $_PUT);
            $this->json(['success' => 'Curso actualizado exitosamente']);
        } catch (Exception $e) {
            $this->json(['error' => 'Error al actualizar curso: ' . $e->getMessage()], 500);
        }
    }

    public function eliminarCurso($id)
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
            $this->redirect('/admin/cursos');
        }

        $cursoModel = new Curso();
        $curso = $cursoModel->find($id);

        if (!$curso) {
            $this->json(['error' => 'Curso no encontrado'], 404);
        }

        try {
            $cursoModel->update($id, ['estado' => 'inactivo']);
            $this->json(['success' => 'Curso eliminado exitosamente']);
        } catch (Exception $e) {
            $this->json(['error' => 'Error al eliminar curso: ' . $e->getMessage()], 500);
        }
    }

    public function materiales()
    {
        $materialModel = new Material();

        $page = $_GET['page'] ?? 1;
        $search = $_GET['search'] ?? '';

        $paginacion = $materialModel->paginate($page, 20, [], 'created_at DESC');

        $data = [
            'materiales' => $paginacion['data'],
            'paginacion' => $paginacion,
            'search' => $search,
            'estadisticas' => $materialModel->obtenerEstadisticas()
        ];

        $this->view('admin/materiales', $data);
    }

    public function reportes()
    {
        $usuarioModel = new Usuario();
        $cursoModel = new Curso();
        $inscripcionModel = new Inscripcion();
        $materialModel = new Material();

        $data = [
            'estadisticas_generales' => [
                'usuarios' => $usuarioModel->obtenerEstadisticas(),
                'cursos' => $cursoModel->obtenerEstadisticas(),
                'inscripciones' => $inscripcionModel->obtenerEstadisticas(),
                'materiales' => $materialModel->obtenerEstadisticas()
            ]
        ];

        $this->view('admin/reportes', $data);
    }

    public function permisos()
    {
        $rolModel = new Rol();
        $permisoModel = new Permiso();

        $data = [
            'roles' => $rolModel->obtenerTodos(),
            'permisos' => $permisoModel->obtenerPermisosPorModulo(),
            'csrf_token' => $this->generateCSRFToken()
        ];

        $this->view('admin/permisos', $data);
    }

    public function configuracion()
    {
        $configuracionModel = new Configuracion();

        $data = [
            'configuraciones' => $configuracionModel->obtenerConfiguracionesAgrupadas(),
            'csrf_token' => $this->generateCSRFToken(),
            'success' => getFlash('success'),
            'error' => getFlash('error')
        ];

        $this->view('admin/configuracion', $data);
    }

    public function guardarConfiguracion()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->redirect('/admin/configuracion');
        }

        if (!$this->validateCSRFToken($_POST['csrf_token'] ?? '')) {
            setFlash('error', 'Token de seguridad inválido');
            $this->redirect('/admin/configuracion');
        }

        try {
            $configuracionModel = new Configuracion();
            $configuracionModel->establecerMultiples($_POST);
            setFlash('success', 'Configuraciones guardadas exitosamente');
        } catch (Exception $e) {
            setFlash('error', 'Error al guardar configuraciones: ' . $e->getMessage());
        }

        $this->redirect('/admin/configuracion');
    }

    public function perfil()
    {
        $user = $this->auth->getUser();
        $perfilModel = new Perfil();

        $data = [
            'usuario' => $perfilModel->obtenerCompleto($user['id']),
            'estadisticas' => $perfilModel->obtenerEstadisticasPerfil($user['id']),
            'csrf_token' => $this->generateCSRFToken()
        ];

        $this->view('admin/perfil', $data);
    }

    public function actualizarPerfil()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->redirect('/admin/perfil');
        }

        if (!$this->validateCSRFToken($_POST['csrf_token'] ?? '')) {
            setFlash('error', 'Token de seguridad inválido');
            $this->redirect('/admin/perfil');
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
                'educacion' => $_POST['educacion'] ?? ''
            ]);

            setFlash('success', 'Perfil actualizado exitosamente');
        } catch (Exception $e) {
            setFlash('error', 'Error al actualizar perfil: ' . $e->getMessage());
        }

        $this->redirect('/admin/perfil');
    }
}
