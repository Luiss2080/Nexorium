<?php

/**
 * Controlador de Materiales (API)
 */
class MaterialController extends Controller
{

    public function listarPorCurso($curso_id)
    {
        $materialModel = new Material();
        $user = $this->auth->getUser();

        try {
            $materiales = $materialModel->obtenerPorCurso($curso_id, $user['id']);

            $this->json([
                'success' => true,
                'data' => $materiales
            ]);
        } catch (Exception $e) {
            $this->json([
                'success' => false,
                'error' => 'Error al obtener materiales: ' . $e->getMessage()
            ], 500);
        }
    }

    public function obtener($id)
    {
        $materialModel = new Material();

        try {
            $material = $materialModel->find($id);

            if (!$material) {
                $this->json([
                    'success' => false,
                    'error' => 'Material no encontrado'
                ], 404);
            }

            $this->json([
                'success' => true,
                'data' => $material
            ]);
        } catch (Exception $e) {
            $this->json([
                'success' => false,
                'error' => 'Error al obtener material: ' . $e->getMessage()
            ], 500);
        }
    }

    public function verificarAcceso($id)
    {
        $materialModel = new Material();
        $user = $this->auth->getUser();

        try {
            $puedeAcceder = $materialModel->puedeDescargar($id, $user['id']);

            $this->json([
                'success' => true,
                'puede_acceder' => $puedeAcceder
            ]);
        } catch (Exception $e) {
            $this->json([
                'success' => false,
                'error' => 'Error al verificar acceso: ' . $e->getMessage()
            ], 500);
        }
    }
}
