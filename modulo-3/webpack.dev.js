import { merge } from "webpack-merge";
import common from "./webpack.common.js";
import path from "path";
import url from "url";
import webpack from "webpack";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default merge(common, {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                exportLocalsConvention: "camelCase",
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  devtool: "eval-source-map",
  devServer: {
    port: 8080,
    open: true,
    hot: true,
    static: {
      directory: path.join(__dirname, "src"),
    },
    devMiddleware: {
      stats: "errors-only",
    },
  },
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
  performance: {
    maxEntrypointSize: 5 * 1024 * 1024, // 5MB
    maxAssetSize: 5 * 1024 * 1024,      // 5MB
    hints: "warning",                    // Mantener advertencias pero con límites más altos
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.API_URL': JSON.stringify('http://localhost:8080/api'),
      'process.env.STATIC_URL': JSON.stringify('http://localhost:8080/static'),
      'process.env.IS_DEVELOPMENT': JSON.stringify('true'),
      'process.env.IS_PRODUCTION': JSON.stringify('false'),
      'process.env.APP_VERSION': JSON.stringify('dev-version'),
    }),
  ],
});
