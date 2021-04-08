const { PROJECT_PATH } = require("./constant");
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack');
const env = require('../bin/loadEnv');

module.exports = {
  entry: {
    index: resolve(PROJECT_PATH, "./src/index.tsx"),
  },
  output: {
    path: resolve(PROJECT_PATH, "./dist"),
    filename: "js/[name].bundle.js",
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      Src: resolve(PROJECT_PATH, './src'),
      Components: resolve(PROJECT_PATH, './src/components'),
      Utils: resolve(PROJECT_PATH, './src/utils'),
    },
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
        test: /\.ts|js|jsx|tsx/,
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
      }
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
    new webpack.DefinePlugin({
      'process.env': {
        ...env
      }
    })
  ],
};
