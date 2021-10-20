const postcss = require("postcss");

// 列一下postcss所给出的数据类型

module.exports = postcss.plugin("postcss-test-plugin", function (opts) {
  opts = opts || {};
  // Work with options here
  return function (root, result) {
    //   postcss好像把@media @keyframes给分成了AtRule对象，其他的是Rule对象
    console.log(root.nodes);
    // Transform CSS AST here
    // 只是遍历Rule对象，还可能有注释Comment啥的
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
      console.log(rule)
      rule.walkDecls(function (decl) {
        // TODO: 比较迷惑的是，@media和@keyframe是AtRule对象，不是Rule对象
        // 但是这里的decl又能拿到@keyframes里的css规则
        // 就很迷惑
        // console.log(decl.prop)
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
