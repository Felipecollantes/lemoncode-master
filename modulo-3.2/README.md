# Aplicación de React con Vite

Este proyecto demuestra el uso de React con Vite, mostrando las diferencias entre el entorno de desarrollo y producción.

## Scripts disponibles

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev
# o
npm run start:dev
```

El servidor de desarrollo se ejecutará en [http://localhost:3000](http://localhost:3000) con Hot Module Replacement (HMR).

### Producción

```bash
# Crear build de producción
npm run build
```

Esto creará una versión optimizada de la aplicación en la carpeta `dist/`.

```bash
# Previsualizar build de producción
npm run preview
```

El servidor de previsualización se ejecutará en [http://localhost:5000](http://localhost:5000).

### Análisis del bundle

```bash
# Analizar el tamaño del bundle (abre automáticamente la visualización)
npm run analyze
```

Este comando genera un informe visual del tamaño del bundle en `dist/stats.html`, permitiendo identificar módulos grandes o redundantes para optimizar.

![Ejemplo de visualización del bundle](https://raw.githubusercontent.com/btd/rollup-plugin-visualizer/master/screenshot.png)

## Diferencias entre Desarrollo y Producción

### Entorno de Desarrollo

- Hot Module Replacement (HMR)
- Sourcemaps completos
- Console logs preservados
- Sin minificación para mejor depuración
- Carga de módulos individuales
- **Incluye codigo TypeScript** (transpilado a JS)
- **Incluye version completa de React con herramientas de desarrollo**
- **Incluye PropTypes para validación**

### Build de Producción

- Tree-shaking aplicado
- Código minificado
- División de chunks (code splitting)
- Console logs eliminados
- Optimizaciones de rendimiento
- **TypeScript eliminado** (solo queda JS puro)
- **React optimizado para producción** (más pequeño)
- **PropTypes eliminados**

## Desglose de contenido de bundles

La build de producción contiene:

| Archivo | Tamaño | Contenido |
|---------|--------|-----------|
| react-*.js | ~11KB | Runtime de React (mínimo necesario) |
| index-*.js (pequeño) | ~2KB | Código para carga diferida |
| index-*.js (grande) | ~170KB | Aplicación principal |

La versión de desarrollo es significativamente más grande debido a:
1. Código de ayuda para desarrollo y depuración
2. Versión no optimizada de React
3. Validación de tipos y PropTypes
4. Código no minificado

## Tamaños Óptimos de Bundle 

Para una aplicación React, estos son los tamaños objetivo recomendados:

| Tipo de aplicación | Desarrollo | Producción |
|-------------------|------------|------------|
| Pequeña (landing, blog) | < 3 MB | < 150 KB |
| Mediana (dashboard) | < 5 MB | < 300 KB |
| Grande (SPA compleja) | < 8 MB | < 500 KB |
| Empresarial | < 12 MB | < 800 KB |

> **Importante**: La métrica más crítica es el bundle de carga inicial, que debe mantenerse por debajo de 200KB para una experiencia de usuario óptima.

Para monitorear los tamaños del bundle, usa:
```
npm run analyze
```

Esto generará un informe detallado en `dist/stats.html`.

## Estructura del Proyecto

- `src/components/` - Componentes de React
- `src/styles/` - Archivos SCSS
- `src/components/App/` - Componente principal con carga diferida
- `src/components/Home/` - Página principal
- `src/components/EnvInfo/` - Componente que muestra información del entorno

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
