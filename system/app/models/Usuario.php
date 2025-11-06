<?php

/**
 * Modelo Usuario
 */
class Usuario extends Model
{
    protected $table = 'usuarios';
    protected $fillable = [
        'nombre',
        'apellido',
        'email',
        'password',
        'telefono',
        'direccion',
        'fecha_nacimiento',
        'rol_id',
        'estado',
        'avatar'
    ];

    public function crearUsuario($data)
    {
        if (isset($data['password'])) {
            $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
        }

        return $this->create($data);
    }

    public function actualizarPassword($id, $newPassword)
    {
        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
        return $this->update($id, ['password' => $hashedPassword]);
    }

    public function buscarPorEmail($email)
    {
        return $this->findBy('email', $email);
    }

    public function obtenerConRol($id)
    {
        return $this->db->fetch(
            "SELECT u.*, r.nombre as rol_nombre 
             FROM usuarios u 
             LEFT JOIN roles r ON u.rol_id = r.id 
             WHERE u.id = ?",
            [$id]
        );
    }

    public function obtenerPorRol($rolId)
    {
        return $this->where(['rol_id' => $rolId, 'estado' => 'activo']);
    }

    public function obtenerEstadisticas()
    {
        return [
            'total' => $this->count(),
            'activos' => $this->count(['estado' => 'activo']),
            'inactivos' => $this->count(['estado' => 'inactivo']),
            'administradores' => $this->count(['rol_id' => ROLE_ADMIN]),
            'capacitadores' => $this->count(['rol_id' => ROLE_TRAINER]),
            'estudiantes' => $this->count(['rol_id' => ROLE_STUDENT])
        ];
    }

    public function buscar($termino, $rol = null)
    {
        $sql = "SELECT u.*, r.nombre as rol_nombre 
                FROM usuarios u 
                LEFT JOIN roles r ON u.rol_id = r.id 
                WHERE (u.nombre LIKE ? OR u.apellido LIKE ? OR u.email LIKE ?)";

        $params = ["%$termino%", "%$termino%", "%$termino%"];

        if ($rol) {
            $sql .= " AND u.rol_id = ?";
            $params[] = $rol;
        }

        $sql .= " ORDER BY u.nombre, u.apellido";

        return $this->db->fetchAll($sql, $params);
    }

    public function activar($id)
    {
        return $this->update($id, ['estado' => 'activo']);
    }

    public function desactivar($id)
    {
        return $this->update($id, ['estado' => 'inactivo']);
    }

    public function obtenerCursosInscritos($usuarioId)
    {
        return $this->db->fetchAll(
            "SELECT c.*, i.fecha_inscripcion, i.estado as estado_inscripcion
             FROM cursos c
             INNER JOIN inscripciones i ON c.id = i.curso_id
             WHERE i.usuario_id = ? AND i.estado = 'activa'
             ORDER BY i.fecha_inscripcion DESC",
            [$usuarioId]
        );
    }

    public function obtenerCursosImpartidos($capacitadorId)
    {
        return $this->db->fetchAll(
            "SELECT c.*, COUNT(i.id) as total_estudiantes
             FROM cursos c
             LEFT JOIN inscripciones i ON c.id = i.curso_id AND i.estado = 'activa'
             WHERE c.capacitador_id = ?
             GROUP BY c.id
             ORDER BY c.fecha_inicio DESC",
            [$capacitadorId]
        );
    }
}
