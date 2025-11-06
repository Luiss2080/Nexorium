<?php

/**
 * Controlador de Autenticación
 */
class AuthController extends Controller
{

    public function __construct()
    {
        $this->db = Database::getInstance();
        // No requerimos autenticación para este controlador
    }

    public function showLogin()
    {
        // Si ya está autenticado, redirigir al dashboard
        if (isset($_SESSION['user_id'])) {
            $auth = new Auth();
            $this->redirect($auth->getDashboardRoute());
        }

        $this->view('auth/login', [
            'csrf_token' => $this->generateCSRFToken(),
            'error' => getFlash('error'),
            'success' => getFlash('success')
        ]);
    }

    public function login()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->redirect('/auth/login');
        }

        // Validar CSRF
        if (!$this->validateCSRFToken($_POST['csrf_token'] ?? '')) {
            setFlash('error', 'Token de seguridad inválido');
            $this->redirect('/auth/login');
        }

        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';

        // Validación básica
        $errors = $this->validateInput($_POST, [
            'email' => 'required|email',
            'password' => 'required|min:6'
        ]);

        if (!empty($errors)) {
            setErrors($errors);
            setOldInput($_POST);
            $this->redirect('/auth/login');
        }

        // Intentar login
        $auth = new Auth();
        if ($auth->login($email, $password)) {
            setFlash('success', 'Bienvenido al sistema');
            $this->redirect($auth->getDashboardRoute());
        } else {
            setFlash('error', 'Credenciales incorrectas');
            setOldInput(['email' => $email]);
            $this->redirect('/auth/login');
        }
    }

    public function logout()
    {
        $auth = new Auth();
        $auth->logout();
        setFlash('success', 'Sesión cerrada correctamente');
        $this->redirect('/auth/login');
    }

    public function showRegister()
    {
        $this->view('auth/registro', [
            'csrf_token' => $this->generateCSRFToken(),
            'error' => getFlash('error'),
            'success' => getFlash('success')
        ]);
    }

    public function register()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->redirect('/auth/registro');
        }

        // Validar CSRF
        if (!$this->validateCSRFToken($_POST['csrf_token'] ?? '')) {
            setFlash('error', 'Token de seguridad inválido');
            $this->redirect('/auth/registro');
        }

        // Validación
        $errors = $this->validateInput($_POST, [
            'nombre' => 'required|min:2',
            'apellido' => 'required|min:2',
            'email' => 'required|email',
            'password' => 'required|min:8',
            'password_confirmation' => 'required'
        ]);

        // Validar que las contraseñas coincidan
        if ($_POST['password'] !== $_POST['password_confirmation']) {
            $errors['password_confirmation'] = 'Las contraseñas no coinciden';
        }

        // Verificar que el email no exista
        $usuarioModel = new Usuario();
        if ($usuarioModel->buscarPorEmail($_POST['email'])) {
            $errors['email'] = 'Este email ya está registrado';
        }

        if (!empty($errors)) {
            setErrors($errors);
            setOldInput($_POST);
            $this->redirect('/auth/registro');
        }

        try {
            // Crear usuario con rol de estudiante por defecto
            $usuarioId = $usuarioModel->crearUsuario([
                'nombre' => $_POST['nombre'],
                'apellido' => $_POST['apellido'],
                'email' => $_POST['email'],
                'password' => $_POST['password'],
                'rol_id' => ROLE_STUDENT,
                'estado' => 'activo'
            ]);

            setFlash('success', 'Registro exitoso. Ya puedes iniciar sesión.');
            $this->redirect('/auth/login');
        } catch (Exception $e) {
            setFlash('error', 'Error al registrar usuario: ' . $e->getMessage());
            setOldInput($_POST);
            $this->redirect('/auth/registro');
        }
    }

    public function showRecover()
    {
        $this->view('auth/recuperar', [
            'csrf_token' => $this->generateCSRFToken(),
            'error' => getFlash('error'),
            'success' => getFlash('success')
        ]);
    }

    public function recover()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->redirect('/auth/recuperar');
        }

        // Validar CSRF
        if (!$this->validateCSRFToken($_POST['csrf_token'] ?? '')) {
            setFlash('error', 'Token de seguridad inválido');
            $this->redirect('/auth/recuperar');
        }

        $email = $_POST['email'] ?? '';

        if (!isValidEmail($email)) {
            setFlash('error', 'Email inválido');
            $this->redirect('/auth/recuperar');
        }

        $usuarioModel = new Usuario();
        $usuario = $usuarioModel->buscarPorEmail($email);

        if ($usuario) {
            // Generar token de recuperación
            $token = generateToken();

            // Aquí implementarías el envío de email
            // Por ahora solo mostramos mensaje de éxito
            setFlash('success', 'Si el email existe, recibirás instrucciones para recuperar tu contraseña.');
        } else {
            setFlash('success', 'Si el email existe, recibirás instrucciones para recuperar tu contraseña.');
        }

        $this->redirect('/auth/login');
    }
}
