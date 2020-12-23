const { resolve } = require("path");


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
  entry: {
    index: "./src/index.js",
  },
  output: {
    path: resolve(__dirname, "../dist"),
    filename: "js/[name].bundle.js",
  },
};
