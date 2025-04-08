# Módulo 3 - Optimizaciones Webpack

Este proyecto implementa diversas optimizaciones en la configuración de Webpack para mejorar el rendimiento, la organización y el mantenimiento del código.

OPCIONAL: Se ha creado en VITE el mismo proyecto en vez de Parcel.

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

### 7. Variables de entorno para desarrollo y producción

Se utilizan variables de entorno específicas para cada entorno mediante el plugin DefinePlugin:

```javascript
// En webpack.dev.js y webpack.prod.js
new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('development'),
  'process.env.API_URL': JSON.stringify('http://localhost:8080/api'),
  'process.env.IS_DEVELOPMENT': JSON.stringify('true'),
  'process.env.IS_PRODUCTION': JSON.stringify('false'),
  'process.env.APP_VERSION': JSON.stringify('dev-version'),
})
```

> ⚠️ **Importante**: Todas las variables deben estar envueltas en `JSON.stringify()`, incluso los valores booleanos como 'true' y 'false'. Si no se hace así, las variables pueden aparecer vacías en la aplicación.

Ventajas:
- Configuración específica según el entorno
- Valores incrustados en tiempo de compilación (no se envían al cliente)
- Optimización de código basada en condiciones de entorno
- Control centralizado de endpoints y configuraciones

Para utilizar estas variables en el código:

```javascript
// En cualquier componente React
if (process.env.IS_DEVELOPMENT === 'true') {
  console.log('Estamos en desarrollo');
}

// URLs de API
fetch(process.env.API_URL + '/users')
  .then(response => response.json())
  .then(data => console.log(data));
```

### 8. Carga diferida (Lazy Loading) y Skeleton UI

Para mejorar el rendimiento y la experiencia de usuario, se implementa una estrategia de carga diferida con esqueletos visuales:

```javascript
// Componente que carga Home de forma diferida
const HomeLazy = lazy(() => import('./Home').then(module => ({ default: module.Home })));

export const App: React.FC = () => {
  return (
    <Suspense fallback={<AppSkeleton />}>
      <HomeLazy />
    </Suspense>
  );
};
```

Beneficios:
- **Carga inmediata y optimizada**: Los componentes se cargan solo cuando son necesarios, sin retrasos artificiales
- **Feedback visual durante la carga real**: Los skeletons se muestran solo durante el tiempo que toma cargar los componentes realmente
- **Experiencia fluida**: Transiciones suaves entre estados de carga y contenido final
- **División de código eficiente**: El código se divide en chunks más pequeños que se cargan bajo demanda
- **Sin saltos de layout**: Los skeletons tienen las mismas dimensiones que los componentes finales

> **Nota**: El esqueleto (skeleton) solo se mostrará durante el tiempo real que tarda en cargar el componente, lo que generalmente es muy rápido en desarrollo local. En redes más lentas o en producción con caché fría, los skeletons proporcionan una mejor experiencia de usuario que una pantalla en blanco.

React en modo desarrollo es significativamente más grande debido a las herramientas de desarrollo incluidas. Por eso, la configuración del entorno de desarrollo tiene límites de tamaño más permisivos:

```javascript
// En webpack.dev.js
performance: {
  maxEntrypointSize: 3 * 1024 * 1024, // 3MB para entorno de desarrollo
  maxAssetSize: 3 * 1024 * 1024,
  hints: "warning",
},
```

### 9. División del bundle para optimización

Para mejorar aún más el rendimiento, el código se divide en múltiples chunks:

```javascript
// En webpack.dev.js y webpack.prod.js
optimization: {
  runtimeChunk: "single",
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all',
        enforce: true,
      },
      react: {
        test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        name: 'react',
        chunks: 'all',
        priority: 10,
      },
    },
  },
},
```

Esto divide la aplicación en:
- **runtime**: El código de tiempo de ejecución de webpack
- **react**: Las bibliotecas de React y React DOM
- **vendors**: Otras bibliotecas externas
- **app**: El código específico de la aplicación

Cada chunk puede cargarse en paralelo y aprovechar la caché del navegador de manera independiente.

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

# Iniciar servidor de desarrollo con configuración de desarrollo
npm run start:dev

# Iniciar servidor de desarrollo con configuración de producción
npm run start:prod   # Ejecuta en puerto 8081 con variables de entorno de producción

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