module.exports = function(source) {
  // TODO:
  // 1. 真正做一个parser
  // 2. 把entry不设置成js文件，就可以直接转；
  // 目前都只是做的中间loader，字符串传出去就完事了
  return `module.exports = ${source.replace('ptest', '123')}`
}
