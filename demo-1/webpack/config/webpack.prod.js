const { merge } = require('webpack-merge');
// const proxySetting = require('Src/setProxy');
const base = require('./webpack.base');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(base, {
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/bundle.css',
    }),
  ],
});
