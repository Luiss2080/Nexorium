<?php

/**
 * Router del sistema
 */
class Router
{
    private $routes = [];
    private $currentRoute;

    public function __construct()
    {
        $this->routes = include APP_PATH . '../routes/web.php';
    }

    public function dispatch()
    {
        $method = $_SERVER['REQUEST_METHOD'];
        $uri = $this->getUri();

        $route = $this->findRoute($method, $uri);

        if (!$route) {
            $this->handleNotFound();
            return;
        }

        $this->executeRoute($route);
    }

    private function getUri()
    {
        $uri = $_SERVER['REQUEST_URI'];
        $uri = parse_url($uri, PHP_URL_PATH);

        // Remover el prefijo del sistema
        $systemPath = parse_url(SYSTEM_URL, PHP_URL_PATH);
        if (strpos($uri, $systemPath) === 0) {
            $uri = substr($uri, strlen($systemPath));
        }

        return trim($uri, '/');
    }

    private function findRoute($method, $uri)
    {
        foreach ($this->routes as $routePattern => $handler) {
            list($routeMethod, $routePath) = explode('|', $routePattern, 2);

            if ($routeMethod !== $method) {
                continue;
            }

            if ($this->matchRoute($routePath, $uri)) {
                return [
                    'handler' => $handler,
                    'params' => $this->extractParams($routePath, $uri)
                ];
            }
        }

        return null;
    }

    private function matchRoute($routePath, $uri)
    {
        // Convertir parámetros {id} a expresiones regulares
        $pattern = preg_replace('/\{([^}]+)\}/', '([^/]+)', $routePath);
        $pattern = '#^' . $pattern . '$#';

        return preg_match($pattern, $uri);
    }

    private function extractParams($routePath, $uri)
    {
        $params = [];

        // Extraer nombres de parámetros
        preg_match_all('/\{([^}]+)\}/', $routePath, $paramNames);

        // Extraer valores de parámetros
        $pattern = preg_replace('/\{([^}]+)\}/', '([^/]+)', $routePath);
        $pattern = '#^' . $pattern . '$#';

        if (preg_match($pattern, $uri, $matches)) {
            array_shift($matches); // Remover la coincidencia completa

            foreach ($paramNames[1] as $index => $paramName) {
                $params[$paramName] = $matches[$index] ?? null;
            }
        }

        return $params;
    }

    private function executeRoute($route)
    {
        $handler = $route['handler'];
        $params = $route['params'];

        if (strpos($handler, '@') !== false) {
            list($controllerName, $methodName) = explode('@', $handler);

            $controllerClass = $controllerName;
            $controllerFile = APP_PATH . 'controllers/' . $controllerClass . '.php';

            if (!file_exists($controllerFile)) {
                throw new Exception("Controlador no encontrado: $controllerClass");
            }

            require_once $controllerFile;

            if (!class_exists($controllerClass)) {
                throw new Exception("Clase de controlador no encontrada: $controllerClass");
            }

            $controller = new $controllerClass();

            if (!method_exists($controller, $methodName)) {
                throw new Exception("Método no encontrado: $controllerClass::$methodName");
            }

            // Pasar parámetros al método
            call_user_func_array([$controller, $methodName], $params);
        } else {
            // Handler es una función anónima
            call_user_func_array($handler, $params);
        }
    }

    private function handleNotFound()
    {
        http_response_code(404);
        echo "Página no encontrada";
    }
}
