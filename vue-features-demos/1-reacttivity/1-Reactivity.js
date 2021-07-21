const obj = {};

let a = 1;

Object.defineProperty(obj, "a", {
  get() {
    console.log(a);
  },
  set(newValue) {
    a = newValue;
  },
  // 对于循环来讲，很重要
  enumerable: true,
  // 可编辑
  configurable: true,
  // 没法赋值，但是跟accessors没法同时使用
  // 这个accessors指的是什么，还没搞懂
  // 但是> MDN: 如果一个描述符同时拥有 value 或 writable 和 get 或 set 键，则会产生一个异常
  //   writable: true
});

// obj.a;
// obj.a = 10;
// obj.a;

// 这一节看的贼吃力============================

class Dep {
  constructor() {
    this.subscribers = new Set();
  }
  // register the current active update
  // as a subscriber
  depend() {}
  // run all subscriber functions
  notify() {}
}

let activeUpdate;

const autorun = (update) => {
  const wrappedUpdate = () => {
    // 这段代码真的是愁死我了
    // 说是要有activeUpdate的访问权，但为什么需要呢
    activeUpdate = wrappedUpdate;
    update();
    activeUpdate = null;
  };
};

// observe=================================

const state = {
  name: "Livio",
  age: "100"
};

let observe = (state) => {
  Object.keys(state).forEach((key) => {
    let copy = state[key];
    Object.defineProperty(state, key, {
      get() {
        console.log(key + " is get:", copy);
        return copy;
      },
      set(newValue) {
        console.log(key + " is set:", newValue);
        copy = newValue
      },
    });
  });
};

observe(state);

autorun(() => {
  console.log(state.name);
});


state.name;
state.name = "123";
state.age
