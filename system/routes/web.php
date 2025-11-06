<?php

/**
 * Archivo de rutas del sistema
 */

// Rutas de autenticación
$routes = [
    // Auth routes
    'GET|auth/login' => 'AuthController@showLogin',
    'POST|auth/login' => 'AuthController@login',
    'GET|auth/logout' => 'AuthController@logout',
    'GET|auth/registro' => 'AuthController@showRegister',
    'POST|auth/registro' => 'AuthController@register',
    'GET|auth/recuperar' => 'AuthController@showRecover',
    'POST|auth/recuperar' => 'AuthController@recover',

    // Dashboard routes
    'GET|dashboard' => 'DashboardController@index',

    // Admin routes
    'GET|admin/dashboard' => 'AdminController@dashboard',
    'GET|admin/usuarios' => 'AdminController@usuarios',
    'POST|admin/usuarios' => 'AdminController@crearUsuario',
    'PUT|admin/usuarios/{id}' => 'AdminController@actualizarUsuario',
    'DELETE|admin/usuarios/{id}' => 'AdminController@eliminarUsuario',
    'GET|admin/cursos' => 'AdminController@cursos',
    'POST|admin/cursos' => 'AdminController@crearCurso',
    'PUT|admin/cursos/{id}' => 'AdminController@actualizarCurso',
    'DELETE|admin/cursos/{id}' => 'AdminController@eliminarCurso',
    'GET|admin/materiales' => 'AdminController@materiales',
    'GET|admin/reportes' => 'AdminController@reportes',
    'GET|admin/permisos' => 'AdminController@permisos',
    'GET|admin/configuracion' => 'AdminController@configuracion',
    'POST|admin/configuracion' => 'AdminController@guardarConfiguracion',
    'GET|admin/perfil' => 'AdminController@perfil',
    'POST|admin/perfil' => 'AdminController@actualizarPerfil',

    // Capacitador routes
    'GET|capacitador/dashboard' => 'CapacitadorController@dashboard',
    'GET|capacitador/mis-cursos' => 'CapacitadorController@misCursos',
    'GET|capacitador/curso/{id}' => 'CapacitadorController@verCurso',
    'GET|capacitador/mis-materiales' => 'CapacitadorController@misMateriales',
    'POST|capacitador/materiales' => 'CapacitadorController@subirMaterial',
    'DELETE|capacitador/materiales/{id}' => 'CapacitadorController@eliminarMaterial',
    'GET|capacitador/estudiantes' => 'CapacitadorController@estudiantes',
    'GET|capacitador/asistencia' => 'CapacitadorController@asistencia',
    'POST|capacitador/asistencia' => 'CapacitadorController@registrarAsistencia',
    'GET|capacitador/perfil' => 'CapacitadorController@perfil',
    'POST|capacitador/perfil' => 'CapacitadorController@actualizarPerfil',

    // Estudiante routes
    'GET|estudiante/dashboard' => 'EstudianteController@dashboard',
    'GET|estudiante/mis-cursos' => 'EstudianteController@misCursos',
    'GET|estudiante/curso/{id}' => 'EstudianteController@verCurso',
    'POST|estudiante/inscribirse/{id}' => 'EstudianteController@inscribirse',
    'GET|estudiante/mis-materiales' => 'EstudianteController@misMateriales',
    'GET|estudiante/descargar/{id}' => 'EstudianteController@descargarMaterial',
    'GET|estudiante/perfil' => 'EstudianteController@perfil',
    'POST|estudiante/perfil' => 'EstudianteController@actualizarPerfil',

    // API routes (para AJAX)
    'GET|api/cursos' => 'CursoController@listar',
    'GET|api/usuarios' => 'UsuarioController@listar',
    'GET|api/materiales/{curso_id}' => 'MaterialController@listarPorCurso',

    // Rutas por defecto
    'GET|' => 'DashboardController@index',
    'GET|/' => 'DashboardController@index',
];

return $routes;
