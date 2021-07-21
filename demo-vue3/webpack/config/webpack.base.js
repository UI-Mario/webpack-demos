const { PROJECT_PATH } = require("../constant")


module.exports = {
  entry: {},
  output: {
    path: resolve(PROJECT_PATH, "./dist"),
    filename: "js/[name].[hash:8].js",
  },
  plugins: [new CleanWebpackPlugin()],
  module: {
    rules: [],
  },
};
