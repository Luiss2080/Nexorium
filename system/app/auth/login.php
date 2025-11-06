<?php

/**
 * NEXORIUM TRADING ACADEMY - LOGIN SYSTEM
 * Página de inicio de sesión que conecta website con system
 */

session_start();

// Verificar si ya está logueado
if (isset($_SESSION['user_id'])) {
    header('Location: http://localhost/Nexorium/system/app/views/dashboard/');
    exit;
} // Variables para el formulario
$error_message = '';
$success_message = '';

// Procesar el login si se envía el formulario
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    // Validaciones básicas
    if (empty($email) || empty($password)) {
        $error_message = 'Por favor, completa todos los campos.';
    } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error_message = 'Por favor, ingresa un email válido.';
    } else {
        // Aquí iría la lógica de autenticación con la base de datos
        // Por ahora, usaremos credenciales de ejemplo
        if ($email === 'admin@nexorium.com' && $password === 'admin123') {
            $_SESSION['user_id'] = 1;
            $_SESSION['user_email'] = $email;
            $_SESSION['user_name'] = 'Administrador';
            $_SESSION['user_role'] = 'admin';

            // Redireccionar al dashboard
            header('Location: http://localhost/Nexorium/system/app/views/dashboard/');
            exit;
        } else {
            $error_message = 'Credenciales incorrectas. Inténtalo nuevamente.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Acceso Profesional - NEXORIUM Trading Academy</title>
    <link rel="icon" type="image/png" href="http://localhost/Nexorium/website/public/images/LogoNexorium.png">

    <!-- Precargar fuentes -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

    <!-- CSS del login -->
    <link rel="stylesheet" href="http://localhost/Nexorium/system/public/assets/css/login.css">

    <!-- Meta tags para SEO -->
    <meta name="description" content="Accede a tu cuenta en NEXORIUM Trading Academy. Plataforma profesional de trading y educación financiera.">
    <meta name="keywords" content="login, nexorium, trading, academia, iniciar sesión">
    <meta name="robots" content="noindex, nofollow">

    <!-- Open Graph -->
    <meta property="og:title" content="Iniciar Sesión - NEXORIUM Trading Academy">
    <meta property="og:description" content="Accede a tu cuenta en NEXORIUM Trading Academy">
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?php echo $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']; ?>">
</head>

<body>
    <!-- Background animado -->
    <div class="login-background">
        <div class="bg-shapes">
            <div class="shape shape-1"></div>
            <div class="shape shape-2"></div>
            <div class="shape shape-3"></div>
            <div class="shape shape-4"></div>
        </div>
        <div class="bg-grid"></div>
    </div>

    <!-- Contenedor principal flotante -->
    <div class="main-login-wrapper">
        <div class="floating-container">

            <!-- Panel Izquierdo - Branding Profesional -->
            <div class="login-branding">
                <!-- Efectos de background -->
                <div class="branding-effects">
                    <div class="gradient-mesh"></div>
                    <div class="floating-elements">
                        <div class="float-element element-1"></div>
                        <div class="float-element element-2"></div>
                        <div class="float-element element-3"></div>
                    </div>
                </div>

                <div class="branding-content">
                    <!-- Logo y marca - Diseño profesional -->
                    <div class="brand-section">
                        <div class="logo-container">
                            <div class="logo-backdrop"></div>
                            <img src="http://localhost/Nexorium/website/public/images/LogoNexorium.png" alt="NEXORIUM" class="brand-logo">
                        </div>
                        <div class="brand-text">
                            <h1 class="brand-title">NEXORIUM</h1>
                            <div class="brand-line"></div>
                            <span class="brand-subtitle">TRADING ACADEMY</span>
                        </div>
                    </div>

                    <!-- Mensaje profesional -->
                    <div class="welcome-section">
                        <h2 class="welcome-title">¡Bienvenido!</h2>
                        <p class="welcome-description">
                            Inicia sesión con tu cuenta académica y accede a la plataforma profesional de trading diseñada para traders de élite que buscan excelencia en los mercados financieros.
                        </p>
                    </div>

                    <!-- Sección de redes sociales -->
                    <div class="social-section">
                        <p class="social-text">¿Tienes dudas o quieres saber más?</p>
                        <p class="social-title">¡Contáctate con nosotros!</p>
                        <div class="social-media-links">
                            <a href="#" class="social-link tiktok" title="TikTok">
                                <div class="social-icon">🎵</div>
                                <span>TikTok</span>
                            </a>
                            <a href="#" class="social-link facebook" title="Facebook">
                                <div class="social-icon">📘</div>
                                <span>Facebook</span>
                            </a>
                            <a href="#" class="social-link instagram" title="Instagram">
                                <div class="social-icon">📷</div>
                                <span>Instagram</span>
                            </a>
                            <a href="#" class="social-link whatsapp" title="WhatsApp">
                                <div class="social-icon">💬</div>
                                <span>WhatsApp</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sección derecha - Formulario de login -->
            <div class="login-form-section">
                <!-- Líneas decorativas -->
                <div class="form-lines">
                    <div class="line line-1"></div>
                    <div class="line line-2"></div>
                    <div class="line line-3"></div>
                </div>

                <!-- Partículas decorativas -->
                <div class="form-particles">
                    <div class="particle particle-1"></div>
                    <div class="particle particle-2"></div>
                    <div class="particle particle-3"></div>
                    <div class="particle particle-4"></div>
                </div>

                <div class="form-container"> <!-- Header del formulario -->
                    <div class="form-header">
                        <h2 class="form-title">Iniciar Sesión</h2>
                        <p class="form-subtitle">Ingresa tus credenciales para continuar</p>
                    </div>

                    <!-- Mensajes de error/éxito -->
                    <?php if (!empty($error_message)): ?>
                        <div class="alert alert-error">
                            <div class="alert-icon">⚠️</div>
                            <div class="alert-message"><?php echo htmlspecialchars($error_message); ?></div>
                        </div>
                    <?php endif; ?>

                    <?php if (!empty($success_message)): ?>
                        <div class="alert alert-success">
                            <div class="alert-icon">✅</div>
                            <div class="alert-message"><?php echo htmlspecialchars($success_message); ?></div>
                        </div>
                    <?php endif; ?>

                    <!-- Formulario de login -->
                    <form class="login-form" method="POST" action="" id="loginForm">

                        <!-- Campo Email -->
                        <div class="input-group">
                            <label for="email" class="input-label">Correo Electrónico</label>
                            <div class="input-wrapper">
                                <div class="input-icon">📧</div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    class="form-input"
                                    placeholder="trader@nexorium.com"
                                    value="<?php echo htmlspecialchars($email ?? ''); ?>"
                                    required
                                    autocomplete="email">
                            </div>
                            <div class="input-error" id="emailError"></div>
                        </div>

                        <!-- Campo Contraseña -->
                        <div class="input-group">
                            <label for="password" class="input-label">Contraseña</label>
                            <div class="input-wrapper">
                                <div class="input-icon">🔒</div>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    class="form-input"
                                    placeholder="••••••••••"
                                    required
                                    autocomplete="current-password">
                                <button type="button" class="password-toggle" id="passwordToggle">
                                    <span class="toggle-icon">👁️</span>
                                </button>
                            </div>
                            <div class="input-error" id="passwordError"></div>
                        </div>

                        <!-- Recordar y Olvidé contraseña -->
                        <div class="form-options">
                            <label class="checkbox-label">
                                <input type="checkbox" name="remember" id="remember" class="checkbox-input">
                                <span class="checkbox-custom"></span>
                                <span class="checkbox-text">Recordarme</span>
                            </label>
                            <a href="#" class="forgot-password" id="forgotPasswordLink">¿Olvidaste tu contraseña?</a>
                        </div>

                        <!-- Botón de submit -->
                        <button type="submit" class="login-button btn-nexorium" id="loginButton">
                            <span class="button-text">� ACCESO TRADING</span>
                            <span class="button-loader" id="buttonLoader">
                                <div class="loader-spinner"></div>
                            </span>
                        </button>

                    </form>

                    <!-- Footer del formulario -->
                    <div class="form-footer">
                        <p class="register-text">
                            ¿Quieres unirte a la élite del trading?
                            <a href="#" class="register-link" id="registerLink">¡Solicita tu acceso VIP!</a>
                        </p>

                        <!-- Social Media Links -->
                        <div class="social-media-links">
                            <a href="#" class="social-link trading-signals" title="Señales de Trading">
                                <div class="social-icon">📈</div>
                                <span>Señales VIP</span>
                            </a>
                            <a href="#" class="social-link academy" title="Academia">
                                <div class="social-icon">🎓</div>
                                <span>Academia Pro</span>
                            </a>
                            <a href="#" class="social-link community" title="Comunidad">
                                <div class="social-icon">�</div>
                                <span>Comunidad</span>
                            </a>
                            <a href="#" class="social-link support" title="Soporte">
                                <div class="social-icon">💬</div>
                                <span>Soporte 24/7</span>
                            </a>
                        </div>

                        <!-- Register Link -->
                        <div class="register-section">
                            <p class="no-account-text">¿No tienes cuenta de trading?
                                <a href="#" class="register-link-main" id="registerMainLink">¡Solicita acceso exclusivo!</a>
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </div>

    </div>

    <!-- JavaScript -->
    <script src="http://localhost/Nexorium/system/public/assets/js/login.js"></script>

    <!-- Analytics (opcional) -->
    <script>
        // Google Analytics o similar
        console.log('🔐 NEXORIUM Login: Página cargada correctamente');
    </script>

</body>

</html>