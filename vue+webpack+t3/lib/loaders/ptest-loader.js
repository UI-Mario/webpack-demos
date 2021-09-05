/**
 * @param {string|Buffer} source 源文件的内容
 * @param {object} [map] 可以被 https://github.com/mozilla/source-map 使用的 SourceMap 数据
 * @param {any} [meta] meta 数据，可以是任何内容
 */
module.exports = function(source, sourcemap, meta) {
  // TODO:
  // 1. 真正做一个parser
  // 2. 把entry不设置成js文件，就可以直接转；
  // 目前都只是做的中间loader，字符串传出去就完事了
  return `module.exports = ${source.replace('ptest', '123')}`
}
