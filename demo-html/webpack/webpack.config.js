const { resolve } = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// FIXME:一个神奇的坑，留底存证
// 在这个无比简陋的项目里，
// 如果yarn build的script是webpack --config ./webpack/webpack.config.js
// 就可以跑
// webpack ./webpack/webpack.config.js
// 就不行
// why？
// ANSWER:
// If for some reason you want to use different configuration file 
// depending on certain situations you can change this 
// via command line by using the --config flag.
// 所以，看来坑是白留了

module.exports = {
  mode: 'production',
  // optimization: {
  //   usedExports: true,
  // },
  entry: {
    index: "./src/index.js",
  },
  output: {
    path: resolve(__dirname, "../dist"),
    filename: "js/[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          // {
          //   loader: "style-loader",
          // },
          {
            loader: "css-loader",
            options: {
              modules: true
            },
          }
        ],
      },
    ],
  },
  devServer: {
    static: {
      directory: resolve(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "bundled_index",
      filename: "index.html",
      template: resolve(__dirname, '../public/index.html'),
      cache: false
    }),
    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名
      filename: "css/[name].css",
    }),
  ]
};
