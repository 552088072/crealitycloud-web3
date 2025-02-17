module.exports = {
  root: true,
  env: {
    browser: true, // 支持浏览器环境的检测
    es2021: true, // 支持es2021语法的检测
    node: true // 支持node环境的检测
  },
  extends: ['@nuxt/eslint-config', 'plugin:nuxt/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest', // 解析文件的时候使用最新的ecmaVersion
    sourceType: 'module' // 文件是ES6模块规范
  },
  globals: {
    defineNuxtPlugin: 'readonly'
  },
  plugins: ['vue'],
  rules: {
    camelcase: 'off', // 驼峰
    indent: [2, 2], // 缩进2个空格
    semi: [2, 'never'], // 要求或禁止使用分号代替 ASI,即禁用行尾使用分号
    quotes: ['error', 'single'], // 强制使用一致的反勾号、双引号或单引号
    // 要求大括号内必须有空格
    'object-curly-spacing': ['error', 'always'],
    'no-debugger': 2, // 不能debugg
    'no-empty': 2, // 块语句中的内容不能为空
    'no-extra-parens': 2, // 禁止非必要的括号
    'no-extra-semi': 2, // 禁止多余的冒号
    'comma-dangle': [2, 'never'], // 键值对最后一个不能有,
    'spaced-comment': ['error', 'always'], // 注释必须空格
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ],
    'no-multiple-empty-lines': ['error', { 'max': 1 }], // 最大允许一个空行
    'no-multi-spaces': ['error', {
      'ignoreEOLComments': false // 不允许行尾注释后有多余空格
    }],
    'vue/no-multiple-template-root': 'off', // 关闭多根节点限制
    'vue/no-multi-spaces': ['error', {
      'ignoreProperties': false // 禁止属性之间出现多个空格
    }],
    'vue/max-len': ['warn', {
      'code': 80, // 设置代码行的最大长度
      'template': 80, // 设置模板中行的最大长度
      'ignoreTemplateLiterals': true, // 忽略模板字符串
      'ignoreHTMLAttributeValues': true, // 忽略 HTML 属性值
      'ignoreHTMLTextContents': false // 不忽略 HTML 文本内容
    }],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 8,
        multiline: {
          max: 10
        }
      }
    ],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'never', // 避免自动闭合空标签（如 <br/>）
          normal: 'never', // 避免自动闭合普通标签（如 <div/>）
          component: 'always' // 对组件标签保持自闭合
        },
        svg: 'always',
        math: 'always'
      }
    ]
  }
}
