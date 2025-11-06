<?php

/**
 * Controlador de Permisos
 */
class PermisoController extends Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->requireRole(['admin']);
    }

    public function listar()
    {
        $permisoModel = new Permiso();

        try {
            $permisos = $permisoModel->obtenerPermisosPorModulo();

            $this->json([
                'success' => true,
                'data' => $permisos
            ]);
        } catch (Exception $e) {
            $this->json([
                'success' => false,
                'error' => 'Error al obtener permisos: ' . $e->getMessage()
            ], 500);
        }
    }

    public function asignarRol()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->json(['error' => 'Método no permitido'], 405);
        }

        $input = json_decode(file_get_contents('php://input'), true);

        if (!$this->validateCSRFToken($input['csrf_token'] ?? '')) {
            $this->json(['error' => 'Token de seguridad inválido'], 400);
        }

        $rol_id = $input['rol_id'] ?? null;
        $permiso_id = $input['permiso_id'] ?? null;

        if (!$rol_id || !$permiso_id) {
            $this->json(['error' => 'Datos incompletos'], 400);
        }

        try {
            $rolModel = new Rol();
            $rolModel->asignarPermiso($rol_id, $permiso_id);

            $this->json([
                'success' => true,
                'message' => 'Permiso asignado exitosamente'
            ]);
        } catch (Exception $e) {
            $this->json([
                'success' => false,
                'error' => 'Error al asignar permiso: ' . $e->getMessage()
            ], 500);
        }
    }

    public function revocarRol()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
            $this->json(['error' => 'Método no permitido'], 405);
        }

        $input = json_decode(file_get_contents('php://input'), true);

        $rol_id = $input['rol_id'] ?? null;
        $permiso_id = $input['permiso_id'] ?? null;

        if (!$rol_id || !$permiso_id) {
            $this->json(['error' => 'Datos incompletos'], 400);
        }

        try {
            $rolModel = new Rol();
            $rolModel->revocarPermiso($rol_id, $permiso_id);

            $this->json([
                'success' => true,
                'message' => 'Permiso revocado exitosamente'
            ]);
        } catch (Exception $e) {
            $this->json([
                'success' => false,
                'error' => 'Error al revocar permiso: ' . $e->getMessage()
            ], 500);
        }
    }

    public function sincronizar()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->json(['error' => 'Método no permitido'], 405);
        }

        try {
            $permisoModel = new Permiso();
            $permisoModel->sincronizarPermisos();

            $this->json([
                'success' => true,
                'message' => 'Permisos sincronizados exitosamente'
            ]);
        } catch (Exception $e) {
            $this->json([
                'success' => false,
                'error' => 'Error al sincronizar permisos: ' . $e->getMessage()
            ], 500);
        }
    }
}
