module.exports = {
  // 其实一般的项目来说，都有webpack，所以node环境也需要
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
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
  plugins: ['react', 'prettier', '@typescript-eslint'],
  rules: {
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'always'],
    '@typescript-eslint/no-var-requires': 0,
  },
};
