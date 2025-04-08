import { merge } from "webpack-merge";
import common from "./webpack.common.js";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import url from "url";
import TerserPlugin from "terser-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import ImageMinimizerPlugin from "image-minimizer-webpack-plugin";
import webpack from "webpack";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default (env = {}) => {
  const isProdServer = !!env.production;
  
  return merge(common, {
    mode: "production",
    output: {
      filename: "[name].[chunkhash].js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            isProdServer ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: {
                  exportLocalsConvention: "camelCase",
                  localIdentName: "[hash:base64:5]",
                  auto: true
                },
              },
            },
            "sass-loader",
          ],
        },
      ],
    },
    devtool: isProdServer ? "source-map" : false,
    devServer: isProdServer ? {
      port: 8081,
      open: true,
      hot: true,
      static: {
        directory: path.join(__dirname, "src"),
      },
      devMiddleware: {
        stats: "errors-only",
      },
    } : undefined,
    performance: {
      maxEntrypointSize: 500 * 1024, // 500KB
      maxAssetSize: 500 * 1024,      // 500KB
      hints: "warning",
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),
        new CssMinimizerPlugin(),
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.sharpMinify,
            options: {
              encodeOptions: {
                // Opciones para jpg
                jpeg: {
                  quality: 80,
                  progressive: true,
                },
                // Opciones para png
                png: {
                  quality: 80,
                  compressionLevel: 9,
                },
                // Opciones para webp
                webp: {
                  quality: 80,
                },
                // Opciones para avif
                avif: {
                  quality: 80,
                },
              },
            },
          },
          // Imágenes a procesar, usar minimatch syntax
          include: /\.(jpe?g|png)$/i,
          // Generador de nombres de archivo para imágenes procesadas
          generator: [
            {
              preset: "webp",
              implementation: ImageMinimizerPlugin.sharpGenerate,
              options: {
                encodeOptions: {
                  webp: {
                    quality: 85,
                  },
                },
              },
            },
          ],
        }),
      ],
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
    },
    plugins: [
      ...(isProdServer ? [] : [
        new MiniCssExtractPlugin({
          filename: "css/[name].[chunkhash].css",
          chunkFilename: "css/[id].[chunkhash].css",
        }),
      ]),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env.API_URL': JSON.stringify('https://api.tudominio.com'),
        'process.env.STATIC_URL': JSON.stringify('https://static.tudominio.com'),
        'process.env.IS_DEVELOPMENT': JSON.stringify('false'),
        'process.env.IS_PRODUCTION': JSON.stringify('true'),
        'process.env.APP_VERSION': JSON.stringify('1.0.0'),
      }),
    ],
  });
}; 