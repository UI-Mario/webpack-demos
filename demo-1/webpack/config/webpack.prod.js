const { merge } = require('webpack-merge');
// const proxySetting = require('Src/setProxy');
const base = require('./webpack.base');
// 把css抽出来作为单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(base, {
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/bundle.css',
    }),
  ],
});
