<?php
echo "<style>
    body { 
        font-family: 'Inter', sans-serif; 
        background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); 
        color: white; 
        padding: 2rem; 
        margin: 0;
    }
    .container { 
        max-width: 800px; 
        margin: 0 auto; 
        background: rgba(255, 255, 255, 0.02); 
        padding: 2rem; 
        border-radius: 12px; 
        border: 1px solid rgba(255, 0, 0, 0.2);
    }
    .title { 
        color: #ff0000; 
        font-size: 2rem; 
        margin-bottom: 1rem; 
        text-align: center;
    }
    .status { 
        background: rgba(0, 255, 0, 0.1); 
        padding: 1rem; 
        border-radius: 8px; 
        margin: 1rem 0; 
        border: 1px solid rgba(0, 255, 0, 0.3);
    }
    .link { 
        display: inline-block; 
        padding: 12px 24px; 
        background: linear-gradient(135deg, #ff0000 0%, #ff6600 100%); 
        color: white; 
        text-decoration: none; 
        border-radius: 8px; 
        margin: 5px; 
        font-weight: 600;
        transition: transform 0.3s ease;
    }
    .link:hover { 
        transform: translateY(-2px); 
    }
    .info { 
        background: rgba(255, 255, 255, 0.05); 
        padding: 1rem; 
        border-radius: 8px; 
        margin: 1rem 0;
    }
</style>";

echo "<div class='container'>";
echo "<h1 class='title'>💎 NEXORIUM - Estado del Sistema</h1>";

echo "<div class='status'>";
echo "✅ <strong>Apache está funcionando correctamente!</strong><br>";
echo "📅 Fecha: " . date('Y-m-d H:i:s') . "<br>";
echo "📁 Directorio: " . __DIR__ . "<br>";
echo "🌐 URL de prueba: http://localhost/Nexorium/test.php<br>";
echo "</div>";

echo "<div class='info'>";
echo "<h3>🔗 Enlaces principales:</h3>";
echo '<a href="http://localhost/Nexorium/system/login.php" class="link">🔐 Login System</a><br><br>';
echo '<a href="http://localhost/Nexorium/website/" class="link">🌐 Website Principal</a><br><br>';
echo '<a href="http://localhost/Nexorium/system/app/views/dashboard/" class="link">📊 Dashboard</a><br><br>';
echo '<a href="http://localhost/Nexorium/redirect.html" class="link">🔄 Página de Redirección</a><br><br>';
echo "</div>";

echo "<div class='info'>";
echo "<h3>⚠️ Nota importante:</h3>";
echo "<p>Si estás viendo errores de 'No se puede acceder', asegúrate de usar:</p>";
echo "<p><strong>✅ Correcto:</strong> <code>http://localhost/Nexorium/system/login.php</code></p>";
echo "<p><strong>❌ Incorrecto:</strong> <code>http://localhost:8000/Nexorium/system/login.php</code></p>";
echo "</div>";

echo "<div class='info'>";
echo "<h3>🔐 Credenciales de demo:</h3>";
echo "<p><strong>Email:</strong> admin@nexorium.com</p>";
echo "<p><strong>Contraseña:</strong> admin123</p>";
echo "</div>";

echo "</div>";
