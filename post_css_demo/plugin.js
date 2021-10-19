const postcss = require("postcss");

module.exports = postcss.plugin("postcss-test-plugin", function (opts) {
  opts = opts || {};
  // Work with options here
  return function (root, result) {
    //   postcss好像把@media @keyframes给分成了AtRule对象，其他的是Rule对象
    console.log(root.nodes);
    // Transform CSS AST here
    root.walkRules(function (rule) {
      // We'll put more code here in a moment…
      //   Rule对象数据结构(只列出部分，详见https://postcss.org/api/#rule)
      //   对于postcss的api文档写的很好，建议看看
      // {
      //     raws
      //     type: rule
      //     nodes，看起来是数组包裹着decl对象
      //     parent
      //     source
      //     selector: css选择器, .class #id .class>.class之类的包括:hover，比较让我奇怪的是@media和@keyframes怎么获取呢
      // }
      rule.walkDecls(function (decl) {
        // We work with each `decl` object here.
        // declaration 数据结构
        // {
        //     raws
        //     type: decl的type就是decl，TODO: 其余type
        //     parent
        //     source
        //     prop: 所对应的css规则，例如width, overflow，注意是规则，而不是.class #id @keyframes之类的
        //     value: 所对应的css规则的具体值，例如100px、circle(50%)啥的
        // }
        // decl.value = decl.value.split('').reverse().join('')
      });
    });
  };
});
