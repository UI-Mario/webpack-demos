// TODO: 这是一个去掉console.log()的plugin
// 但不得不说这个出发点很烂，没有ast的好处
// 当然也可能是因为我太菜不会写plugin

const fs = require('fs')
const DEFAULT_OPTIONS = {}

class HelloWorldPlugin {
  constructor(options = {}) {
    console.log(options)
    this.option = options || DEFAULT_OPTIONS
  }
  apply(compiler) {
    // compiler hook:https://webpack.js.org/api/compiler-hooks/#hooks
    // 所以，这些是干啥的，接在哪个后面，不知
    // compilation: https://webpack.js.org/api/compilation-hooks/
    // 入参stats：https://webpack.js.org/configuration/stats/
    compiler.hooks.environment.tap("hello world plugin", () => {
      console.log('compiler hook environment');
    });
    compiler.hooks.afterEnvironment.tap("hello world plugin", () => {
      console.log('compiler hook afterEnvironment');
    });
    compiler.hooks.done.tap("hello world plugin", (stats) => {
      // TODO:都要吐血了这入参到底是啥
      // 打印会报错，文档又不写
      // f***
      // console.log('compiler hook done', stats.compilation.options);
      // TODO:我挺好奇很多人plugin找打包后的文件都这么写
      // 那么multi output和[name].[contenthash].js的情况下就没用了
      const { path, filename } = stats.compilation.options.output;
      try {
        let filePath = path + "/" + filename;
        fs.readFile(filePath, "utf8", (err, data) => {
          const rgx = /console.log\(['|"](.*?)['|"]\)/;
          const newdata = data.replace(rgx, "");
          if (err) console.log(err);
          fs.writeFile(filePath, newdata, function(err) {
            if (err) {
              return console.log(err)
            }
            console.log("Logs Removed");
          });
        });
      } catch (error) {
        console.log(error)
      }
    });
  }
}

module.exports = HelloWorldPlugin;

