<?php

/**
 * Clase Controller base
 */
abstract class Controller
{
    protected $db;
    protected $auth;

    public function __construct()
    {
        $this->db = Database::getInstance();
        $this->auth = new Auth();

        // Verificar autenticación en todos los controladores excepto AuthController
        if (get_class($this) !== 'AuthController') {
            $this->requireAuth();
        }
    }

    protected function requireAuth()
    {
        if (!$this->auth->isLoggedIn()) {
            $this->redirect('/auth/login');
        }
    }

    protected function requireRole($roles)
    {
        if (!$this->auth->hasRole($roles)) {
            $this->redirect('/dashboard');
        }
    }

    protected function redirect($path)
    {
        header('Location: ' . SYSTEM_URL . ltrim($path, '/'));
        exit();
    }

    protected function view($view, $data = [])
    {
        $viewPath = APP_PATH . 'views/' . $view . '.php';

        if (!file_exists($viewPath)) {
            throw new Exception("Vista no encontrada: $view");
        }

        extract($data);
        include $viewPath;
    }

    protected function json($data, $statusCode = 200)
    {
        http_response_code($statusCode);
        header('Content-Type: application/json');
        echo json_encode($data);
        exit();
    }

    protected function validateInput($data, $rules)
    {
        $errors = [];

        foreach ($rules as $field => $rule) {
            $value = $data[$field] ?? null;

            if (strpos($rule, 'required') !== false && empty($value)) {
                $errors[$field] = "El campo $field es requerido";
                continue;
            }

            if (strpos($rule, 'email') !== false && !filter_var($value, FILTER_VALIDATE_EMAIL)) {
                $errors[$field] = "El campo $field debe ser un email válido";
            }

            if (preg_match('/min:(\d+)/', $rule, $matches)) {
                $min = $matches[1];
                if (strlen($value) < $min) {
                    $errors[$field] = "El campo $field debe tener al menos $min caracteres";
                }
            }

            if (preg_match('/max:(\d+)/', $rule, $matches)) {
                $max = $matches[1];
                if (strlen($value) > $max) {
                    $errors[$field] = "El campo $field no puede tener más de $max caracteres";
                }
            }
        }

        return $errors;
    }

    protected function generateCSRFToken()
    {
        if (!isset($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(CSRF_TOKEN_LENGTH));
        }
        return $_SESSION['csrf_token'];
    }

    protected function validateCSRFToken($token)
    {
        return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
    }
}
