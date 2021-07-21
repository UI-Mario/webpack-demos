const { resolve } = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackBar = require('webpackbar');

// 啥时候用绝对路径，啥时候用相对路径，啥时候用第三个奇怪的路径？？

module.exports = {
  mode: 'development',
  optimization: {
    usedExports: true,
  },
  entry: {
    index: "./src/index.js",
    another: "./src/another.js",
  },
  output: {
    path: resolve(__dirname, '../dist'),
    filename: 'js/[name].[chunkhash:8].js'
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [],
  },
};
