import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default {
  context: path.resolve(__dirname, "src"),
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@content": path.resolve(__dirname, "src/content"),
      "@styles": path.resolve(__dirname, "src/styles"),
    },
  },
  entry: {
    app: "./main.tsx",
  },
  output: {
    filename: "[name].[chunkhash].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            // Archivos menores a 8kb serán inline (base64)
            maxSize: 8 * 1024, 
          },
        },
        generator: {
          filename: "images/[name].[hash:8][ext][query]",
        },
      },
      {
        test: /\.svg$/,
        type: "asset/resource",
        generator: {
          filename: "images/[name].[hash:8][ext][query]",
        },
      },
      {
        test: /\.html$/,
        use: "html-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      scriptLoading: "blocking",
    }),
  ],
};
