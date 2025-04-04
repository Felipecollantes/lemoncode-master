# Guía para construir una aplicación React con Vite

Esta guía detalla el proceso de creación de una aplicación React moderna utilizando Vite como herramienta de construcción, incluyendo configuración, optimizaciones y buenas prácticas.

## Índice

1. [Instalación y configuración inicial](#1-instalación-y-configuración-inicial)
2. [Estructura del proyecto](#2-estructura-del-proyecto)
3. [Configuración de estilos con SCSS](#3-configuración-de-estilos-con-scss)
4. [Lazy loading y optimización de rendimiento](#4-lazy-loading-y-optimización-de-rendimiento)
5. [Optimizaciones de producción](#5-optimizaciones-de-producción)
6. [Tamaños óptimos de bundle para aplicaciones React](#6-tamaños-óptimos-de-bundle-para-aplicaciones-react)
7. [Comandos útiles](#7-comandos-útiles)

## 1. Instalación y configuración inicial

### Crear un nuevo proyecto con Vite

```bash
# Instalación con npm
npm create vite@latest my-react-app --template react-ts

# O usando yarn
yarn create vite my-react-app --template react-ts

# Navegar al directorio del proyecto
cd my-react-app

# Instalar dependencias
npm install
```

### Dependencias básicas

```bash
# Instalar dependencias principales
npm install react react-dom sass classnames

# Instalar dependencias de desarrollo
npm install -D @types/react @types/react-dom @vitejs/plugin-react typescript
npm install -D vite terser
```

### Configuración de Vite (vite.config.ts)

```typescript
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import type { UserConfig } from 'vite'

export default defineConfig(({ mode }): UserConfig => {
  // Cargar variables de entorno
  loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@components': resolve(__dirname, 'src/components'),
        '@styles': resolve(__dirname, 'src/styles'),
        '@assets': resolve(__dirname, 'src/assets')
      }
    },
    css: {
      modules: {
        localsConvention: 'camelCase',
        generateScopedName: mode === 'production' 
          ? '[hash:base64:5]'
          : '[local]__[hash:base64:5]'
      },
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@styles/variables.scss" as *;'
        }
      }
    },
    build: {
      target: 'esnext',
      outDir: 'dist',
      assetsDir: 'assets',
      minify: 'terser',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react/jsx-runtime'],
            vendors: ['classnames']
          },
          assetFileNames: (assetInfo) => {
            if (!assetInfo.name) return 'assets/[name]-[hash][extname]';
            
            const info = assetInfo.name.split('.');
            let extType = info[info.length - 1];
            
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = 'img';
            } else if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
              extType = 'fonts';
            }
            
            return `assets/${extType}/[name]-[hash][extname]`;
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
        },
      },
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    server: {
      port: 3000,
      open: true,
      cors: true,
    }
  }
})
```

### Configuración de TypeScript (tsconfig.json)

```json
{
  "extends": "./tsconfig.app.json",
  "include": ["src"]
}
```

### tsconfig.app.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@styles/*": ["./src/styles/*"],
      "@assets/*": ["./src/assets/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## 2. Estructura del proyecto

```
/src
  /assets            # Imágenes, fuentes, etc.
  /components
    /App             # Componente principal de la aplicación
      App.tsx        # Implementación con lazy loading
      AppSkeleton.tsx # Componente de carga
      AppSkeleton.module.scss
      index.ts       # Exportaciones
    /Home            # Página principal
      Home.tsx
      Home.module.scss
      index.ts
    /EnvInfo         # Componente de información de entorno
      EnvInfo.tsx
      EnvInfo.module.scss
      EnvInfoSkeleton.tsx
      LazyEnvInfo.tsx # Wrapper para carga diferida
      index.ts
  /styles
    variables.scss   # Variables globales de SCSS
    index.scss       # Estilos globales
  main.tsx           # Punto de entrada
```

## 3. Configuración de estilos con SCSS

### Estructura de variables SCSS (src/styles/variables.scss)

```scss
// Colores
$color-primary: #0088cc;
$color-secondary: #5cb85c;
$color-accent: #f0ad4e;
$color-danger: #d9534f;
$color-text: #333;
$color-text-light: #767676;
$color-background: #fff;
$color-background-light: #f9f9f9;
$color-border: #ddd;

// Espaciado
$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;
$spacing-xl: 32px;
$spacing-xxl: 48px;

// Fuentes
$font-family-base: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
$font-size-xs: 0.75rem;
$font-size-sm: 0.875rem;
$font-size-md: 1rem;
$font-size-lg: 1.25rem;
$font-size-xl: 1.5rem;
$font-size-xxl: 2rem;
$font-weight-normal: 400;
$font-weight-medium: 500;
$font-weight-bold: 700;
$line-height-base: 1.5;

// Bordes
$border-radius-sm: 4px;
$border-radius-md: 8px;
$border-radius-lg: 12px;

// Sombras
$box-shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
$box-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
$box-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);

// Mixins
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin flex-column {
  display: flex;
  flex-direction: column;
}

@mixin screen-sm {
  @media (min-width: 576px) {
    @content;
  }
}

@mixin screen-md {
  @media (min-width: 768px) {
    @content;
  }
}

@mixin screen-lg {
  @media (min-width: 992px) {
    @content;
  }
}
```

### Estilos globales (src/styles/index.scss)

```scss
@use './variables.scss' as *;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: $font-family-base;
  font-size: $font-size-md;
  line-height: $line-height-base;
  color: $color-text;
  background-color: $color-background;
}
```

## 4. Lazy loading y optimización de rendimiento

### Implementación de lazy loading (App.tsx)

```tsx
import React, { lazy, Suspense } from 'react';
import { AppSkeleton } from './AppSkeleton';

// Carga diferida del componente Home
const LazyHome = lazy(() => import('../Home'));

const App: React.FC = () => {
  return (
    <Suspense fallback={<AppSkeleton />}>
      <LazyHome />
    </Suspense>
  );
};

export { App };
export default App;
```

### Componente Skeleton (AppSkeleton.tsx)

```tsx
import React from 'react';
import styles from './AppSkeleton.module.scss';

export const AppSkeleton: React.FC = () => {
  return (
    <div className={styles.skeleton}>
      {/* Título */}
      <div className={styles.title}></div>
      
      {/* Contenedor de imágenes */}
      <div className={styles.imageContainer}>
        <div className={styles.image}></div>
        <div className={styles.image}></div>
      </div>
    </div>
  );
};
```

### Estilos para el Skeleton (AppSkeleton.module.scss)

```scss
@keyframes pulse {
  0% { opacity: 0.6; }
  100% { opacity: 1; }
}

.skeleton {
  padding: $spacing-xl;
  max-width: 800px;
  margin: 0 auto;
  font-family: $font-family-base;
  animation: pulse 1.5s ease-in-out infinite alternate;
}

.title {
  height: 38px;
  width: 70%;
  background-color: #e0e0e0;
  border-radius: $border-radius-sm;
  margin: 0 auto $spacing-xl;
}

.imageContainer {
  @include flex-center;
  gap: $spacing-xl;
  margin-bottom: $spacing-xl;
}

.image {
  width: 100px;
  height: 100px;
  background-color: #e0e0e0;
  border-radius: $border-radius-md;
  box-shadow: $box-shadow-sm;
}

.envTitle {
  height: 28px;
  width: 60%;
  background-color: #e0e0e0;
  border-radius: $border-radius-sm;
  margin-bottom: $spacing-md;
}

.envList {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}

.envItem {
  display: flex;
  align-items: center;
}

.envLabel {
  height: 16px;
  width: 120px;
  background-color: #e0e0e0;
  border-radius: $border-radius-sm;
  margin-right: $spacing-sm;
}

.envValue {
  height: 16px;
  width: 200px;
  background-color: #e0e0e0;
  border-radius: $border-radius-sm;
}
```

## 5. Optimizaciones de producción

### Configuraciones en package.json

```json
{
  "scripts": {
    "dev": "vite",
    "start:dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview --port 5000",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  }
}
```

### Optimizaciones en vite.config.ts

- **Tree-shaking**: Eliminación automática de código no utilizado
- **Code splitting**: División del código en chunks para optimizar la carga
- **Minificación**: Reducción del tamaño de los archivos para producción
- **Eliminación de console logs**: Eliminar console.logs en producción
- **Organización de assets**: Estructura ordenada de archivos estáticos

## 6. Tamaños óptimos de bundle para aplicaciones React

### Métricas de referencia para aplicaciones React

Un factor crítico para el rendimiento de aplicaciones web es el tamaño del bundle. A continuación se presentan métricas objetivo para aplicaciones React según su escala:

| Tipo de aplicación | Entorno de desarrollo | Entorno de producción |
|-------------------|----------------------|----------------------|
| Pequeña (landing page, blog) | < 3 MB | < 150 KB |
| Mediana (dashboard, e-commerce básico) | < 5 MB | < 300 KB |
| Grande (SPA compleja, CRM, ERP) | < 8 MB | < 500 KB |
| Empresarial (múltiples módulos) | < 12 MB | < 800 KB * |

**\* Nota**: Aplicaciones empresariales complejas pueden superar esta medida, pero debe aplicarse lazy loading agresivo para mantener la carga inicial por debajo de 200 KB.

### Caso de estudio: Optimización de aplicación empresarial

Consideremos una aplicación empresarial con las siguientes características:
- Dashboard administrativo complejo
- 50+ componentes React
- 15+ módulos funcionales
- Integración con múltiples librerías de UI y visualización
- Autenticación y autorización avanzadas

#### Tamaño inicial del bundle:
- **Desarrollo**: 18.5 MB
- **Producción**: 2.8 MB
- **Tiempo de carga inicial**: 6.2 segundos en 3G

#### Estrategias de optimización aplicadas:

1. **Code splitting agresivo**:
   - Ruta basada (por página/módulo)
   - Basada en componentes (lazy load)
   - División por biblioteca (vendors)

2. **Reducción de dependencias**:
   - Auditoría de dependencias (npm-check)
   - Reemplazo de librerías pesadas
   - Importación selectiva (`import { Button } from 'ui-lib'` en lugar de `import UILib from 'ui-lib'`)

3. **Optimización de imágenes y assets**:
   - Compresión de imágenes
   - Uso de formatos modernos (WebP, AVIF)
   - Carga diferida de imágenes

4. **Minificación y compresión avanzada**:
   - Tree-shaking con configuración estricta
   - Terser con configuraciones agresivas
   - Compresión Brotli para producción

5. **Implementación de caché eficiente**:
   - Cache-Control headers
   - Service Workers
   - Nombres de archivos basados en contenido (hashing)

#### Resultados después de optimización:
- **Desarrollo**: 7.2 MB (-61%)
- **Producción**: 420 KB (-85%)
- **Carga inicial**: 180 KB (solo crítico para renderizado)
- **Tiempo de carga inicial**: 1.8 segundos en 3G

### Alertas de tamaño a considerar

| Métrica | Alerta amarilla | Alerta roja |
|---------|----------------|-------------|
| Bundle inicial (FCP) | > 170 KB | > 250 KB |
| Bundle total | > 500 KB | > 1 MB |
| Carga de módulo individual | > 100 KB | > 200 KB |
| Tiempo de primer renderizado | > 2.5s | > 3.5s |

### Herramientas de diagnóstico

1. **rollup-plugin-visualizer**: Análisis visual de tamaño de bundle
2. **webpack-bundle-analyzer**: Alternativa para proyectos webpack
3. **Lighthouse** en Chrome DevTools: Métricas de rendimiento
4. **import-cost** (extensión VSCode): Muestra tamaño de imports
5. **source-map-explorer**: Análisis detallado vía sourcemaps
6. **gzip-size-cli**: Verificar tamaño comprimido de archivos

### Comandos para analizar tamaño

Añade estos comandos a tu package.json:

```json
{
  "scripts": {
    "analyze": "vite build", // Con rollup-plugin-visualizer configurado
    "check-size": "du -sh dist/ && ls -lh dist/assets/js/ | sort -k5h"
  }
}
```

Utiliza estos comandos después del build para verificar los tamaños:

```bash
# Analizar visualmente el bundle
npm run analyze

# Verificar tamaño total y tamaño de cada archivo JS ordenados
npm run check-size
```

Una estrategia recomendada es establecer presupuestos de tamaño y verificarlos regularmente:

```bash
# Ejemplo de salida del comando check-size
384K    dist/  # Tamaño total del directorio
total 384
-rw-r--r--@ 1 usuario  staff     1B  fecha vendors-l0sNRNKZ.js
-rw-r--r--@ 1 usuario  staff   1,9K  fecha index-Bd6tXqEU.js
-rw-r--r--@ 1 usuario  staff    11K  fecha react-BcHYAgrT.js
-rw-r--r--@ 1 usuario  staff   170K  fecha index-DgjN_vTE.js
```

Interpretación:
- El bundle total tiene 384KB (sin compresión)
- El chunk principal tiene 170KB (sin compresión)
- React y su runtime ocupan 11KB adicionales
- El segundo chunk de la aplicación tiene 1.9KB

Esto nos indica que estamos dentro de los parámetros óptimos para una aplicación pequeña-mediana en producción.

Esta información debe usarse como guía, reconociendo que cada aplicación tiene sus particularidades. Lo crucial es establecer un presupuesto de rendimiento desde el inicio y monitorearlo continuamente.

### Contenido específico en Desarrollo vs Producción

Es importante entender qué contiene un bundle en cada entorno:

#### Solo en Desarrollo
Los siguientes elementos solo están en el bundle de desarrollo y NO en producción:

1. **Código de desarrollo de React**:
   - Advertencias y validaciones
   - React DevTools integration
   - Comprobaciones de props y estado
   - Mensajes de error detallados

2. **TypeScript y verificación de tipos**:
   - Advertencias de tipo
   - Interfaces y tipos (eliminados en producción)

3. **PropTypes**:
   - Validación de props en tiempo de ejecución
   - Advertencias en consola
   
4. **Código de depuración**:
   - Comentarios
   - Nombres de variables descriptivos (en producción son minificados)
   - Console.log y otros helpers

#### Solo en Producción
Elementos presentes únicamente en el bundle de producción:

1. **Optimizaciones de rendimiento**:
   - JSX precompilado
   - Código minificado y comprimido
   - Eliminación de código muerto
   
2. **Sin herramientas de desarrollo**:
   - Versión ligera de React sin código de desarrollo
   - Sin validación en tiempo de ejecución
   - Sin mensajes de error detallados

#### Confirmación en tus builds

Puedes verificar que tu build de producción no incluye el código de desarrollo con esta comprobación después de tu build:

```bash
# Comprobar que no se incluyen PropTypes
grep -r "PropTypes" dist/
# Debería retornar vacío

# Comprobar que React está en modo producción
grep -r "development" dist/
# Debería retornar vacío o solo en comentarios
```

## 7. Comandos útiles

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# O usando el alias
npm run start:dev
```

### Producción

```bash
# Crear build de producción
npm run build

# Ver tamaño del build
du -sh dist/

# Previsualizar build de producción
npm run preview
```

### Análisis de bundle

Para analizar el tamaño del bundle, puedes usar herramientas como `rollup-plugin-visualizer`:

```bash
# Instalar el plugin
npm install -D rollup-plugin-visualizer

# Añadir a vite.config.ts en los plugins
import { visualizer } from 'rollup-plugin-visualizer';

plugins: [
  react(),
  visualizer({
    open: true,
    filename: 'dist/stats.html',
    gzipSize: true,
    brotliSize: true,
  })
]

# Luego ejecutar
npm run build
```

## Conclusión

Esta guía te ha mostrado cómo construir una aplicación React moderna utilizando Vite, con enfoque en:

1. Configuración optimizada para desarrollo y producción
2. Uso de SCSS con variables globales y módulos
3. Implementación de lazy loading para mejorar el rendimiento
4. Componentes de skeleton para mejorar la experiencia de usuario
5. Optimizaciones de producción para minimizar el tamaño del bundle

Recuerda que estas prácticas son escalables y pueden adaptarse a proyectos más grandes según tus necesidades específicas. 