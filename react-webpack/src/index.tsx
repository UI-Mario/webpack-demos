import React from "react";
import ReactDom from "react-dom";

ReactDom.render(
  <div>
    <p>hello react</p>
  </div>,
  document.getElementById("root")
);

console.log('hello typescriptt')
const obj = {
  a: 1,
  c: 3
}
const str:string = '123'
console.log(obj?.c)
console.log(null ?? 'this is null/undefined')
// 这里自己给process.env增加了内容，详见bin文件夹
console.log(process.env)
