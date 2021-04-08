module.exports = {
  presets: [
    // 1.
    // './myPreset.js'
    // 2.
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
    // "@babel/preset-typescript"
  ],
  plugins: [
    // "@babel/proposal-class-properties",
    // "@babel/proposal-object-rest-spread",
  ],
};
