const Koa = require("koa");
// 如果网页只是提供静态资源
const KoaStatic = require("koa-static");
const KoaRouter = require("@koa/router");
const KoaBody = require("koa-body");
const bodyParser = require('koa-bodyparser');
// 可以使用，神奇(在packagejson里写上type:module)
// import fs from "fs";
const fs = require("fs");
const path = require("path");

const mongoose = require("./database");

const app = new Koa();

// ==============================router-===============================
const router = new KoaRouter();

router
  // /login => /sign-in
  .redirect("/login", "/sign-in")
  .get("/", (ctx, next) => {
    // 通过set可以设置response header里的字段
    ctx.set("access-control-allow-credentials", true);
    // 需要根据request里的content-type来进行设置内容，当然也可以不鸟他
    // ctx.response.type = "html";
    // or
    ctx.set("Content-Type", "text/html; charset=utf-8");
    // ctx.body = fs.createReadStream("./demo.html");
    ctx.body = "hello world";
  })
  .get("/users", (ctx, next) => {
    console.log(ctx.query);
    // 总算知道post的数据放在哪了
    console.log(ctx.request.body);
    ctx.body = "hello users";
  })
  .get("/users/:id", (ctx, next) => {
    // ...
    console.log(ctx.params);
  })
  .post("/users", (ctx, next) => {
    console.log(ctx.query);
    console.log(typeof ctx.request.body);
  })
  .del("/users/:id", (ctx, next) => {
    // ...
    var err = new Error("name required");
    err.status = 400;
    throw err;
  })
  .all("/users/:id", (ctx, next) => {
    // ...
    console.log("all");
  });

// ========================================================================
// 这个捕获异常的处理很重要，位置在第一个
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log(err.status);
    ctx.status = err.status || 500;
    ctx.body = err.message;
  }
});
// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

// ============================middleware==============================
// 知道为啥叫洋葱模型，next的存在和use的顺序
const one = (ctx, next) => {
  console.log(">> one");
  next();
  console.log("<< one");
};

const two = (ctx, next) => {
  console.log(">> two");
  next();
  console.log("<< two");
};

const three = (ctx, next) => {
  console.log(">> three");
  next();
  console.log("<< three");
};

// app.use(one);
// app.use(two);
// app.use(three);

// ===========================================================
// 中间件也有顺序
// 静态文件
// TODO:注意的是，这个中间件也太霸道了，用了它就不能再用别人
// app.use(KoaStatic(path.resolve(__dirname, './public')));
// body解析中间件
app.use(
  KoaBody({
    multipart: true,
    jsonLimit: "10mb",
    encoding: "utf-8",
    jsonStrict: true,
  })
);
app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log("listening on http://localhost:3000/");
});

// 当前进程退出之前关闭MongoDB连接
process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log("Mongoose default connection closed through app termination");
    process.exit(0);
  });
});

// 这里的error如果被try...catch捕获到，就不会触发下面的事件
// app.on("error", (err, ctx) => {
//   console.error("server error", err);
// });

// question
// 1.ctx.req, ctx.request, ctx.res, ctx.response
// 2.怎么抛出http code
// 3.怎么获取请求里的参数(一直分不清params是啥)
// 4.做成中间层的话，怎么实现请求合并

// notice
// 1.koa-static的使用，要用的话目前app.use就只能用他，后续看看是不是这样
// 2.中间件的顺序很重要，例如上面写的全局异常捕获
// 3.next和洋葱模型
// 4.ctx.params ==> /:id
//   ctx.query  ==> ?id=..&
//   ctx.request.body ==> post的数据，但扯淡的是居然是string类型
