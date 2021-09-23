import { ConfigEnv, loadEnv, UserConfig } from 'vite'

import vue from '@vitejs/plugin-vue'

// 很多都是在命令行外面再包一层cross-env
// 这就很烦，让我想起了webpack

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  return {
    css: {
      modules: {
        localsConvention: 'camelCase' // 默认只支持驼峰，修改为同时支持横线和驼峰
      }
    },
    plugins: [vue()],
    server: {
      host: '0.0.0.0',
      port: 10086, // 设置服务启动端口号
      open: false, // 设置服务启动时是否自动打开浏览器
      cors: true, // 允许跨域

      // 设置代理，根据项目实际情况配置
      proxy: {
        '/api': {
        }
      }
    }
  }
}
