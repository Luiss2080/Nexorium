<?php

/**
 * Configuración principal del sistema Nexorium
 */

// Configuración de la base de datos
define('DB_HOST', 'localhost');
define('DB_NAME', 'nexorium_db');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

// Configuración de rutas
define('BASE_URL', 'http://localhost/Nexorium/');
define('SYSTEM_URL', BASE_URL . 'system/');
define('ASSETS_URL', SYSTEM_URL . 'public/assets/');

// Configuración de directorios
define('ROOT_PATH', dirname(dirname(__FILE__)) . '/');
define('APP_PATH', ROOT_PATH . 'app/');
define('PUBLIC_PATH', ROOT_PATH . 'public/');
define('STORAGE_PATH', ROOT_PATH . 'storage/');

// Configuración de sesiones
define('SESSION_LIFETIME', 3600); // 1 hora
define('SESSION_NAME', 'nexorium_session');

// Configuración de archivos
define('MAX_FILE_SIZE', 10 * 1024 * 1024); // 10MB
define('ALLOWED_EXTENSIONS', ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'mp4', 'avi', 'jpg', 'jpeg', 'png']);

// Configuración de seguridad
define('HASH_ALGO', PASSWORD_DEFAULT);
define('CSRF_TOKEN_LENGTH', 32);

// Configuración de roles
define('ROLE_ADMIN', 1);
define('ROLE_TRAINER', 2);
define('ROLE_STUDENT', 3);

// Configuración de debugging
define('DEBUG_MODE', true);
define('ERROR_REPORTING', E_ALL);

// Configuración de email (para futuras implementaciones)
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USER', '');
define('SMTP_PASS', '');

// Timezone
date_default_timezone_set('America/La_Paz');

// Configurar reporte de errores
if (DEBUG_MODE) {
    error_reporting(ERROR_REPORTING);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}

// Configuración de sesión
ini_set('session.gc_maxlifetime', SESSION_LIFETIME);
session_name(SESSION_NAME);
session_start();
