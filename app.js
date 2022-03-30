const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const { createWriteStream } = require("fs");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

// 日志文件信息
const accessLogStream = createWriteStream(
  path.join(__dirname, "./logs/requestLog.txt"),
  { flags: "a", encoding: "utf8" }
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// const winstonLogger = require("./logs/winston");

// winstonLogger.error();

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
