// docs:
// https://lihautan.com/step-by-step-guide-for-writing-a-babel-transformation/

const babel = require("@babel/core");

const code = `
const a = 123;
const map = new Map()

const arrFunc = () => {}

class Dog {}
// comment
console.log(123)
`;

const output = babel.transformSync(code, {
  plugins: [
    // your first babel plugin 😎😎
    // 写语法转换全靠这个网站：https://astexplorer.net/
    function myCustomPlugin() {
      return {
        visitor: {
          Identifier(path) {
            // in this example change all the variable `n` to `x`
            console.log(path.node)
          },
        },
      };
    },
  ],
});

console.log(output.code);
