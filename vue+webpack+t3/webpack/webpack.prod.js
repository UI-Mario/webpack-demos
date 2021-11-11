const { resolve } = require("path");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.base.js");
const CompressionPlugin = require("compression-webpack-plugin");

const prodConfig = {
  mode: "production",
  plugins: [
    new CompressionPlugin({
      test: /\.(js|css|html|svg|wasm|png)$/,
      threshold: 2000,
      minRatio: 0.8,
      compressionOptions: {
        numiterations: 15,
      },
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [],
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace("@", "")}`;
          },
        },
      },
    },
  },
  cache: {
    // 这里的type可以是memory或者filesystem
    // 即基于内存还是文件系统的缓存
    // 选择filesystem的话,cache默认位于node_modules/.cache/webpack/

    type: "filesystem",
    cacheDirectory: resolve(__dirname, "../.cache/webpack"),
    buildDependencies: {
      config: [__filename], // 当构建依赖的config文件（通过 require 依赖）内容发生变化时，缓存失效
    },
    // 保存多个缓存目录，区分环境
    name: `${ process.env.NODE_ENV || 'development'}-cache`,
  },
};

module.exports = merge(commonConfig, prodConfig);
