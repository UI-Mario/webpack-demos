// 操作DOM元素，将content显示到页面上
function show(content) {
  document.getElementById("app").innerHTML = "hello " + content;
}

module.exports = {
  show,
};
