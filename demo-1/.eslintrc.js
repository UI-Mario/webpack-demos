// “off” 或 0 - 关闭规则
// “warn” 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
// “error” 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
// 具体用法请参考@typescript-eslint/no-var-requires

// 那 ESLint 和 Prettier 的区别是什么呢？eslint（包括其他一些 lint 工具）的
// 主要功能包含代码格式的校验，代码质量的校验。而 Prettier 只是代码格式的校验（并格式化代码），
// 不会对代码质量进行校验。代码格式问题通常指的是：单行代码长度、tab长度、空格、逗号表达式
// 等问题。而代码质量问题指的是：未使用变量、三等号、全局变量声明等问题。

module.exports = {
  // 其实一般的项目来说，都有webpack，所以node环境也需要
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  // 用于指定需要配置文件的路径、可配置模块的名称
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    // 这个和下面的plugins里面的prettier，就是eslint结合prettier
    'plugin:prettier/recommended',

    // 关闭eslint配置中与prettier冲突的格式化规则
    // 具体请看eslint-plugin-prettier和eslint-config-prettier
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  // npm包
  plugins: ['react', 'prettier', '@typescript-eslint'],
  rules: {
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'always'],
    '@typescript-eslint/no-var-requires': 0,
  },
};
