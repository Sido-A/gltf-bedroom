const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    hot: true,
    client: false,
    port: 2000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Three JS Bedroom",
      filename: "index.html",
      template: "./src/template.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      //   {
      //     test: /\.(glb|gltf)$/,
      //     use: [
      //       {
      //         loader: "file-loader",
      //         options: {
      //           outputPath: "assets/models/",
      //           type: "asset/resource",
      //           esModule: false,
      //         },
      //       },
      //     ],
      //   },
      {
        test: /\.(png|svg|jpe?g|bin|gif|glb|gltf)$/,
        loader: "file-loader",
        options: {
          type: "asset/resource",
          esModule: false,
        },
      },
    ],
  },
};
