<?php

/**
 * Clase View - Manejo de vistas y layouts
 */
class View
{
    private $data = [];
    private $layout = 'layouts/main';

    public function __construct($data = [])
    {
        $this->data = $data;
    }

    public function render($view, $data = [])
    {
        $this->data = array_merge($this->data, $data);

        // Capturar el contenido de la vista
        ob_start();
        $this->includeView($view);
        $content = ob_get_clean();

        // Si hay un layout, renderizar con el layout
        if ($this->layout) {
            $this->data['content'] = $content;
            $this->includeView($this->layout);
        } else {
            echo $content;
        }
    }

    public function setLayout($layout)
    {
        $this->layout = $layout;
        return $this;
    }

    public function withoutLayout()
    {
        $this->layout = null;
        return $this;
    }

    private function includeView($view)
    {
        $viewPath = APP_PATH . 'views/' . $view . '.php';

        if (!file_exists($viewPath)) {
            throw new Exception("Vista no encontrada: $view");
        }

        extract($this->data);
        include $viewPath;
    }

    public function partial($view, $data = [])
    {
        $partialData = array_merge($this->data, $data);
        $viewPath = APP_PATH . 'views/' . $view . '.php';

        if (!file_exists($viewPath)) {
            throw new Exception("Partial no encontrado: $view");
        }

        extract($partialData);
        include $viewPath;
    }

    public function escape($string)
    {
        return htmlspecialchars($string, ENT_QUOTES, 'UTF-8');
    }

    public function url($path = '')
    {
        return SYSTEM_URL . ltrim($path, '/');
    }

    public function asset($path)
    {
        return ASSETS_URL . ltrim($path, '/');
    }

    public function csrf()
    {
        return $_SESSION['csrf_token'] ?? '';
    }

    public function old($key, $default = '')
    {
        return $_SESSION['old'][$key] ?? $default;
    }

    public function error($key)
    {
        return $_SESSION['errors'][$key] ?? '';
    }

    public function hasError($key)
    {
        return isset($_SESSION['errors'][$key]);
    }

    public function flash($key, $default = '')
    {
        $value = $_SESSION['flash'][$key] ?? $default;
        unset($_SESSION['flash'][$key]);
        return $value;
    }

    public function formatDate($date, $format = 'd/m/Y')
    {
        if (!$date) return '';
        return date($format, strtotime($date));
    }

    public function formatDateTime($datetime, $format = 'd/m/Y H:i')
    {
        if (!$datetime) return '';
        return date($format, strtotime($datetime));
    }

    public function truncate($string, $length = 100, $suffix = '...')
    {
        if (strlen($string) <= $length) {
            return $string;
        }
        return substr($string, 0, $length) . $suffix;
    }
}
