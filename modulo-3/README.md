# Módulo 3 - Optimizaciones Webpack

Este proyecto implementa diversas optimizaciones en la configuración de Webpack para mejorar el rendimiento, la organización y el mantenimiento del código.

## Optimizaciones implementadas

### 1. Alias de importaciones

Se han configurado alias para simplificar las importaciones y evitar rutas relativas complejas:

```javascript
// En webpack.common.js
resolve: {
  alias: {
    "@": path.resolve(__dirname, "src"),
    "@components": path.resolve(__dirname, "src/components"),
    "@content": path.resolve(__dirname, "src/content"),
    "@styles": path.resolve(__dirname, "src/styles"),
  },
}
```

Esto permite importar archivos de forma más limpia:

```javascript
// Antes
import { Home } from '../../components/Home';
import logo from '../../../content/logo.png';

// Después
import { Home } from '@components/Home';
import logo from '@content/logo.png';
```

### 2. Optimización de imágenes

Se utiliza `image-minimizer-webpack-plugin` con Sharp para comprimir automáticamente las imágenes:

```javascript
// En webpack.prod.js
new ImageMinimizerPlugin({
  minimizer: {
    implementation: ImageMinimizerPlugin.sharpMinify,
    options: {
      encodeOptions: {
        jpeg: {
          quality: 80,
          progressive: true,
        },
        png: {
          quality: 80,
          compressionLevel: 9,
        },
        // ...
      },
    },
  },
  include: /\.(jpe?g|png)$/i,
  generator: [
    {
      preset: "webp",
      implementation: ImageMinimizerPlugin.sharpGenerate,
      // ...
    },
  ],
})
```

Beneficios de la optimización de imágenes:
- Reducción del tamaño de las imágenes (hasta 85% en algunos casos)
- Generación automática de formatos modernos (WebP)
- Mejora significativa en los tiempos de carga

### 3. Gestión avanzada de activos

Configuración inteligente para el manejo de diferentes tipos de archivos:

```javascript
// En webpack.common.js
{
  test: /\.(png|jpg|jpeg|gif)$/i,
  type: "asset",
  parser: {
    dataUrlCondition: {
      maxSize: 8 * 1024, // Archivos < 8kb se convierten a base64
    },
  },
  generator: {
    filename: "images/[name].[hash:8][ext][query]",
  },
}
```

Esto proporciona:
- Incrustación automática en base64 para imágenes pequeñas (ahorra peticiones HTTP)
- Organización de archivos en carpetas específicas
- Hash en nombres de archivo para control de caché eficiente

### 4. Minificación y optimización para producción

Se implementan varios plugins para optimizar el código en producción:

```javascript
// En webpack.prod.js
optimization: {
  minimize: true,
  minimizer: [
    new TerserPlugin({ /* ... */ }),     // JavaScript
    new CssMinimizerPlugin(),            // CSS
    new ImageMinimizerPlugin({ /* ... */ }) // Imágenes
  ],
}
```

Estas optimizaciones:
- Eliminan comentarios y espacios en el código
- Reducen significativamente el tamaño de los archivos
- Mejoran los tiempos de carga y el rendimiento general

### 5. Extracción y organización de CSS

```javascript
// En webpack.prod.js
new MiniCssExtractPlugin({
  filename: "css/[name].[chunkhash].css",
  chunkFilename: "css/[id].[chunkhash].css",
})
```

Beneficios:
- Extrae el CSS a archivos independientes (no incrustados en JS)
- Permite carga paralela de CSS y JS
- Mejora la organización del código generado

### 6. División de código (Code Splitting)

```javascript
// En webpack.prod.js
optimization: {
  runtimeChunk: "single",
  splitChunks: {
    cacheGroups: {
      vendor: {
        chunks: "all",
        name: "vendor",
        test: /[\\/]node_modules[\\/]/,
        enforce: true,
      },
    },
  },
}
```

Esto separa el código en:
- Código de aplicación (app)
- Código de bibliotecas externas (vendor)
- Código de tiempo de ejecución de Webpack (runtime)

Ventajas:
- Mejor aprovechamiento de la caché del navegador
- Carga más rápida cuando solo cambia el código de la aplicación
- Optimización de la descarga inicial

## Configuración de entornos

El proyecto utiliza distintas configuraciones según el entorno:

- **webpack.common.js**: Configuración base compartida
- **webpack.dev.js**: Configuración para desarrollo (sourcemaps, hot reload)
- **webpack.prod.js**: Configuración para producción (optimizaciones)
- **webpack.perf.js**: Configuración para análisis de rendimiento

## Scripts disponibles

```bash
# Desarrollo con hot reload
npm start

# Compilación para desarrollo
npm run build:dev

# Compilación optimizada para producción
npm run build:prod

# Verificación de tipos TypeScript
npm run type-check

# Análisis del bundle
npm run build:perf
```

## Dependencias principales

- **webpack**: Bundler principal
- **typescript**: Soporte para TypeScript
- **babel**: Transpilación de JavaScript
- **sharp**: Optimización de imágenes
- **css/sass loaders**: Procesamiento de estilos
- **terser**: Minificación de JavaScript
- **webpack-bundle-analyzer**: Análisis del bundle 