module.exports = function () {
  return {
    visitor: {
      Identifier(path) {
        debugger
        const name = path.node.name;
        // reverse the name: JavaScript -> tpircSavaJ
        path.node.name = name.split("").reverse().join("");
      },
    },
  };
}
