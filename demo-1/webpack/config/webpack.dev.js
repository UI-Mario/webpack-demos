const { resolve } = require('path');
const { merge } = require('webpack-merge');
// const proxySetting = require('Src/setProxy');
const base = require('./webpack.base'); //TODO:
const { SERVER_HOST, SERVER_PORT, PROJECT_PATH } = require('../constant');

module.exports = merge(base, {
  mode: 'development',
  // devtool: '#eval-source-map',
  devtool: 'eval-source-map',
  devServer: {
    // TODO:为啥会打开我打包后的index.html??不知，把打出来的html不叫index就找不到了
    // FIXME:!!!!!!!配置多入口会报错，先记着，感觉是个大坑
    host: SERVER_HOST, // 指定 host，不设置的话默认是 localhost
    port: SERVER_PORT, // 指定端口，默认是8080
    contentBase: resolve(PROJECT_PATH, './build'), // 其实不指定也行，默认他好像也会自己找到
    stats: 'errors-only', // 终端仅打印 error
    clientLogLevel: 'silent', // 日志等级
    compress: true, // 是否启用 gzip 压缩
    // open: true, // 打开默认浏览器
    hot: true, // 热更新
    // proxy: { ...proxySetting }, // 启用代理
  },
});
