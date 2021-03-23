import { createApp } from 'vue' // Vue 3.x 引入 vue 的形式
import App from './App.vue' // 引入 APP 页面组建

require('./index.css')

const app = createApp(App) // 通过 createApp 初始化 app
app.mount('#root') // 将页面挂载到 root 节点

console.log('hello typescriptt')
function test() { console.log(123) }
// 这里自己给process.env增加了内容，详见bin文件夹
console.log(process.env)
