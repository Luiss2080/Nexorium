<?php

/**
 * Modelo Configuracion
 */
class Configuracion extends Model
{
    protected $table = 'configuraciones';
    protected $fillable = ['clave', 'valor', 'descripcion', 'tipo', 'categoria'];

    public function obtenerValor($clave, $default = null)
    {
        $config = $this->findBy('clave', $clave);
        return $config ? $config['valor'] : $default;
    }

    public function establecerValor($clave, $valor, $descripcion = null, $tipo = 'string', $categoria = 'general')
    {
        $existente = $this->findBy('clave', $clave);

        if ($existente) {
            return $this->update($existente['id'], ['valor' => $valor]);
        } else {
            return $this->create([
                'clave' => $clave,
                'valor' => $valor,
                'descripcion' => $descripcion,
                'tipo' => $tipo,
                'categoria' => $categoria
            ]);
        }
    }

    public function obtenerPorCategoria($categoria)
    {
        return $this->where(['categoria' => $categoria], 'clave ASC');
    }

    public function obtenerTodas()
    {
        return $this->all('categoria ASC, clave ASC');
    }

    public function establecerMultiples($configuraciones)
    {
        $this->db->beginTransaction();

        try {
            foreach ($configuraciones as $clave => $valor) {
                $this->establecerValor($clave, $valor);
            }

            $this->db->commit();
            return true;
        } catch (Exception $e) {
            $this->db->rollback();
            throw $e;
        }
    }

