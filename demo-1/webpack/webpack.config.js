// CommonJS，毕竟webpack是node写出来的
//配置ts， 配置eslint，css等样式
// 多入口，多出口
// tree shaking, code split
// 各种优化
const path = require("path");
const { PROJECT_PATH } = require("./constant");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  // devServer: {
  //   host: "127.0.0.1", // 指定 host，不设置的话默认是 localhost
  //   port: 8081, // 指定端口，默认是8080
  //   // stats: 'errors-only', // 终端仅打印 error
  //   // clientLogLevel: 'silent', // 日志等级
  //   // compress: true, // 是否启用 gzip 压缩
  //   // open: true, // 打开默认浏览器
  //   // hot: true, // 热更新
  //   // proxy: { ...proxySetting }, // 启用代理
  // },
  // TODO:这玩意儿感觉没啥用啊
  // devtool: 'inline-source-map',
  entry: {
    // TODO:有意思的是这里的路径算绝对还是相对，都不像
    index: "./src/index.js",
    another_entry: "./src/another_entry.js",
  },
  output: {
    // 多入口时，打包出来的文件名字必须不一样
    // TODO:那html怎么确定要引入的js文件，文件名一直变
    // ANSWER:html-webpack-plugin
    filename: "[name].[hash:8].bundle.js",
    //必须是绝对路径
    // path.resolve和path.join
    path: path.resolve(PROJECT_PATH, "./build"),
  },
  // loader的配置
  module: {
    rules: [
      // 详细loader配置
      // 不同文件处理配置不同loader处理
      // 一个loader配置写在一个对象{}里
      {},
      {},
    ],
  },

  // plugins的配置
  plugins: [
    // 详细plugins的配置
    new HtmlWebpackPlugin({
      title: 'bundled_index',
      // 相对路径，起点为output里设置的
      filename: 'bundled_index.html',
      // 根目录demo-1为起点
      template: './public/index.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'test/another_test.html',
    })
  ],
};
