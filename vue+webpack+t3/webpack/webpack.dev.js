const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.base");
const path = require("path");
const { SERVER_HOST, SERVER_PORT } = require("./constant");
const devConfig = {
  // oricess.env.NODE_ENV和这个mode有什么区别？
  // 根据官方文档的表述，设置mode会自动帮你做一些plugins上的增减，
  // 以及把process.env.NODE_ENV设置成相应的值
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    port: SERVER_PORT, // 本地模拟服务器端口
    open: true, // 运行开发环境，打开浏览器
    hot: true, // 热更新
    hotOnly: true,
    // proxy: {
    //     "/api": {
    //       target: "http://59.37.37.241:8005/config-service/manager?channel=wx&sign=5&type=1&version=1&access_token=&endDate=&fundList=&internal=&manId=&manIntroduction=&manName=&manUrl=&page=&pageSize=&sortType=&sourceId=&startDate=&targetId=", //测试环境转发
    //       changeOrigin: true,
    //       secure: false,
    //       ingorePath: false,
    //       pathRewrite: {
    //         "^/api": "",
    //     },
    //   },
    // },
  },
};

module.exports = merge(commonConfig, devConfig);
