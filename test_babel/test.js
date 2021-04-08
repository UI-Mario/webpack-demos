// npx babel test.js --watch --out-file test.t.js
// 详见https://www.babeljs.cn/docs/babel-cli
for (const item of [1, 2, 3, 4]) {
}

const foo = () => {};

class A {
  constructor() {}
  static getId() {}
}

const b = undefined ?? 123;

const antetype = {
  a: 1,
  c: [1, 2, 3],
  z: {
    y: 999,
  },
};

var obj = new Proxy(
  antetype,
  {
    get: function (target, propKey, receiver) {
      console.log(`getting ${propKey}!`);
      return Reflect.get(target, propKey, receiver);
    },
    set: function (target, propKey, value, receiver) {
      console.log(`setting ${propKey}!`);
      return Reflect.set(target, propKey, value, receiver);
    },
  }
);

const fs = require('fs')
const parser = require('@babel/parser')

const body = fs.readFileSync('./module.js', {
    encoding: 'utf-8'
})

console.log(body)

const ast = parser.parse(body, {
    sourceType: 'module'
})

console.log(ast)
