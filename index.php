<?php

/**
 * NEXORIUM TRADING ACADEMY
 * Punto de entrada principal del sitio web
 * Redirige automáticamente a la aplicación web
 */

// Verificar si el servidor de desarrollo está ejecutándose
$devServerUrl = 'http://localhost:3001/';
$websiteUrl = '/Nexorium/website/';

// Función para verificar si el servidor de desarrollo está activo
function isDevServerRunning($url)
{
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_NOBODY, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 2);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return $httpCode === 200;
}

// Si el servidor de desarrollo está activo, redirigir allí
if (isDevServerRunning($devServerUrl)) {
    header('Location: ' . $devServerUrl);
} else {
    // Si no, redirigir a la carpeta website
    header('Location: ' . $websiteUrl);
}

exit();
