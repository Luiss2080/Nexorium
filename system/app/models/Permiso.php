<?php

/**
 * Modelo Permiso
 */
class Permiso extends Model
{
    protected $table = 'permisos';
    protected $fillable = ['nombre', 'descripcion', 'modulo', 'estado'];

    public function obtenerTodos()
    {
        return $this->where(['estado' => 'activo'], 'modulo ASC, nombre ASC');
    }

    public function obtenerPorModulo($modulo)
    {
        return $this->where(['modulo' => $modulo, 'estado' => 'activo'], 'nombre ASC');
    }

    public function obtenerRolesConPermiso($permisoId)
    {
        return $this->db->fetchAll(
            "SELECT r.* 
             FROM roles r
             INNER JOIN rol_permisos rp ON r.id = rp.rol_id
             WHERE rp.permiso_id = ? AND r.estado = 'activo'
             ORDER BY r.nombre",
            [$permisoId]
        );
    }

    public function usuarioTienePermiso($usuarioId, $permisoNombre)
    {
        $resultado = $this->db->fetch(
            "SELECT COUNT(*) as count
             FROM usuarios u
             INNER JOIN roles r ON u.rol_id = r.id
             INNER JOIN rol_permisos rp ON r.id = rp.rol_id
             INNER JOIN permisos p ON rp.permiso_id = p.id
             WHERE u.id = ? AND p.nombre = ? AND u.estado = 'activo' AND p.estado = 'activo'",
            [$usuarioId, $permisoNombre]
        );

        return $resultado['count'] > 0;
    }

    public function obtenerPermisosUsuario($usuarioId)
    {
        return $this->db->fetchAll(
            "SELECT DISTINCT p.*
             FROM permisos p
             INNER JOIN rol_permisos rp ON p.id = rp.permiso_id
             INNER JOIN roles r ON rp.rol_id = r.id
             INNER JOIN usuarios u ON r.id = u.rol_id
             WHERE u.id = ? AND p.estado = 'activo' AND u.estado = 'activo'
             ORDER BY p.modulo, p.nombre",
            [$usuarioId]
        );
    }

    public function asignarPermisoAUsuario($usuarioId, $permisoId)
    {
        return $this->db->execute(
            "INSERT INTO permisos_usuario (usuario_id, permiso_id) VALUES (?, ?)
             ON DUPLICATE KEY UPDATE updated_at = NOW()",
            [$usuarioId, $permisoId]
        );
    }

    public function revocarPermisoAUsuario($usuarioId, $permisoId)
    {
        return $this->db->execute(
            "DELETE FROM permisos_usuario WHERE usuario_id = ? AND permiso_id = ?",
            [$usuarioId, $permisoId]
        );
    }

