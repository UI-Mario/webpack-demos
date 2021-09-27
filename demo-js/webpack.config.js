const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HelloWorldPlugin = require("./HelloWorldPlugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundled.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/, // 处理以.js结尾的文件
        exclude: /node_modules/, // 处理除了nodde_modules里的js文件
        // 在写webpack plugin的时候关掉了babel-loader，不然干扰太大
        // loader: "babel-loader", // 用babel-loader处理
      },
    ],
  },
  plugins: [new CleanWebpackPlugin(), new HelloWorldPlugin({
    name: 123
  })],
};
