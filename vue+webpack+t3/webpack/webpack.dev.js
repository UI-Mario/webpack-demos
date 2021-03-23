const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.base')
const path = require('path')
const { SERVER_HOST, SERVER_PORT } = require('./constant');
const devConfig = {
  // oricess.env.NODE_ENV和这个mode有什么区别？
  // 根据官方文档的表述，设置mode会自动帮你做一些plugins上的增减，
  // 以及把process.env.NODE_ENV设置成相应的值
  mode: "development",
  devtool: '#eval-source-map',
  devServer: {
    port: SERVER_PORT, // 本地模拟服务器端口
    open: true, // 运行开发环境，打开浏览器
    hot: true, // 热更新
    hotOnly: true
  }
}

module.exports = merge(commonConfig, devConfig)
