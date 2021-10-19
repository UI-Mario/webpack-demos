// 自动浏览器前缀
const autoprefixer = require("autoprefixer");
const postcss = require("postcss");
// const postcssNested = require('postcss-nested')
const fs = require("fs");
const custom_plugin = require("./plugin.js")

const entry_css = "app.css";
const output_css = "dest/transform.css";

// 猛然发现，这个writeFile方法还真就只能writeFile
// 路径中涉及的文件夹必须存在，不存在要自己创建
// if (!fs.existsSync("dest")) {
//   fs.mkdirSync("dest", { recursive: true });
// }
// fs.writeFile("dest/n.css", "123", (e) => {
//   console.log("writeFile error", e);
// });

fs.readFile(entry_css, (err, css) => {
  postcss([autoprefixer, custom_plugin])
    .process(css, { from: entry_css, to: output_css })
    .then((result) => {
      fs.writeFile(output_css, result.css, (err) => {
        console.log("write file error", err);
      });
      if (result.map) {
        fs.writeFile(`${output_css}.map`, result.map.toString(), () => true)
      }
    })
    .catch((e) => {
      console.log("postcss process error", e);
    });
});
