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
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 看名字，能在打包时更友好分析
const DashboardPlugin = require('webpack-dashboard/plugin');
// loader、plugins后面加上打包的时间和体积
// 不会用呀w(ﾟДﾟ)w
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const SizePlugin = require('size-plugin');

const smp = new SpeedMeasurePlugin();

module.exports = {
  entry: {
    // TODO:有意思的是这里的路径算绝对还是相对，都不像
    index: './src/test_tsx.tsx',
    another_entry: './src/another_entry.js',
  },
  // 这也是多入口，写数组里，但是只能打出一个js
  // entry: ['./src/test_tsx.tsx', './src/another_entry.js'],
  output: {
    // 多入口时，打包出来的文件名字必须不一样
    // 那html怎么确定要引入的js文件，文件名一直变
    // ANSWER:html-webpack-plugin，既然js是动态生成的，那我html也动态生成不就好了
    // [name],[hash:8]涉及到文件指纹，自行查阅资料
    // chunkhash跟hash不同的一点就是，chunkhash可以根据内容是否变化，来决定
    // 是否生成新的哈希值。但现在让我困惑的一点就是，例如index.ts改变，index.ts的chunkhash
    // 改变我理解，但是index.ts引用的文件也变了，这就很糟心...不好意思我是憨批
    // 打包出来就俩，被压缩晃了眼睛
    filename: 'js/[name].[chunkhash:8].bundle.js',
    //必须是绝对路径
    // resolve和join
    path: resolve(PROJECT_PATH, './build'),
  },
  // publicPath: '',
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
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          // 将css文件变成commonjs模块加载到输出的js文件中，里面内容是样式字符串
          'css-loader',
        ],
        include: [], // 查找文件的范围
        exclude: [], // 查找文件需排除的文件夹
      },
      {
        test: /\.less$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          // 将less文件编译成css文件
          // 需要下载 less-loader和less
          'less-loader',
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          // TODO: style-loader和MiniCssExtractPlugin有什么区别？
          // Answer: style-loader是把css等样式弄进js，注入html
          // MiniCssExtractPlugin是把css等样式单独抽成文件，在html里直接link
          isDev
            ? 'style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  // 有意思的是，在使用了MiniCssExtractPlugin进行css抽出打包，不加这个就会打包失败，就算加个空字符串，也会成功
                  // TODO:publicPath
                  publicPath: '',
                },
              },
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
      {
        test: /\.(jpg|gif|ico|png|svg)$/,
        loader: 'url-loader',
        options: {
          // 图片大小小于8kb，就会被base64处理
          // base64处理打包后不会单独生成一张图片
          // base64处理后只存在于打包后的文件内(这里是存在build/built.js中)
          // HTML页面会以base64的方式引入这张图片
          // 优点: 减少请求数量（减轻服务器压力，服务器不会存着那么多张图片在）
          // 缺点：图片体积会更大（文件请求速度更慢）
          name: '[name].[ext]',
          outputPath: 'images', // 也可以直接写在name里面
          limit: 8 * 1024,
        },
        exclude: /(node_modules)/,
      },
      {},
    ],
  },

  // plugins的配置
  plugins: [
    new MiniCssExtractPlugin({
      // TODO:这一行没用
      filename: '[name].[hash:7].css',
    }),
    new CompressionPlugin(),
    new CleanWebpackPlugin(),
    // 详细plugins的配置
    new WebpackBar({
      name: isDev ? '正在启动' : '正在打包',
      color: '#fa8c16',
    }),
    // 还是算了，没觉着这dashboard有啥用
    // new DashboardPlugin(),
    // 注意啊，先clean之后再加上新的，差点搞反顺序
    // ...不，好像没啥影响
    // 由于plugins是调用webpack的api，所以顺序无所谓
    new SizePlugin(),
    new HtmlWebpackPlugin({
      // TODO:多出口，具体请看考下列代码
      //   module.exports = {
      //     mode: 'development',
      //     // entry:'./src/index.js',方式一
      //     // entry:['./src/index.js','./src/add.js'],方式二
      //     entry: {//方式三
      //         index: './src/index.js',
      //         add: './src/add.js',
      //         home:'./src/home.js'
      //     },

      //     //出口
      //     output: {
      //         //文件名 [name]根据入口的名称定义
      //         filename: 'js/[name].js',
      //         //输出文件目录（将来所有资源输出的公共目录）
      //         path: __dirname + '/dist',
      //         // 所有资源引入公共路径前缀
      //         publicPath: '/',
      //         // 非入口chunk的名称
      //         chunkFilename: 'js/[name]_chunk.js',
      //         // library: '[name]', // 整个库向外暴露的变量名
      //         // libraryTarget: 'window' // 变量名添加到哪个上 browser
      //         // libraryTarget: 'global' // 变量名添加到哪个上 node
      //         // libraryTarget: 'commonjs'
      //     },
      //     plugins: [
      //         //多出口 一般和多入口对应
      //         new HtmlWebpackPlugin({
      //             template: './src/index.html',
      //             filename:'index.html',
      //             //只引入index.js，不指定的话会引入index、home.js
      //             chunks:['index']
      //         }),
      //         new HtmlWebpackPlugin({
      //             template: './src/index.html',
      //             filename:'home.html',
      //             chunks:['home']
      //         }),
      //     ]
      // }

      title: 'bundled_index',
      // 相对路径，起点为output里设置的
      filename: 'index.html',
      // 根目录demo-1为起点，同上，既不是绝对也不是相对路径
      // 有意思的是，自动去找index的html作为页面
      template: './public/index.html',
      cache: false,
    }),
    new HtmlWebpackPlugin({
      filename: 'test_another_entry/another_test.html',
    }),
  ],
};
