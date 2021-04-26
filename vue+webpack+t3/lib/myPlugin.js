/* eslint-disable no-useless-constructor */
class myPlugin {
  constructor(doneCallback, failCallback) {
    this.doneCallback = doneCallback
    this.failCallback = failCallback
  }

  apply(compiler) {
    // 监听结束事件
    // 难的学不会，简单的又瞧不上，回去写threejs了
    compiler.hooks.done.tap('myPlugin', (stats) => {
      this.doneCallback(stats)
    })
    compiler.hooks.failed.tap('myPlugin', (err) => {
      this.failCallback(err)
    })
  }
}

module.exports = myPlugin
