const DEFAULT_OPTIONS = {}

class HelloWorldPlugin {
  constructor(options = {}) {
    console.log(options)
    this.option = options || DEFAULT_OPTIONS
  }
  apply(compiler) {
    // compiler hook:https://webpack.js.org/api/compiler-hooks/#hooks
    // 所以，这个environment是干啥的，接在哪个后面，不知
    compiler.hooks.environment.tap("hello world plugin", (stats) => {
      console.log('compiler hook environment');
    });
    compiler.hooks.afterEnvironment.tap("hello world plugin", (stats) => {
      console.log('compiler hook afterEnvironment');
    });
    compiler.hooks.done.tap("hello world plugin", (stats) => {
      console.log('compiler hook done');
    });
  }
}

module.exports = HelloWorldPlugin;

