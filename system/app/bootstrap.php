<?php

/**
 * Bootstrap del sistema - Archivo de inicialización
 */

// Incluir configuración
require_once __DIR__ . '/../config/config.php';

// Autoloader simple
spl_autoload_register(function ($class) {
    $paths = [
        APP_PATH . 'core/',
        APP_PATH . 'controllers/',
        APP_PATH . 'models/',
        APP_PATH . 'middlewares/'
    ];

    foreach ($paths as $path) {
        $file = $path . $class . '.php';
        if (file_exists($file)) {
            require_once $file;
            return;
        }
    }
});

// Incluir funciones helper
require_once APP_PATH . 'helpers/funciones.php';

// Manejo de errores
set_error_handler(function ($severity, $message, $file, $line) {
    if (!(error_reporting() & $severity)) {
        return false;
    }

    $errorMessage = "Error: $message en $file línea $line";

    if (DEBUG_MODE) {
        echo "<div style='color: red; background: #fff; padding: 10px; border: 1px solid red; margin: 10px;'>";
        echo "<strong>Error:</strong> $message<br>";
        echo "<strong>Archivo:</strong> $file<br>";
        echo "<strong>Línea:</strong> $line<br>";
        echo "</div>";
    }

    error_log($errorMessage);
    return true;
});

// Manejo de excepciones
set_exception_handler(function ($exception) {
    $errorMessage = "Excepción no capturada: " . $exception->getMessage() .
        " en " . $exception->getFile() . " línea " . $exception->getLine();

    if (DEBUG_MODE) {
        echo "<div style='color: red; background: #fff; padding: 10px; border: 1px solid red; margin: 10px;'>";
        echo "<strong>Excepción:</strong> " . $exception->getMessage() . "<br>";
        echo "<strong>Archivo:</strong> " . $exception->getFile() . "<br>";
        echo "<strong>Línea:</strong> " . $exception->getLine() . "<br>";
        echo "<strong>Stack trace:</strong><br>";
        echo "<pre>" . $exception->getTraceAsString() . "</pre>";
        echo "</div>";
    } else {
        echo "Ha ocurrido un error interno. Por favor, inténtelo más tarde.";
    }

    error_log($errorMessage);
});

// Inicializar router y despachar la solicitud
try {
    $router = new Router();
    $router->dispatch();
} catch (Exception $e) {
    if (DEBUG_MODE) {
        echo "Error del router: " . $e->getMessage();
    } else {
        echo "Error interno del servidor";
    }
    error_log("Router error: " . $e->getMessage());
}
