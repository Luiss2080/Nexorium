<?php

/**
 * Funciones helper del sistema
 */

/**
 * Redireccionar a una URL
 */
function redirect($url, $statusCode = 302)
{
    header('Location: ' . $url, true, $statusCode);
    exit();
}

/**
 * Obtener URL del sistema
 */
function url($path = '')
{
    return SYSTEM_URL . ltrim($path, '/');
}

/**
 * Obtener URL de assets
 */
function asset($path)
{
    return ASSETS_URL . ltrim($path, '/');
}

/**
 * Escapar HTML
 */
function e($string)
{
    return htmlspecialchars($string, ENT_QUOTES, 'UTF-8');
}

/**
 * Debug y dump
 */
function dd($data)
{
    echo '<pre>';
    var_dump($data);
    echo '</pre>';
    die();
}

/**
 * Formatear fecha
 */
function formatDate($date, $format = 'd/m/Y')
{
    if (!$date) return '';
    return date($format, strtotime($date));
}

/**
 * Formatear fecha y hora
 */
function formatDateTime($datetime, $format = 'd/m/Y H:i')
{
    if (!$datetime) return '';
    return date($format, strtotime($datetime));
}

/**
 * Truncar texto
 */
function truncate($string, $length = 100, $suffix = '...')
{
    if (strlen($string) <= $length) {
        return $string;
    }
    return substr($string, 0, $length) . $suffix;
}

/**
 * Validar email
 */
function isValidEmail($email)
{
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Generar token aleatorio
 */
function generateToken($length = 32)
{
    return bin2hex(random_bytes($length));
}

/**
 * Subir archivo
 */
function uploadFile($file, $directory, $allowedTypes = null)
{
    if (!$file || $file['error'] !== UPLOAD_ERR_OK) {
        return false;
    }

    $allowedTypes = $allowedTypes ?: ALLOWED_EXTENSIONS;
    $fileExtension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

    if (!in_array($fileExtension, $allowedTypes)) {
        return false;
    }

    if ($file['size'] > MAX_FILE_SIZE) {
        return false;
    }

    $fileName = generateToken(16) . '.' . $fileExtension;
    $uploadPath = STORAGE_PATH . $directory . '/' . $fileName;

    if (!is_dir(dirname($uploadPath))) {
        mkdir(dirname($uploadPath), 0755, true);
    }

    if (move_uploaded_file($file['tmp_name'], $uploadPath)) {
        return $fileName;
    }

    return false;
}

/**
 * Obtener tamaño de archivo legible
 */
function humanFileSize($size, $precision = 2)
{
    $units = ['B', 'KB', 'MB', 'GB', 'TB'];

    for ($i = 0; $size >= 1024 && $i < count($units) - 1; $i++) {
        $size /= 1024;
    }

    return round($size, $precision) . ' ' . $units[$i];
}

/**
 * Validar CSRF token
 */
function csrfToken()
{
    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = generateToken();
    }
    return $_SESSION['csrf_token'];
}

/**
 * Validar CSRF
 */
function validateCSRF($token)
{
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

/**
 * Flash messages
 */
function setFlash($key, $message)
{
    $_SESSION['flash'][$key] = $message;
}

function getFlash($key, $default = '')
{
    $message = $_SESSION['flash'][$key] ?? $default;
    unset($_SESSION['flash'][$key]);
    return $message;
}

function hasFlash($key)
{
    return isset($_SESSION['flash'][$key]);
}

/**
 * Old input
 */
function setOldInput($data)
{
    $_SESSION['old'] = $data;
}

function getOldInput($key, $default = '')
{
    return $_SESSION['old'][$key] ?? $default;
}

function clearOldInput()
{
    unset($_SESSION['old']);
}

/**
 * Errores de validación
 */
function setErrors($errors)
{
    $_SESSION['errors'] = $errors;
}

function getError($key, $default = '')
{
    return $_SESSION['errors'][$key] ?? $default;
}

function hasError($key)
{
    return isset($_SESSION['errors'][$key]);
}

function clearErrors()
{
    unset($_SESSION['errors']);
}

/**
 * Paginación
 */
function paginate($currentPage, $totalPages, $url)
{
    $pagination = '<nav><ul class="pagination">';

    // Botón anterior
    if ($currentPage > 1) {
        $pagination .= '<li><a href="' . $url . '?page=' . ($currentPage - 1) . '">&laquo; Anterior</a></li>';
    }

    // Números de página
    for ($i = max(1, $currentPage - 2); $i <= min($totalPages, $currentPage + 2); $i++) {
        $active = $i == $currentPage ? 'class="active"' : '';
        $pagination .= '<li ' . $active . '><a href="' . $url . '?page=' . $i . '">' . $i . '</a></li>';
    }

    // Botón siguiente
    if ($currentPage < $totalPages) {
        $pagination .= '<li><a href="' . $url . '?page=' . ($currentPage + 1) . '">Siguiente &raquo;</a></li>';
    }

    $pagination .= '</ul></nav>';
    return $pagination;
}

/**
 * Crear breadcrumb
 */
function breadcrumb($items)
{
    $breadcrumb = '<nav aria-label="breadcrumb"><ol class="breadcrumb">';

    foreach ($items as $item) {
        if (isset($item['url'])) {
            $breadcrumb .= '<li class="breadcrumb-item"><a href="' . $item['url'] . '">' . $item['text'] . '</a></li>';
        } else {
            $breadcrumb .= '<li class="breadcrumb-item active" aria-current="page">' . $item['text'] . '</li>';
        }
    }

    $breadcrumb .= '</ol></nav>';
    return $breadcrumb;
}

/**
 * Generar slug
 */
function generateSlug($string)
{
    $string = strtolower($string);
    $string = preg_replace('/[^a-z0-9-]/', '-', $string);
    $string = preg_replace('/-+/', '-', $string);
    return trim($string, '-');
}

/**
 * Verificar si el usuario está autenticado
 */
function isAuth()
{
    return isset($_SESSION['user_id']) && !empty($_SESSION['user_id']);
}

/**
 * Obtener usuario actual
 */
function currentUser()
{
    if (!isAuth()) {
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

/**
 * Verificar rol
 */
function hasRole($roles)
{
    if (!isAuth()) {
        return false;
    }

    if (is_string($roles)) {
        $roles = [$roles];
    }

    $userRole = $_SESSION['user_rol_nombre'] ?? '';
    return in_array($userRole, $roles);
}
