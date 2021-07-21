const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/, // 处理以.js结尾的文件
        exclude: /node_modules/, // 处理除了nodde_modules里的js文件
        loader: 'babel-loader' // 用babel-loader处理
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
  ]
};