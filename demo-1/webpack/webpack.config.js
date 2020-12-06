// CommonJS，毕竟webpack是node写出来的
//配置ts， 配置eslint，css等样式
// 各种优化
const path = require("path");
const { PROJECT_PATH } = require('./constant');

module.exports = {
  mode: "development",
  devServer: {
    host: '127.0.0.1', // 指定 host，不设置的话默认是 localhost
    port: 8081, // 指定端口，默认是8080
    // stats: 'errors-only', // 终端仅打印 error
    // clientLogLevel: 'silent', // 日志等级
    // compress: true, // 是否启用 gzip 压缩
    // open: true, // 打开默认浏览器
    // hot: true, // 热更新
    // proxy: { ...proxySetting }, // 启用代理
  },
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    //必须是绝对路径
    // path.resolve和path.join
    path: path.resolve(PROJECT_PATH, "./build"),
  },
};
