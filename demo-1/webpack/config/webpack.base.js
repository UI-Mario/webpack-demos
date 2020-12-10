// CommonJS，毕竟webpack是node写出来的
// 配置ts， 配置eslint，css等样式
// 多入口，多出口
// tree shaking, code split
// 各种优化
const { resolve } = require('path');
const { isDev, PROJECT_PATH } = require('../constant');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackBar = require('webpackbar');

module.exports = {
  entry: {
    // TODO:有意思的是这里的路径算绝对还是相对，都不像
    index: './src/test_tsx.tsx',
    another_entry: './src/another_entry.js',
  },
  output: {
    // 多入口时，打包出来的文件名字必须不一样
    // TODO:那html怎么确定要引入的js文件，文件名一直变
    // ANSWER:html-webpack-plugin
    filename: '[name].[hash:8].bundle.js',
    //必须是绝对路径
    // resolve和join
    path: resolve(PROJECT_PATH, './build'),
  },
  resolve: {
    // 新增了 resolve属性，在 extensions 中定义好文件后缀名后，在 import 某个文件的时候，
    // 就可以不加文件后缀名了。webpack 会按照定义的后缀名的顺序依次处理文件，比如上文配置 ['.tsx', '.ts', '.js', '.json']，
    // webpack 会先尝试加上 .tsx后缀，看找得到文件不，如果找不到就依次尝试进行查找，所以我们在配置时尽量把最常用到的后缀放到最前面，可以缩短查找时间。
    extensions: ['.tsx', '.ts', '.js', '.json'],
    // 路径别名，在tsconfig.json里也有设置
    // 这里设置只是让编辑器不标红，有提示等
    alias: {
      Src: resolve(PROJECT_PATH, './src'),
    },
  },
  // loader的配置
  module: {
    rules: [
      // 详细loader配置
      // 不同文件处理配置不同loader处理
      // 一个loader配置写在一个对象{}里
      // 不同文件处理配置不同loader处理
      {
        // TODO:这写法啥意思，匹配了啥
        test: /\.(js|jsx|ts|tsx)?$/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
        exclude: /node_modules/,
        include: resolve(PROJECT_PATH, './src'),
      },
      {
        // 匹配哪些文件
        test: /\.css$/,
        // 使用哪些loader进行处理
        use: [
          // use数组中loader执行顺序：从右到左，从下到上 依次执行
          // 创建style标签，将js中的样式资源插入进行，添加到head中生效
          'style-loader',
          // 将css文件变成commonjs模块加载到输出的js文件中，里面内容是样式字符串
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          // 将less文件编译成css文件
          // 需要下载 less-loader和less
          'less-loader',
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          // 将less文件编译成css文件
          // 需要下载 less-loader和less
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {},
    ],
  },

  // plugins的配置
  plugins: [
    new CleanWebpackPlugin(),
    // 详细plugins的配置
    new WebpackBar({
      name: isDev ? '正在启动' : '正在打包',
      color: '#fa8c16',
    }),
    // 注意啊，先clean之后再加上新的，差点搞反顺序
    // ...不，好像没啥影响
    new HtmlWebpackPlugin({
      title: 'bundled_index',
      // 相对路径，起点为output里设置的
      filename: 'index.html',
      // 根目录demo-1为起点，同上，既不是绝对也不是相对路径
      // 有意思的是，自动去找index的html作为页面
      template: './public/index.html',
      cache: false,
    }),
    new HtmlWebpackPlugin({
      filename: 'test/another_test.html',
    }),
  ],
};
