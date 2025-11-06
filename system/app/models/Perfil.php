<?php

/**
 * Modelo Perfil - Extensión de datos de usuario
 */
class Perfil extends Model
{
    protected $table = 'perfiles';
    protected $fillable = [
        'usuario_id',
        'biografia',
        'especialidades',
        'experiencia',
        'educacion',
        'certificaciones',
        'linkedin',
        'website',
        'telefono_alternativo',
        'direccion_completa',
        'ciudad',
        'pais',
        'fecha_nacimiento',
        'genero'
    ];

    public function obtenerPorUsuario($usuarioId)
    {
        return $this->findBy('usuario_id', $usuarioId);
    }

    public function crearOActualizar($usuarioId, $data)
    {
        $perfilExistente = $this->obtenerPorUsuario($usuarioId);

        if ($perfilExistente) {
            return $this->update($perfilExistente['id'], $data);
        } else {
            $data['usuario_id'] = $usuarioId;
            return $this->create($data);
        }
    }

    public function obtenerCompleto($usuarioId)
    {
        return $this->db->fetch(
            "SELECT u.*, p.*, r.nombre as rol_nombre
             FROM usuarios u
             LEFT JOIN perfiles p ON u.id = p.usuario_id
             LEFT JOIN roles r ON u.rol_id = r.id
             WHERE u.id = ?",
            [$usuarioId]
        );
    }

    public function obtenerCapacitadores()
    {
        return $this->db->fetchAll(
            "SELECT u.nombre, u.apellido, u.email, u.avatar,
                    p.biografia, p.especialidades, p.experiencia, p.certificaciones
             FROM usuarios u
             LEFT JOIN perfiles p ON u.id = p.usuario_id
             INNER JOIN roles r ON u.rol_id = r.id
             WHERE r.nombre = 'capacitador' AND u.estado = 'activo'
             ORDER BY u.nombre, u.apellido"
        );
    }

    public function buscarCapacitadoresPorEspecialidad($especialidad)
    {
        return $this->db->fetchAll(
            "SELECT u.*, p.*
             FROM usuarios u
             LEFT JOIN perfiles p ON u.id = p.usuario_id
             INNER JOIN roles r ON u.rol_id = r.id
             WHERE r.nombre = 'capacitador' 
             AND u.estado = 'activo'
             AND (p.especialidades LIKE ? OR p.biografia LIKE ?)
             ORDER BY u.nombre, u.apellido",
            ["%$especialidad%", "%$especialidad%"]
        );
    }

    public function obtenerEstadisticasPerfil($usuarioId)
    {
        $usuario = $this->obtenerCompleto($usuarioId);

        if (!$usuario) {
            return null;
        }

        $estadisticas = [
            'completitud_perfil' => $this->calcularCompletitud($usuario),
            'usuario' => $usuario
        ];

        // Estadísticas específicas por rol
        if ($usuario['rol_nombre'] === 'capacitador') {
            $cursoModel = new Curso();
            $estadisticas['cursos_impartidos'] = $cursoModel->count(['capacitador_id' => $usuarioId]);

            $inscripcionModel = new Inscripcion();
            $estadisticas['estudiantes_capacitados'] = $this->db->fetch(
                "SELECT COUNT(DISTINCT i.usuario_id) as count
                 FROM inscripciones i
                 INNER JOIN cursos c ON i.curso_id = c.id
                 WHERE c.capacitador_id = ? AND i.estado = 'completada'",
                [$usuarioId]
            )['count'];
        }

        if ($usuario['rol_nombre'] === 'estudiante') {
            $inscripcionModel = new Inscripcion();
            $cursosInscritos = $inscripcionModel->count(['usuario_id' => $usuarioId]);
            $cursosCompletados = $inscripcionModel->count(['usuario_id' => $usuarioId, 'estado' => 'completada']);

            $estadisticas['cursos_inscritos'] = $cursosInscritos;
            $estadisticas['cursos_completados'] = $cursosCompletados;
            $estadisticas['porcentaje_completacion'] = $cursosInscritos > 0 ?
                round(($cursosCompletados / $cursosInscritos) * 100, 2) : 0;
        }

        return $estadisticas;
    }

    private function calcularCompletitud($usuario)
    {
        $campos = [
            'nombre',
            'apellido',
            'email',
            'telefono',
            'direccion',
            'biografia',
            'fecha_nacimiento',
            'avatar'
        ];

        $completados = 0;
        foreach ($campos as $campo) {
            if (!empty($usuario[$campo])) {
                $completados++;
            }
        }

        return round(($completados / count($campos)) * 100, 2);
    }

    public function actualizarAvatar($usuarioId, $avatar)
    {
        // Actualizar en tabla usuarios
        $usuarioModel = new Usuario();
        $usuarioAnterior = $usuarioModel->find($usuarioId);

        // Eliminar avatar anterior si existe
        if ($usuarioAnterior && $usuarioAnterior['avatar']) {
            $rutaAnterior = STORAGE_PATH . 'profiles/' . $usuarioAnterior['avatar'];
            if (file_exists($rutaAnterior)) {
                unlink($rutaAnterior);
            }
        }

        return $usuarioModel->update($usuarioId, ['avatar' => $avatar]);
    }

    public function obtenerDatosPublicos($usuarioId)
    {
        $perfil = $this->obtenerCompleto($usuarioId);

        if (!$perfil) {
            return null;
        }

        // Retornar solo datos públicos
        return [
            'id' => $perfil['id'],
            'nombre' => $perfil['nombre'],
            'apellido' => $perfil['apellido'],
            'avatar' => $perfil['avatar'],
            'biografia' => $perfil['biografia'],
            'especialidades' => $perfil['especialidades'],
            'certificaciones' => $perfil['certificaciones'],
            'rol_nombre' => $perfil['rol_nombre'],
            'linkedin' => $perfil['linkedin'],
            'website' => $perfil['website']
        ];
    }

    public function generarSlugPerfil($usuarioId)
    {
        $usuario = $this->obtenerCompleto($usuarioId);

        if (!$usuario) {
            return null;
        }

        $slug = generateSlug($usuario['nombre'] . ' ' . $usuario['apellido']);

        // Verificar unicidad
        $contador = 1;
        $slugOriginal = $slug;

        while ($this->db->fetch("SELECT id FROM perfiles WHERE slug = ?", [$slug])) {
            $slug = $slugOriginal . '-' . $contador;
            $contador++;
        }

        // Actualizar el slug en el perfil
        $this->crearOActualizar($usuarioId, ['slug' => $slug]);

        return $slug;
    }

    public function obtenerPorSlug($slug)
    {
        return $this->db->fetch(
            "SELECT u.*, p.*, r.nombre as rol_nombre
             FROM usuarios u
             LEFT JOIN perfiles p ON u.id = p.usuario_id
             LEFT JOIN roles r ON u.rol_id = r.id
             WHERE p.slug = ? AND u.estado = 'activo'",
            [$slug]
        );
    }
}
