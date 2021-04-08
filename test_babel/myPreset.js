module.exports = () => ({
  presets: [
    [
      "@babel/preset-env",
      {
        corejs: "3",
        useBuiltIns: "usage",
        modules: false,
        targets: {
          browsers: ["> 1%", "last 2 versions", "not ie <= 8"],
        },
      },
    ],
  ],
});
