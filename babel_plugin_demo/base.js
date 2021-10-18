// docs:
// https://lihautan.com/step-by-step-guide-for-writing-a-babel-transformation/
// Babel plugins operates in the transform stage

const babel = require("@babel/core");

const code = `
const a = 123;
const b = '444';
const map = new Map()

const arrFunc = () => {}

class Dog {}
// comment
console.log(123)

function fn(a,b) {
  return '123'
}
fn(1,2)
`;

const output = babel.transformSync(code, {
  plugins: [
    // your first babel plugin 😎😎
    // 写语法转换全靠这个网站：https://astexplorer.net/
    function myCustomPlugin(babel) {
      const t = babel.types
      return {
        name: 'my-first-babel-plugin',
        visitor: {
          // TODO:只能这么获取每个节点写吗？怎么知道节点之间的关系呢
          // 这些顺序有影响吗，是会对之后的又影响还是都只改变最初代码
          // 针对react和vue等框架，每个都写一遍单独的plugin？
          // 怎么处理name和引用了很多层以后的调用
          VariableDeclaration(path) {},
          MemberExpression(path) {
          },
          FunctionDeclaration(path) {
            // in this example change all the variable `n` to `x`
            // 箭头函数居然不算在这里面
            path.remove()

            // console.log('function', path.node);
          },
          ArrowFunctionExpression(path) {
            path.remove()
          },
          StringLiteral(path, state) {
            path.node.value = "Hello World";
          },
          CallExpression(path) {
            if(path.node.callee.name === 'fn') {
              const args = path.node.arguments
              path.replaceWith(
                t.callExpression(t.identifier('trasformFn'), args)
              )
            }
          }
        },
      };
    }
  ],
});

console.log(output.code);
