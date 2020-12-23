const { resolve } = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackBar = require('webpackbar');

// 啥时候用绝对路径，啥时候用相对路径，啥时候用第三个奇怪的路径？？

module.exports = {
  mode: 'development',
  entry: {
    index: "./src/index.js",
  },
  output: {
    path: resolve(__dirname, '../dist'),
    filename: 'js/[name].[hash:8].js'
  },
  plugins: [],
  module: {
    rules: [],
  },
};
