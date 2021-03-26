const { PROJECT_PATH } = require("./constant");
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack');
const env = require('../bin/loadEnv');

module.exports = {
  entry: {
    index: resolve(PROJECT_PATH, "./src/index.js"),
  },
  output: {
    path: resolve(PROJECT_PATH, "./dist"),
    filename: "js/[name].bundle.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          }
        ],
      },
      {
        test: /\.ts|js/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        // webpack5内置了asset模块来代替file-loader, url-loader啥的
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              limit: 5000,
              name: "imgs/[hash].[ext]",
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "bundled_index",
      filename: "index.html",
      template: resolve(PROJECT_PATH, "./public/index.html"),
      cache: false,
    }),
    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名
      filename: "css/[name].css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve(PROJECT_PATH, './src/assets'),
          to: resolve(PROJECT_PATH, './dist/assets')
        }
      ]
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        ...env
      }
    })
  ],
};
