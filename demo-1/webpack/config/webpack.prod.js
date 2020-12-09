const { merge } = require('webpack-merge');
// const proxySetting = require('Src/setProxy');
const base = require('./webpack.base');

module.exports = merge(base, {
  mode: 'production',
});
