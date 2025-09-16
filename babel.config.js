// Babel 控制文件（会自动帮我们把 ES6 及以上代码转为 ES5）
// 一般情况下，我们不需要修改该文件
// 下面为element ui 按需引入配置
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    ["@babel/preset-env", { "modules": false }]
  ],
  plugins: [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
