# Nodejs

About Node.js projcet and express application。
关于Node.js的体验应用，涉及到的功能点有：

- Node.js 内置的核心模块
- express 框架
- mongodb 数据库


## 安装初始化

```bash
# 安装应用程序生成器，可以快速搭建一个express应用
npm install -g express-generator
npm install
npm start
```


## ESlint+Prettier

ESlint 主要是格式化和校验 js/ts 文件代码，而 Prettier 则可以支持除了 js/ts 之外的文件如： css、html、json、vue等格式化。

```bash
# 安装相关依赖
npm install eslint prettier eslint-plugin-prettier eslint-config-prettier eslint-config-airbnb-base --save-dev
# 生成eslint默认配置文件
eslint --int
```

- eslint-config-prettier 主要作用是使用 prettier 默认推荐配置，防止 Prettier 和 ESlint 的格式化冲突
- eslint-plugin-prettier 主要作用是在 eslint 执行的过程中，让代码符合 prettier 的规范，如有不同则进行标记，可以配置抛出错误，可以通过手动的 eslint —fix 来修复

```json
// vscode setting.json
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
},
```