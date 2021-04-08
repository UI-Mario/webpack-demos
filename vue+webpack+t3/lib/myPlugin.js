/* eslint-disable no-useless-constructor */
class myPlugin {
  constructor(options) {
  }
  apply(complier) {
    complier.plugin('compilation', function(_compilation) {

    })
  }
}

module.exports = myPlugin