    public function sincronizarPermisos()
    {
        // Definir permisos base del sistema
        $permisosBase = [
            // Permisos de administración
            ['nombre' => 'admin.dashboard', 'descripcion' => 'Ver dashboard de administración', 'modulo' => 'admin'],
            ['nombre' => 'admin.usuarios.ver', 'descripcion' => 'Ver listado de usuarios', 'modulo' => 'admin'],
            ['nombre' => 'admin.usuarios.crear', 'descripcion' => 'Crear nuevos usuarios', 'modulo' => 'admin'],
            ['nombre' => 'admin.usuarios.editar', 'descripcion' => 'Editar usuarios existentes', 'modulo' => 'admin'],
            ['nombre' => 'admin.usuarios.eliminar', 'descripcion' => 'Eliminar usuarios', 'modulo' => 'admin'],
            ['nombre' => 'admin.cursos.ver', 'descripcion' => 'Ver listado de cursos', 'modulo' => 'admin'],
            ['nombre' => 'admin.cursos.crear', 'descripcion' => 'Crear nuevos cursos', 'modulo' => 'admin'],
            ['nombre' => 'admin.cursos.editar', 'descripcion' => 'Editar cursos existentes', 'modulo' => 'admin'],
            ['nombre' => 'admin.cursos.eliminar', 'descripcion' => 'Eliminar cursos', 'modulo' => 'admin'],
            ['nombre' => 'admin.reportes.ver', 'descripcion' => 'Ver reportes del sistema', 'modulo' => 'admin'],
            ['nombre' => 'admin.configuracion', 'descripcion' => 'Acceder a configuración del sistema', 'modulo' => 'admin'],
            ['nombre' => 'admin.permisos', 'descripcion' => 'Gestionar permisos y roles', 'modulo' => 'admin'],

            // Permisos de capacitador
            ['nombre' => 'capacitador.dashboard', 'descripcion' => 'Ver dashboard de capacitador', 'modulo' => 'capacitador'],
            ['nombre' => 'capacitador.cursos.ver', 'descripcion' => 'Ver sus cursos asignados', 'modulo' => 'capacitador'],
            ['nombre' => 'capacitador.cursos.editar', 'descripcion' => 'Editar contenido de sus cursos', 'modulo' => 'capacitador'],
            ['nombre' => 'capacitador.materiales.ver', 'descripcion' => 'Ver materiales de sus cursos', 'modulo' => 'capacitador'],
            ['nombre' => 'capacitador.materiales.crear', 'descripcion' => 'Subir nuevos materiales', 'modulo' => 'capacitador'],
            ['nombre' => 'capacitador.materiales.editar', 'descripcion' => 'Editar materiales existentes', 'modulo' => 'capacitador'],
            ['nombre' => 'capacitador.materiales.eliminar', 'descripcion' => 'Eliminar materiales', 'modulo' => 'capacitador'],
            ['nombre' => 'capacitador.estudiantes.ver', 'descripcion' => 'Ver estudiantes inscritos', 'modulo' => 'capacitador'],
            ['nombre' => 'capacitador.asistencia.ver', 'descripcion' => 'Ver registro de asistencias', 'modulo' => 'capacitador'],
            ['nombre' => 'capacitador.asistencia.registrar', 'descripcion' => 'Registrar asistencias', 'modulo' => 'capacitador'],

            // Permisos de estudiante
            ['nombre' => 'estudiante.dashboard', 'descripcion' => 'Ver dashboard de estudiante', 'modulo' => 'estudiante'],
            ['nombre' => 'estudiante.cursos.ver', 'descripcion' => 'Ver cursos disponibles', 'modulo' => 'estudiante'],
            ['nombre' => 'estudiante.cursos.inscribirse', 'descripcion' => 'Inscribirse a cursos', 'modulo' => 'estudiante'],
            ['nombre' => 'estudiante.materiales.ver', 'descripcion' => 'Ver materiales de cursos inscritos', 'modulo' => 'estudiante'],
            ['nombre' => 'estudiante.materiales.descargar', 'descripcion' => 'Descargar materiales', 'modulo' => 'estudiante'],
            ['nombre' => 'estudiante.progreso.ver', 'descripcion' => 'Ver su progreso en los cursos', 'modulo' => 'estudiante'],

            // Permisos generales
            ['nombre' => 'perfil.ver', 'descripcion' => 'Ver su propio perfil', 'modulo' => 'general'],
            ['nombre' => 'perfil.editar', 'descripcion' => 'Editar su propio perfil', 'modulo' => 'general'],
            ['nombre' => 'perfil.cambiar_password', 'descripcion' => 'Cambiar su contraseña', 'modulo' => 'general']
        ];

        $this->db->beginTransaction();

        try {
            foreach ($permisosBase as $permiso) {
                $existente = $this->findBy('nombre', $permiso['nombre']);

                if (!$existente) {
                    $this->create(array_merge($permiso, ['estado' => 'activo']));
                }
            }

            $this->db->commit();
            return true;
        } catch (Exception $e) {
            $this->db->rollback();
            throw $e;
        }
    }

    public function obtenerPermisosPorModulo()
    {
        $permisos = $this->obtenerTodos();
        $permisosPorModulo = [];

        foreach ($permisos as $permiso) {
            $permisosPorModulo[$permiso['modulo']][] = $permiso;
        }

        return $permisosPorModulo;
    }
}
