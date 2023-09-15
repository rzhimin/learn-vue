module.exports = {
  //ESLint 将在所有父文件夹中寻找配置文件，直到根目录（所有这些配置文件的规则都会被层叠应用。若有重复的属性配置，则离文件更近的配置文件具有更高的优先级）。要将 ESLint 限制在一个特定的项目中，在 .eslintrc.* 文件或 package.json 文件的 eslintConfig 字段内或在项目根层的 .eslintrc.* 文件中设置 "root": true。一旦 ESLint 找到 "root": true 的配置，它将停止在父文件夹中寻找。因此建议当想要所有项目都遵循一个特定的规则时，最好给项目根目录的.eslintrc.js文件加上"root": true配置。
  root: true,
  //自定义解析器，从其他类型的文件中提取 JavaScript 代码，或在提示前对代码进行预处理。
  // 也可以使用自定义解析器将 JavaScript 代码转换成抽象的语法树，供 ESLint 评估。如果你的代码与 ESLint 的默认解析器 Espree（ESLint默认解析器） 不兼容，可能需要添加自定义解析器。
  // 像@typescript-eslint/parser就是把typescript转换为与 ESTree 兼容的形式的解析器。
  // parser: '@typescript-eslint/parser'
  parser: 'vue-eslint-parser',
  //用于指定想要支持的js语言选项，Eslint默认使用 ECMAScript 5 语法，不过可以通过parserOptions来覆盖语法。
  //   可配置值为：
  // ecmaVersion - 设置为 3、5（默认）、6、7、8、9、10、11、12 或 13，以指定你要使用的 ECMAScript 语法的版本。你也可以设置为 2015（6）、2016（7）、2017（8）、2018（9）、2019（10）、2020（11）、2021（12）或 2022（13）来使用基于年份的命名。你也可以设置 "latest" 来使用受支持的最新版本。
  // sourceType - 设置为 "script"（默认值）或 "module"（如果代码是 ECMAScript 模块）。
  // allowReserved - 允许使用保留字作为标识符（如果 ecmaVersion 为 3）。
  // ecmaFeatures - 表示你想使用哪些额外的语言特性的对象。
  // globalReturn - 允许全局范围内的 return 语句
  // impliedStrict - 启用全局严格模式（如果 ecmaVersion 是 5 或更高版本）
  // jsx - 启用 JSX
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
    parser: '@babel/eslint-parser',
  },
  //env 用于指定代码运行的环境。在不同的运行环境下，JavaScript 中可用的全局变量可能会不同，使用 env 可以让 ESLint 知道当前代码运行的环境，从而正确地识别全局变量，避免误报未定义变量等问题。
  // 常见的 env（查看所有env） 配置如下：
  // browser：浏览器环境，可以使用浏览器中的全局变量如 window、document 等。
  // node：Node.js 环境，可以使用 Node.js 中的全局变量如 process、Buffer 等。
  // commonjs：CommonJS 环境，可以使用 CommonJS 模块中的变量如 module、require 等。
  // es6：ES6 环境，可以使用 ES6 中的全局变量如 Set、Map 等。
  // jest：Jest 测试框架环境，可以使用 Jest 中的全局变量如 describe、test 等。
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  //用于引入继承其他配置包中配置，然后通过合并/覆盖所有原本的配置生成最终的规则（extends可以看做是集成多个配置方案的方式，配置的内容实际就是配置好的.eslintrc.js，不然对于每一个项目都要重新一步步开始选择配置规则就比较显得不太人性）。
  //'plugin:vue/vue3-essential' vue3的
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  // required to lint *.vue files
  // 此项是用来提供插件的，插件名称省略了eslint-plugin-，
  plugins: ['vue'],
  // ESLint 有大量的内置规则（例如：no-console、no-var这些），开发者可以通过配置注释或配置文件来修改项目使用到的规则，也可以通过插件添加更多规则。
  // 主要有如下的设置规则，可以设置字符串也可以设置数字，两者效果一致
  //   off或者0： 关闭规则
  //  warn或者1： 启用并视作警告（不影响退出）。
  // error或者2： 启用并视作错误（触发时退出代码为 1）。
  // 下面这些rules是用来设置从插件来的规范代码的规则，使用必须去掉前缀eslint-plugin-
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 1 : 0,
    //意思就是不让eslint校验我定义有没有用了。
    'no-unused-vars': 0,
    // 关闭函数名后面必须有空格的验证
    'space-before-function-paren': 0,
    // 关闭强制不变的变量使用 const, 因为自动格式化 有时候会把 let 变成 const
    'perfer-const': 0,
    // 允许尾后逗号
    'comma-dangle': 0,
    // 允许单个词作为文件名
    'vue/multi-word-component-names': 0,
    // 允许行尾分号
    semi: 0,
  },
}
