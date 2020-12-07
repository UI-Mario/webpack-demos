const path = require('path');
const { PROJECT_PATH } = require('../constant')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, '.build')
  }
};
