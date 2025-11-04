# NEXORIUM Trading Academy 🚀

## Estructura del Proyecto

```
Nexorium/
├── index.php           # Backend PHP
├── system/             # Sistema backend
├── website/            # Frontend React + Vite
│   ├── package.json    # ⚠️ IMPORTANTE: Los comandos npm van aquí
│   ├── src/
│   └── public/
├── package.json        # Scripts de conveniencia (NUEVO)
└── start-dev.bat       # Script para Windows (NUEVO)
```

## 🛠️ Cómo iniciar el servidor de desarrollo

### Opción 1: Comando directo (Recomendado)

```bash
cd C:\xampp\htdocs\Nexorium\website
npm run dev
```

### Opción 2: Desde el directorio raíz (NUEVO)

```bash
cd C:\xampp\htdocs\Nexorium
npm run dev
```

### Opción 3: Script de Windows (NUEVO)

Doble click en `start-dev.bat`

## 🌐 URLs del Proyecto

- **Frontend React**: http://localhost:3000/
- **Backend PHP**: http://localhost/Nexorium/

## ⚡ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye para producción
- `npm run preview` - Preview de la build de producción

## 🎯 Notas Importantes

1. **El `package.json` principal** está en la carpeta `website/`
2. **Siempre ejecutar comandos npm** desde `website/` o usar los scripts del raíz
3. **El servidor React** corre en puerto 3000
4. **El servidor PHP** requiere XAMPP activo

## 🚨 Errores Comunes

### Error: "Could not read package.json"

**Causa**: Ejecutar `npm run dev` desde directorio incorrecto
**Solución**: Usar una de las opciones de arriba ⬆️
