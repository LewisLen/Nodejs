# Nodejs

About Node.js project and express application。

关于Node.js的体验应用，涉及到的功能点有：

- Node.js 内置的核心模块
- express 框架
- mongodb 数据库
- jwt 生成校验token的跨域方案

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
# 生成eslint默认配置文件.eslintrc.js
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


## 目录结构

采用的是 MVC 模式，其实也可以使用功能作为分类，每个功能中包含 MVC，主要是看个人习惯。

- bin：启动脚本语句
- logs：日志信息
- modules：数据模型
- routes：路由，即请求接口路径
- controller: 逻辑处理
- utils：封装的方法
- views：视图，更多用于前后端不分离传统开发模式
- app.js： 入口文件


## 配置日志信息

express-generator 生成的应用带有`morgan`日志应用。

```js
const logger = require("morgan");
// 将请求信息打印在控制台，便于开发调试
app.use(logger("dev"));
// 将日志信息输出到指定文件目录
app.use(logger("combined", { stream: accessLogStream }));
```

自定义日志格式，morgan中有两个概念：

- format：日志格式，本质是代表日志格式的字符串，比如 :method :url :status :res[content-length] - :response-time ms。
- token：format的组成部分，比如上面的:method、:url即使所谓的token

```js
// 自定义format，其中包含自定义的token
morgan.format('Blog', '[Blog] :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status ":user-agent" response-time[digits]');
// 使用自定义的format
app.use(morgan('Blog'));
```

`morgan`日志比较简洁，配置项比较少。具体可以看[morgan文档](https://github.com/expressjs/morgan/)

### wiston(推荐)

wiston也是一款非常优秀的日志插件


## 模版渲染

```bash
# 安装依赖项
npm i art-template express-art-template
```

模版渲染：

```js
app.engine(".html", require('express-art-template'));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", ".html");
```


## 解决跨域问题

```js
// 在路由前加上
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});
```