<?php

/**
 * Clase Auth - Manejo de autenticación y autorización
 */
class Auth
{
    private $db;

    public function __construct()
    {
        $this->db = Database::getInstance();
    }

    public function login($email, $password)
    {
        try {
            $user = $this->db->fetch(
                "SELECT u.*, r.nombre as rol_nombre, r.id as rol_id 
                 FROM usuarios u 
                 JOIN roles r ON u.rol_id = r.id 
                 WHERE u.email = ? AND u.estado = 'activo'",
                [$email]
            );

            if ($user && password_verify($password, $user['password'])) {
                $this->setUserSession($user);
                $this->updateLastLogin($user['id']);
                return true;
            }

            return false;
        } catch (Exception $e) {
            error_log("Login error: " . $e->getMessage());
            return false;
        }
    }

    public function logout()
    {
        session_destroy();
        session_start();
        session_regenerate_id(true);
    }

    public function isLoggedIn()
    {
        return isset($_SESSION['user_id']) && !empty($_SESSION['user_id']);
    }

    public function getUser()
    {
        if (!$this->isLoggedIn()) {
            return null;
        }

        return [
            'id' => $_SESSION['user_id'],
            'nombre' => $_SESSION['user_nombre'],
            'email' => $_SESSION['user_email'],
            'rol_id' => $_SESSION['user_rol_id'],
            'rol_nombre' => $_SESSION['user_rol_nombre']
        ];
    }

    public function getUserId()
    {
        return $_SESSION['user_id'] ?? null;
    }

    public function hasRole($roles)
    {
        if (!$this->isLoggedIn()) {
            return false;
        }

        if (is_string($roles)) {
            $roles = [$roles];
        }

        $userRole = $_SESSION['user_rol_nombre'] ?? '';
        return in_array($userRole, $roles);
    }

    public function hasPermission($permission)
    {
        if (!$this->isLoggedIn()) {
            return false;
        }

        $userId = $this->getUserId();
        $hasPermission = $this->db->fetch(
            "SELECT COUNT(*) as count 
             FROM permisos_usuario pu 
             JOIN permisos p ON pu.permiso_id = p.id 
             WHERE pu.usuario_id = ? AND p.nombre = ?",
            [$userId, $permission]
        );

        return $hasPermission['count'] > 0;
    }

    public function getDashboardRoute()
    {
        if (!$this->isLoggedIn()) {
            return '/auth/login';
        }

        $role = $_SESSION['user_rol_nombre'] ?? '';

        switch ($role) {
            case 'admin':
                return '/admin/dashboard';
            case 'capacitador':
                return '/capacitador/dashboard';
            case 'estudiante':
                return '/estudiante/dashboard';
            default:
                return '/auth/login';
        }
    }

    private function setUserSession($user)
    {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_nombre'] = $user['nombre'];
        $_SESSION['user_email'] = $user['email'];
        $_SESSION['user_rol_id'] = $user['rol_id'];
        $_SESSION['user_rol_nombre'] = $user['rol_nombre'];

        session_regenerate_id(true);
    }

    private function updateLastLogin($userId)
    {
        $this->db->execute(
            "UPDATE usuarios SET ultimo_acceso = NOW() WHERE id = ?",
            [$userId]
        );
    }

    public function hashPassword($password)
    {
        return password_hash($password, HASH_ALGO);
    }

    public function generateToken($length = 32)
    {
        return bin2hex(random_bytes($length));
    }

    public function checkPasswordStrength($password)
    {
        $errors = [];

        if (strlen($password) < 8) {
            $errors[] = "La contraseña debe tener al menos 8 caracteres";
        }

        if (!preg_match('/[A-Z]/', $password)) {
            $errors[] = "La contraseña debe contener al menos una letra mayúscula";
        }

        if (!preg_match('/[a-z]/', $password)) {
            $errors[] = "La contraseña debe contener al menos una letra minúscula";
        }

        if (!preg_match('/[0-9]/', $password)) {
            $errors[] = "La contraseña debe contener al menos un número";
        }

        return $errors;
    }
}
