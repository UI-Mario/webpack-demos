// import { createApp } from 'vue' // Vue 3.x 引入 vue 的形式
// import App from './App.vue' // 引入 APP 页面组建
// import { router } from './router'

// const app = createApp(App) // 通过 createApp 初始化 app
// app.use(router)
// app.mount('#root') // 将页面挂载到 root 节点

console.info('hello typescriptt')
const obj = {
  a: 1,
  c: 3
}
console.log(obj?.c)
console.log(null ?? 'this is null/undefined')
// 这里自己给process.env增加了内容，详见bin文件夹
// console.log(process.env)

// 测试写的loader,
// console.log('ptest, js is the best, stupid js, fuck')
