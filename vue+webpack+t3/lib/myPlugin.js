/* eslint-disable no-useless-constructor */
class myPlugin {
  constructor(doneCallback, failCallback) {
    this.doneCallback = doneCallback
    this.failCallback = failCallback
  }

  apply(compiler) {
    compiler.hooks.done.tap('myPlugin', (stats) => {
      this.doneCallback(stats)
    })
    compiler.hooks.failed.tap('myPlugin', (err) => {
      this.failCallback(err)
    })
  }
}

module.exports = myPlugin
