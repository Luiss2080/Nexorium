<?php

/**
 * NEXORIUM TRADING ACADEMY - LOGOUT
 * Cierre de sesión y limpieza de datos
 */

session_start();

// Limpiar todas las variables de sesión
session_unset();

// Destruir la sesión
session_destroy();

// Redireccionar al login con mensaje
header('Location: http://localhost/Nexorium/system/login.php?message=logout');
exit;