    public function inicializarConfiguraciones()
    {
        $configuracionesBase = [
            // Configuraciones del sitio
            ['clave' => 'sitio.nombre', 'valor' => 'Nexorium', 'descripcion' => 'Nombre del sitio', 'tipo' => 'string', 'categoria' => 'sitio'],
            ['clave' => 'sitio.descripcion', 'valor' => 'Plataforma de capacitación en línea', 'descripcion' => 'Descripción del sitio', 'tipo' => 'text', 'categoria' => 'sitio'],
            ['clave' => 'sitio.email', 'valor' => 'admin@nexorium.com', 'descripcion' => 'Email de contacto del sitio', 'tipo' => 'email', 'categoria' => 'sitio'],
            ['clave' => 'sitio.telefono', 'valor' => '+591 123456789', 'descripcion' => 'Teléfono de contacto', 'tipo' => 'string', 'categoria' => 'sitio'],
            ['clave' => 'sitio.direccion', 'valor' => 'La Paz, Bolivia', 'descripcion' => 'Dirección física', 'tipo' => 'text', 'categoria' => 'sitio'],
            ['clave' => 'sitio.logo', 'valor' => 'logo.png', 'descripcion' => 'Logo del sitio', 'tipo' => 'file', 'categoria' => 'sitio'],

            // Configuraciones de cursos
            ['clave' => 'cursos.max_estudiantes_default', 'valor' => '30', 'descripcion' => 'Máximo de estudiantes por defecto', 'tipo' => 'number', 'categoria' => 'cursos'],
            ['clave' => 'cursos.duracion_minima', 'valor' => '1', 'descripcion' => 'Duración mínima en horas', 'tipo' => 'number', 'categoria' => 'cursos'],
            ['clave' => 'cursos.duracion_maxima', 'valor' => '200', 'descripcion' => 'Duración máxima en horas', 'tipo' => 'number', 'categoria' => 'cursos'],
            ['clave' => 'cursos.aprobacion_automatica', 'valor' => '1', 'descripcion' => 'Aprobación automática de inscripciones', 'tipo' => 'boolean', 'categoria' => 'cursos'],
            ['clave' => 'cursos.certificado_automatico', 'valor' => '1', 'descripcion' => 'Generar certificados automáticamente', 'tipo' => 'boolean', 'categoria' => 'cursos'],
            ['clave' => 'cursos.nota_minima_aprobacion', 'valor' => '70', 'descripcion' => 'Nota mínima para aprobar', 'tipo' => 'number', 'categoria' => 'cursos'],

            // Configuraciones de archivos
            ['clave' => 'archivos.max_size', 'valor' => '10', 'descripcion' => 'Tamaño máximo de archivo en MB', 'tipo' => 'number', 'categoria' => 'archivos'],
            ['clave' => 'archivos.tipos_permitidos', 'valor' => 'pdf,doc,docx,ppt,pptx,mp4,avi,jpg,jpeg,png', 'descripcion' => 'Tipos de archivos permitidos', 'tipo' => 'string', 'categoria' => 'archivos'],
            ['clave' => 'archivos.directorio_uploads', 'valor' => 'uploads/', 'descripcion' => 'Directorio de uploads', 'tipo' => 'string', 'categoria' => 'archivos'],

            // Configuraciones de email
            ['clave' => 'email.activado', 'valor' => '0', 'descripcion' => 'Sistema de email activado', 'tipo' => 'boolean', 'categoria' => 'email'],
            ['clave' => 'email.smtp_host', 'valor' => 'smtp.gmail.com', 'descripcion' => 'Servidor SMTP', 'tipo' => 'string', 'categoria' => 'email'],
            ['clave' => 'email.smtp_port', 'valor' => '587', 'descripcion' => 'Puerto SMTP', 'tipo' => 'number', 'categoria' => 'email'],
            ['clave' => 'email.smtp_usuario', 'valor' => '', 'descripcion' => 'Usuario SMTP', 'tipo' => 'email', 'categoria' => 'email'],
            ['clave' => 'email.smtp_password', 'valor' => '', 'descripcion' => 'Contraseña SMTP', 'tipo' => 'password', 'categoria' => 'email'],
            ['clave' => 'email.from_name', 'valor' => 'Nexorium', 'descripcion' => 'Nombre del remitente', 'tipo' => 'string', 'categoria' => 'email'],
            ['clave' => 'email.from_email', 'valor' => 'noreply@nexorium.com', 'descripcion' => 'Email del remitente', 'tipo' => 'email', 'categoria' => 'email'],

            // Configuraciones de seguridad
            ['clave' => 'seguridad.sesion_duracion', 'valor' => '3600', 'descripcion' => 'Duración de sesión en segundos', 'tipo' => 'number', 'categoria' => 'seguridad'],
            ['clave' => 'seguridad.intentos_login_max', 'valor' => '5', 'descripcion' => 'Máximo intentos de login', 'tipo' => 'number', 'categoria' => 'seguridad'],
            ['clave' => 'seguridad.bloqueo_tiempo', 'valor' => '300', 'descripcion' => 'Tiempo de bloqueo en segundos', 'tipo' => 'number', 'categoria' => 'seguridad'],
            ['clave' => 'seguridad.password_min_length', 'valor' => '8', 'descripcion' => 'Longitud mínima de contraseña', 'tipo' => 'number', 'categoria' => 'seguridad'],
            ['clave' => 'seguridad.password_require_uppercase', 'valor' => '1', 'descripcion' => 'Requerir mayúsculas en contraseña', 'tipo' => 'boolean', 'categoria' => 'seguridad'],
            ['clave' => 'seguridad.password_require_numbers', 'valor' => '1', 'descripcion' => 'Requerir números en contraseña', 'tipo' => 'boolean', 'categoria' => 'seguridad'],

            // Configuraciones de notificaciones
            ['clave' => 'notificaciones.nuevas_inscripciones', 'valor' => '1', 'descripcion' => 'Notificar nuevas inscripciones', 'tipo' => 'boolean', 'categoria' => 'notificaciones'],
            ['clave' => 'notificaciones.materiales_nuevos', 'valor' => '1', 'descripcion' => 'Notificar materiales nuevos', 'tipo' => 'boolean', 'categoria' => 'notificaciones'],
            ['clave' => 'notificaciones.recordatorios_curso', 'valor' => '1', 'descripcion' => 'Enviar recordatorios de curso', 'tipo' => 'boolean', 'categoria' => 'notificaciones'],

            // Configuraciones de sistema
            ['clave' => 'sistema.debug_mode', 'valor' => '1', 'descripcion' => 'Modo debug activado', 'tipo' => 'boolean', 'categoria' => 'sistema'],
            ['clave' => 'sistema.mantenimiento', 'valor' => '0', 'descripcion' => 'Modo mantenimiento', 'tipo' => 'boolean', 'categoria' => 'sistema'],
            ['clave' => 'sistema.version', 'valor' => '1.0.0', 'descripcion' => 'Versión del sistema', 'tipo' => 'string', 'categoria' => 'sistema'],
            ['clave' => 'sistema.timezone', 'valor' => 'America/La_Paz', 'descripcion' => 'Zona horaria', 'tipo' => 'string', 'categoria' => 'sistema'],
        ];

        $this->db->beginTransaction();

        try {
            foreach ($configuracionesBase as $config) {
                $existente = $this->findBy('clave', $config['clave']);

                if (!$existente) {
                    $this->create($config);
                }
            }

            $this->db->commit();
            return true;
        } catch (Exception $e) {
            $this->db->rollback();
            throw $e;
        }
    }

    public function obtenerConfiguracionesAgrupadas()
    {
        $configuraciones = $this->obtenerTodas();
        $agrupadas = [];

        foreach ($configuraciones as $config) {
            $agrupadas[$config['categoria']][] = $config;
        }

        return $agrupadas;
    }

    public function validarValor($tipo, $valor)
    {
        switch ($tipo) {
            case 'number':
                return is_numeric($valor);
            case 'email':
                return filter_var($valor, FILTER_VALIDATE_EMAIL) !== false;
            case 'boolean':
                return in_array($valor, ['0', '1', 'true', 'false']);
            case 'url':
                return filter_var($valor, FILTER_VALIDATE_URL) !== false;
            default:
                return true;
        }
    }
}
