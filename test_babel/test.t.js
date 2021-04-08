import "core-js/modules/es.reflect.get.js";
import "core-js/modules/es.reflect.set.js";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

for (var _i = 0, _arr = [1, 2, 3, 4]; _i < _arr.length; _i++) {
  var item = _arr[_i];
}

var foo = function foo() {};

var A = /*#__PURE__*/function () {
  function A() {
    _classCallCheck(this, A);
  }

  _createClass(A, null, [{
    key: "getId",
    value: function getId() {}
  }]);

  return A;
}();

var b = undefined !== null && undefined !== void 0 ? undefined : 123;
var antetype = {
  a: 1,
  c: [1, 2, 3],
  z: {
    y: 999
  }
};
var obj = new Proxy(antetype, {
  get: function get(target, propKey, receiver) {
    console.log("getting ".concat(propKey, "!"));
    return Reflect.get(target, propKey, receiver);
  },
  set: function set(target, propKey, value, receiver) {
    console.log("setting ".concat(propKey, "!"));
    return Reflect.set(target, propKey, value, receiver);
  }
});

var fs = require('fs');

var parser = require('@babel/parser');

var body = fs.readFileSync('./module.js', {
  encoding: 'utf-8'
});
console.log(body);
var ast = parser.parse(body, {
  sourceType: 'module'
});
console.log(ast);
