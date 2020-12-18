const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "my-first-webpack.[hash:8].js",
  },
  devServer: {
    // TODO:为啥会打开我打包后的index.html??不知，把打出来的html不叫index就找不到了
    // FIXME:!!!!!!!配置多入口会报错，先记着，感觉是个大坑
    host: '192.168.99.127', // 指定 host，不设置的话默认是 localhost
    port: 8080, // 指定端口，默认是8080
    contentBase: path.resolve(__dirname, 'dist'), // 其实不指定也行，默认他好像也会自己找到
    stats: 'errors-only', // 终端仅打印 error
    clientLogLevel: 'silent', // 日志等级
    compress: true, // 是否启用 gzip 压缩
    open: true, // 打开默认浏览器
    hot: true, // 热更新
    // proxy: { ...proxySetting }, // 启用代理
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        loader: "babel-loader",
        options: { cacheDirectory: true },
        exclude: /node_modules/,
        include: path.resolve(__dirname, "./src"),
      },
      {
        // 匹配哪些文件
        test: /\.css$/,
        // 使用哪些loader进行处理
        use: [
          // use数组中loader执行顺序：从右到左，从下到上 依次执行
          // 创建style标签，将js中的样式资源插入进行，添加到head中生效
          "style-loader",
          // 将css文件变成commonjs模块加载到输出的js文件中，里面内容是样式字符串
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
  ],
};
