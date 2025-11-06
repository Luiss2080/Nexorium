<?php

/**
 * Controlador Dashboard - Redirige al dashboard correspondiente según el rol
 */
class DashboardController extends Controller
{

    public function index()
    {
        // Obtener el usuario actual
        $user = $this->auth->getUser();

        if (!$user) {
            $this->redirect('/auth/login');
        }

        // Redireccionar según el rol
        switch ($user['rol_nombre']) {
            case 'admin':
                $this->redirect('/admin/dashboard');
                break;
            case 'capacitador':
                $this->redirect('/capacitador/dashboard');
                break;
            case 'estudiante':
                $this->redirect('/estudiante/dashboard');
                break;
            default:
                $this->redirect('/auth/login');
        }
    }
}
