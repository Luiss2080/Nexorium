<?php

/**
 * Modelo Rol
 */
class Rol extends Model
{
    protected $table = 'roles';
    protected $fillable = ['nombre', 'descripcion', 'estado'];

    public function obtenerTodos()
    {
        return $this->where(['estado' => 'activo'], 'nombre ASC');
    }

    public function obtenerPermisos($rolId)
    {
        return $this->db->fetchAll(
            "SELECT p.* 
             FROM permisos p
             INNER JOIN rol_permisos rp ON p.id = rp.permiso_id
             WHERE rp.rol_id = ? AND p.estado = 'activo'
             ORDER BY p.nombre",
            [$rolId]
        );
    }

    public function asignarPermiso($rolId, $permisoId)
    {
        return $this->db->execute(
            "INSERT INTO rol_permisos (rol_id, permiso_id) VALUES (?, ?)
             ON DUPLICATE KEY UPDATE updated_at = NOW()",
            [$rolId, $permisoId]
        );
    }

    public function revocarPermiso($rolId, $permisoId)
    {
        return $this->db->execute(
            "DELETE FROM rol_permisos WHERE rol_id = ? AND permiso_id = ?",
            [$rolId, $permisoId]
        );
    }

    public function obtenerUsuarios($rolId)
    {
        return $this->db->fetchAll(
            "SELECT * FROM usuarios WHERE rol_id = ? AND estado = 'activo' ORDER BY nombre",
            [$rolId]
        );
    }
}
