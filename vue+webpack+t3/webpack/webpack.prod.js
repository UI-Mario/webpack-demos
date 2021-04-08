const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.base.js')
const CompressionPlugin = require("compression-webpack-plugin");

const prodConfig = {
  mode: 'production',
  // 这里的source-map会产生成一张映射表，才能把代码从打包后映射到打包前
  devtool: 'source-map',
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
