import { merge } from "webpack-merge";
import common from "./webpack.common.js";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default merge(common, {
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
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                exportLocalsConvention: "camelCase",
                localIdentName: "[hash:base64:5]",
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
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
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash].css",
      chunkFilename: "[id].[chunkhash].css",
    }),
  ],
}); 