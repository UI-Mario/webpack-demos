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
      // 都要吐血了这入参到底是啥
      // 打印会报错，文档又不写
      // f***
      console.log('compiler hook done', stats.compilation.options);
    });
  }
}

module.exports = HelloWorldPlugin;

