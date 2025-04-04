import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import type { UserConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig(({ mode }): UserConfig => {
  // Cargar variables de entorno para posible uso futuro
  loadEnv(mode, process.cwd(), '')
  
  const isProd = mode === 'production'

  return {
    plugins: [
      react(),
      visualizer({
        open: true,
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
        template: 'treemap', // 'sunburst', 'treemap', 'network'
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@components': resolve(__dirname, 'src/components'),
        '@content': resolve(__dirname, 'src/content'),
        '@styles': resolve(__dirname, 'src/styles'),
        '@assets': resolve(__dirname, 'src/assets')
      }
    },
    define: isProd ? {
      'process.env.NODE_ENV': '"production"',
      // Deshabilitar PropTypes en producción
      'PropTypes': '{}',
    } : undefined,
    css: {
      modules: {
        localsConvention: 'camelCase', // Usar camelCase para nombres de clase en CSS Modules
        generateScopedName: isProd 
          ? '[hash:base64:5]' // Nombres de clase cortos en producción
          : '[local]__[hash:base64:5]' // Nombres más descriptivos en desarrollo
      },
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@styles/variables.scss" as *;' // Variables globales de SCSS sin namespace
        }
      }
    },
    build: {
      target: 'esnext', // Objetivo de compilación moderno para mejor rendimiento
      outDir: 'dist',
      assetsDir: 'assets',
      minify: 'terser', // Usar terser para mejor minificación (requiere instalar terser)
      sourcemap: false, // Desactivar sourcemaps en producción
      cssCodeSplit: true, // Dividir CSS por chunk
      chunkSizeWarningLimit: 500, // Límite para advertir sobre tamaño de chunks (en kB)
      reportCompressedSize: true, // Reportar tamaño comprimido
      rollupOptions: {
        output: {
          manualChunks: {
            // Dividir el código en chunks
            react: ['react', 'react-dom', 'react/jsx-runtime'],
            // No incluir deps vacíos
            vendors: []
          },
          // Organizar los archivos generados en directorios
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
        }
      },
      terserOptions: {
        compress: {
          drop_console: true, // Eliminar console.log en producción
          drop_debugger: true, // Eliminar debugger statements en producción
          pure_funcs: ['console.log', 'console.info', 'console.debug'], // Funciones a eliminar
          passes: 2, // Número de pasadas para optimización
          // Eliminar código muerto y tipos de TypeScript
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          keep_infinity: true,
        },
        mangle: {
          toplevel: true, // Reducir nombres de variables del nivel superior
        },
        format: {
          comments: false, // Eliminar comentarios
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
