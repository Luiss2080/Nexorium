<?php

/**
 * Controlador de Configuración
 */
class ConfiguracionController extends Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->requireRole(['admin']);
    }

    public function obtener($categoria = null)
    {
        $configuracionModel = new Configuracion();

        try {
            if ($categoria) {
                $configuraciones = $configuracionModel->obtenerPorCategoria($categoria);
            } else {
                $configuraciones = $configuracionModel->obtenerConfiguracionesAgrupadas();
            }

            $this->json([
                'success' => true,
                'data' => $configuraciones
            ]);
        } catch (Exception $e) {
            $this->json([
                'success' => false,
                'error' => 'Error al obtener configuraciones: ' . $e->getMessage()
            ], 500);
        }
    }

    public function actualizar()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->json(['error' => 'Método no permitido'], 405);
        }

        $input = json_decode(file_get_contents('php://input'), true);

        if (!$this->validateCSRFToken($input['csrf_token'] ?? '')) {
            $this->json(['error' => 'Token de seguridad inválido'], 400);
        }

        $configuraciones = $input['configuraciones'] ?? [];

        if (empty($configuraciones)) {
            $this->json(['error' => 'No hay configuraciones para actualizar'], 400);
        }

        try {
            $configuracionModel = new Configuracion();

            foreach ($configuraciones as $clave => $valor) {
                $configuracionModel->establecerValor($clave, $valor);
            }

            $this->json([
                'success' => true,
                'message' => 'Configuraciones actualizadas exitosamente'
            ]);
        } catch (Exception $e) {
            $this->json([
                'success' => false,
                'error' => 'Error al actualizar configuraciones: ' . $e->getMessage()
            ], 500);
        }
    }

    public function inicializar()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->json(['error' => 'Método no permitido'], 405);
        }

        try {
            $configuracionModel = new Configuracion();
            $configuracionModel->inicializarConfiguraciones();

            $this->json([
                'success' => true,
                'message' => 'Configuraciones inicializadas exitosamente'
            ]);
        } catch (Exception $e) {
            $this->json([
                'success' => false,
                'error' => 'Error al inicializar configuraciones: ' . $e->getMessage()
            ], 500);
        }
    }
}
