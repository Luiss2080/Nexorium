<?php

/**
 * NEXORIUM TRADING ACADEMY - DASHBOARD
 * Panel de control principal para usuarios autenticados
 */

session_start();

// Verificar si el usuario está autenticado
if (!isset($_SESSION['user_id'])) {
    header('Location: http://localhost/Nexorium/system/login.php');
    exit;
}

// Obtener datos del usuario
$user_name = $_SESSION['user_name'] ?? 'Usuario';
$user_email = $_SESSION['user_email'] ?? '';
$user_role = $_SESSION['user_role'] ?? 'user';
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - NEXORIUM Trading Academy</title>
    <link rel="icon" type="image/png" href="http://localhost:3002/images/LogoNexorium.png">

    <!-- Fuentes -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

    <!-- CSS -->
    <style>
        :root {
            --primary-red: #ff4757;
            --secondary-color: #00d4aa;
            --dark-bg: #0a0a0a;
            --card-bg: #1a1a1a;
            --text-primary: #ffffff;
            --text-secondary: #cccccc;
            --border-color: rgba(255, 255, 255, 0.1);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            background: var(--dark-bg);
            color: var(--text-primary);
            line-height: 1.6;
            min-height: 100vh;
        }

        .dashboard-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        .dashboard-header {
            background: var(--card-bg);
            padding: 2rem;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .dashboard-title {
            font-family: 'Montserrat', sans-serif;
            font-size: 2rem;
            font-weight: 700;
            background: linear-gradient(135deg, var(--primary-red), #ff8c42);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .user-info {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .user-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--primary-red), var(--secondary-color));
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            font-weight: 600;
        }

        .user-details h3 {
            font-size: 1.1rem;
            margin-bottom: 0.2rem;
        }

        .user-details p {
            font-size: 0.9rem;
            color: var(--text-secondary);
        }

        .logout-btn {
            background: rgba(255, 71, 87, 0.1);
            border: 1px solid var(--primary-red);
            color: var(--primary-red);
            padding: 0.7rem 1.5rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s ease;
        }

        .logout-btn:hover {
            background: var(--primary-red);
            color: white;
        }

        .dashboard-content {
            flex: 1;
            padding: 2rem;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }

        .dashboard-card {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 2rem;
            transition: transform 0.3s ease;
        }

        .dashboard-card:hover {
            transform: translateY(-5px);
        }

        .card-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }

        .card-icon {
            width: 50px;
            height: 50px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            background: linear-gradient(135deg, var(--primary-red), #ff8c42);
        }

        .card-title {
            font-family: 'Montserrat', sans-serif;
            font-size: 1.3rem;
            font-weight: 600;
        }

        .card-content {
            color: var(--text-secondary);
            line-height: 1.6;
        }

        .welcome-message {
            background: linear-gradient(135deg, var(--card-bg), rgba(255, 71, 87, 0.1));
            border: 1px solid rgba(255, 71, 87, 0.2);
            grid-column: 1 / -1;
            text-align: center;
            padding: 3rem 2rem;
        }

        .welcome-message h2 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, var(--primary-red), var(--secondary-color));
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .btn-primary {
            display: inline-block;
            background: linear-gradient(135deg, var(--primary-red), #ff8c42);
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            margin-top: 1rem;
            transition: transform 0.3s ease;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
        }

        @media (max-width: 768px) {
            .dashboard-header {
                flex-direction: column;
                gap: 1rem;
                text-align: center;
            }

            .dashboard-content {
                grid-template-columns: 1fr;
                padding: 1rem;
            }
        }
    </style>
</head>

<body>
    <div class="dashboard-container">

        <!-- Header del Dashboard -->
        <header class="dashboard-header">
            <h1 class="dashboard-title">NEXORIUM Dashboard</h1>

            <div class="user-info">
                <div class="user-avatar">
                    <?php echo strtoupper(substr($user_name, 0, 1)); ?>
                </div>
                <div class="user-details">
                    <h3>Hola, <?php echo htmlspecialchars($user_name); ?>!</h3>
                    <p><?php echo htmlspecialchars($user_email); ?></p>
                </div>
                <a href="logout.php" class="logout-btn">Cerrar Sesión</a>
            </div>
        </header>

        <!-- Contenido principal -->
        <main class="dashboard-content">

            <!-- Mensaje de bienvenida -->
            <div class="dashboard-card welcome-message">
                <h2>¡Bienvenido a NEXORIUM!</h2>
                <p>Has iniciado sesión exitosamente en tu panel de trading profesional.</p>
                <p>Desde aquí podrás acceder a todos los cursos, señales y herramientas avanzadas.</p>
                <a href="http://localhost:3002/" class="btn-primary">Volver al Sitio Web</a>
            </div>

            <!-- Mis Cursos -->
            <div class="dashboard-card">
                <div class="card-header">
                    <div class="card-icon">📚</div>
                    <h3 class="card-title">Mis Cursos</h3>
                </div>
                <div class="card-content">
                    <p>Accede a todos los cursos en los que estás inscrito y continúa tu formación profesional.</p>
                    <ul style="margin-top: 1rem; padding-left: 1rem;">
                        <li>Curso Básico de Trading (En Progreso)</li>
                        <li>Análisis Técnico Avanzado (Próximamente)</li>
                        <li>Psicología del Trader (Próximamente)</li>
                    </ul>
                </div>
            </div>

            <!-- Señales de Trading -->
            <div class="dashboard-card">
                <div class="card-header">
                    <div class="card-icon">📊</div>
                    <h3 class="card-title">Señales de Trading</h3>
                </div>
                <div class="card-content">
                    <p>Recibe señales de trading en tiempo real de nuestros expertos analistas.</p>
                    <p style="margin-top: 1rem; color: var(--secondary-color); font-weight: 600;">
                        🟢 5 señales activas hoy
                    </p>
                </div>
            </div>

            <!-- Mi Progreso -->
            <div class="dashboard-card">
                <div class="card-header">
                    <div class="card-icon">📈</div>
                    <h3 class="card-title">Mi Progreso</h3>
                </div>
                <div class="card-content">
                    <p>Revisa tu progreso de aprendizaje y rendimiento en trading.</p>
                    <div style="margin-top: 1rem;">
                        <p><strong>Cursos Completados:</strong> 1 / 8</p>
                        <p><strong>Horas de Estudio:</strong> 12.5h</p>
                        <p><strong>Rendimiento:</strong> +15.3%</p>
                    </div>
                </div>
            </div>

            <!-- Herramientas -->
            <div class="dashboard-card">
                <div class="card-header">
                    <div class="card-icon">🛠️</div>
                    <h3 class="card-title">Herramientas</h3>
                </div>
                <div class="card-content">
                    <p>Accede a calculadoras, simuladores y herramientas avanzadas de análisis.</p>
                    <ul style="margin-top: 1rem; padding-left: 1rem;">
                        <li>Calculadora de Riesgo</li>
                        <li>Simulador de Trading</li>
                        <li>Calendario Económico</li>
                    </ul>
                </div>
            </div>

            <!-- Soporte -->
            <div class="dashboard-card">
                <div class="card-header">
                    <div class="card-icon">🎯</div>
                    <h3 class="card-title">Soporte</h3>
                </div>
                <div class="card-content">
                    <p>¿Necesitas ayuda? Nuestro equipo está disponible 24/7 para apoyarte.</p>
                    <p style="margin-top: 1rem;">
                        <strong>Email:</strong> support@nexorium.com<br>
                        <strong>WhatsApp:</strong> +1 (555) 123-4567
                    </p>
                </div>
            </div>

            <!-- Configuración -->
            <div class="dashboard-card">
                <div class="card-header">
                    <div class="card-icon">⚙️</div>
                    <h3 class="card-title">Configuración</h3>
                </div>
                <div class="card-content">
                    <p>Personaliza tu experiencia y ajusta las preferencias de tu cuenta.</p>
                    <ul style="margin-top: 1rem; padding-left: 1rem;">
                        <li>Perfil de Usuario</li>
                        <li>Notificaciones</li>
                        <li>Preferencias de Trading</li>
                    </ul>
                </div>
            </div>

        </main>

    </div>

    <script>
        console.log('🎯 NEXORIUM Dashboard: Cargado correctamente');

        // Animaciones simples
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.dashboard-card');

            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    card.style.transition = 'all 0.6s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        });
    </script>

</body>

</html>