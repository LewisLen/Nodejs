const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const { createWriteStream } = require("fs");
const expressArtTemplate = require("express-art-template");

// 路由
const routers = require("./routes");

const app = express();

// 日志文件信息
const accessLogStream = createWriteStream(
  path.join(__dirname, "./logs/requestLog.txt"),
  { flags: "a", encoding: "utf8" }
);

// 用art-template模板引擎渲染html
app.engine(".html", expressArtTemplate);
app.set("views", {
  debug: process.env.NODE_ENV !== "production",
});
app.set("views", path.join(__dirname, "views"));
app.set("view engine", ".html");

// 将请求信息打印在控制台，便于开发调试 dev是morgan一种简短的日志模式
// app.use(morgan("dev"));
// 将日志信息输出到指定文件目录
morgan.format(
  "Blog",
  '[Blog] :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status ":user-agent" :response-time[digits]'
);
// 使用自定义的format
app.use(morgan("Blog"));
app.use(morgan("Blog", { stream: accessLogStream }));
// 解析表单数据，默认情况下，如果不配置处理表单数据的中间件，则req.body默认等于 undefined
app.use(express.json()); // 4.16.0版本+
app.use(express.urlencoded({ extended: false })); // 4.16.0版本+
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 解决跨域问题，放在所有的路由前面
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

// 路由
routers(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// 错误处理中间件 error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }
  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      error: "invalid token",
    });
  }
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      error: "token expired",
    });
  }
  // 其它原因导致的错误
  res.status(err.status || 503);
  res.render("发生了未知错误！");
});

module.exports = app;
