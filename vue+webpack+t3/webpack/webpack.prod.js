const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.base.js')
const CompressionPlugin = require("compression-webpack-plugin");

const prodConfig = {
  mode: 'production',
  plugins: [
    new CompressionPlugin({
      test: /\.(js|css|html|svg|wasm|png)$/,
      threshold: 2000,
      minRatio: 0.8,
      compressionOptions: {
        numiterations: 15
      }
    })
  ]
}

module.exports = merge(commonConfig, prodConfig)
