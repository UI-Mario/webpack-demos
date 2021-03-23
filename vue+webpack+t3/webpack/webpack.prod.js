const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.base.js')

const prodConfig = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
  ]
}

module.exports = merge(commonConfig, prodConfig)
