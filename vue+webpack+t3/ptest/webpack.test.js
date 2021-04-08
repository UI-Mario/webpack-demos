const { PROJECT_PATH } = require('../webpack/constant')
const { resolve } = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: resolve(PROJECT_PATH, './src/index.js')
  },
  output: {
    path: resolve(PROJECT_PATH, './dist'),
    filename: 'js/[name].bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts|js/,
        exclude: /node_modules/,
        use: ['babel-loader', {
          loader: resolve(PROJECT_PATH, './lib/loader.js')
        }]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'bundled_index',
      filename: 'index.html',
      template: resolve(PROJECT_PATH, './public/index.html'),
      cache: false
    })
  ]
}
